import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

import { Quiz } from '../../interfaces/quiz';
import { StorageError } from '../../../shared/classes/storageError/storage-error';
import { STORAGE_ERROR_MESSAGE } from '../../../shared/enums/storageErrorMessage';
import { Question } from '../../../questions/interfaces/question';
import { LocalStorageService } from '../../../shared/services/local-storage/local-storage.service';
import { getNewQuestionId, getNewQuizId } from '../../../shared/utils/getId';
import { StorageKey } from '../../../shared/enums/storageKey';
import { Difficulties } from '../../../shared/types/formsType';

@Injectable({
  providedIn: 'root'
})
export class QuizService implements OnDestroy {
  public quizzes$ = new BehaviorSubject<Quiz[]>([]);

  subscription: Subscription;

  constructor(private localStorageService: LocalStorageService) {}

  addQuiz(quiz: Quiz): Quiz {
    if (quiz) {
      quiz.id = getNewQuizId();
      this.quizzes$.next([...this.quizzes$.value, quiz]);
      this.localStorageService.updateLocalStorage(
        StorageKey.QUIZZES,
        this.quizzes$.value
      );
      return quiz;
    }
    return null;
  }

  editQuiz(quizId: string | undefined, data: Quiz): Quiz {
    const currentQuizzes = [...this.quizzes$.value];
    const quizIndex = currentQuizzes.findIndex((q) => q.id === quizId);

    if (quizIndex !== -1) {
      currentQuizzes[quizIndex].title = data.title;
      currentQuizzes[quizIndex].theme = data.theme;
      this.quizzes$.next(currentQuizzes);
      this.localStorageService.updateLocalStorage(
        StorageKey.QUIZZES,
        this.quizzes$.value
      );

      return data;
    }
    return data;
  }

  getQuizById(id: string): Quiz | undefined {
    return this.quizzes$.value.find((q) => q.id == id);
  }

  initAllQuizzes(key: string): void {
    try {
      let allQuizzes: string =
        this.localStorageService.getLocalStorageData(key);
      if (allQuizzes !== null) {
        this.localStorageService.setLocalStorageData(key, allQuizzes);
        this.quizzes$.next(JSON.parse(allQuizzes));
      }
    } catch (error) {
      throw new StorageError(STORAGE_ERROR_MESSAGE.PARSE);
    }
  }

  //todo add subscription service when it will be merged (delete this FN)
  getAverageQuizDifficulty(): void {
    this.subscription = this.quizzes$.subscribe((quizzes) => {
      return quizzes.forEach((quiz) => {
        const difficulties = quiz?.questions?.map((q) => q.difficulty);
        const difficultiesObj = this.getWhichTypeIsMostUsed(difficulties);
        const result = this.getDifficultyCounts(difficultiesObj);
        console.log(result);
        return result;
      });
    });
  }

  getWhichTypeIsMostUsed(difficulties: string[]): Difficulties {
    const difficultyCounts = { Easy: 0, Medium: 0, Hard: 0 };

    difficulties.forEach((val) => {
      switch (val) {
        case 'Easy':
          difficultyCounts.Easy++;
          break;
        case 'Medium':
          difficultyCounts.Medium++;
          break;
        case 'Hard':
          difficultyCounts.Hard++;
          break;
        default:
          break;
      }
    });

    return difficultyCounts;
  }

  getDifficultyCounts(difficultiesObj: Difficulties): string {
    let maxCount = Math.max(
      difficultiesObj.Easy,
      difficultiesObj.Medium,
      difficultiesObj.Hard
    );

    if (maxCount === difficultiesObj.Easy) {
      return 'Easy';
    } else if (maxCount === difficultiesObj.Medium) {
      return 'Medium';
    } else if (maxCount === difficultiesObj.Hard) {
      return 'Hard';
    }
    return '';
  }

  addQuestion(quizId: string | null, question: Question): void {
    if (this.quizzes$.value) {
      const currentQuizzes = [...this.quizzes$.value];
      const quizIndex = currentQuizzes.findIndex((q) => q.id === quizId);

      if (quizIndex !== -1) {
        question.id = getNewQuestionId();
        currentQuizzes[quizIndex].questions.push(question);
        this.quizzes$.next(currentQuizzes);
        this.localStorageService.updateLocalStorage(
          StorageKey.QUIZZES,
          this.quizzes$.value
        );
      }
    }
  }

  getQuizQuestions(quizId: string | null): Question[] {
    const currentQuiz = this.getQuizById(quizId);

    if (!currentQuiz || !currentQuiz.questions) {
      return [];
    }

    return [...currentQuiz.questions];
  }

  deleteQuestion(
    quizId: string | undefined,
    questionIndex: number | undefined
  ): void {
    const currentQuizzes = this.quizzes$.value;
    const quizIndex = currentQuizzes.findIndex((q) => q.id === quizId);
    const currentQuiz = currentQuizzes[quizIndex];

    if (quizIndex !== -1) {
      const updatedQuestions = [...currentQuiz.questions];
      updatedQuestions.splice(questionIndex, 1);

      currentQuiz.questions = updatedQuestions;

      this.quizzes$.next(currentQuizzes);
      this.localStorageService.updateLocalStorage(
        StorageKey.QUIZZES,
        this.quizzes$.value
      );
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
