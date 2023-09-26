import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Observable } from 'rxjs';

import { QuizService } from '@a-quizzes/services/quiz/quiz.service';
import { InitQuizForm } from '@a-shared/types/forms';
import { Quiz, QUIZ_DIFFICULTY } from '@a-quizzes/interfaces/quiz';
import { PlaceHolder } from '@a-shared/enums/placeHolder';
import { ModalRefFacadeService } from '@a-shared/services/modal-ref-facade/modal-ref-facade.service';
import { SubscriptionsService } from '@a-shared/services/subscription/subscriptions.service';
import { AnswerDifficultyList } from '@a-questions/constants/dropdowns';
import { DropDownItem } from '@a-questions/interfaces/question';

@Component({
  selector: 'quiz-app-create-quiz-modal',
  templateUrl: './create-quiz-modal.component.html',
  providers: [ModalRefFacadeService, SubscriptionsService]
})
export class CreateQuizModalComponent implements OnInit {
  @Input() quizId: string;
  @Input() quiz: Quiz = {};
  @Input() label: string;
  @Input() buttonText: string;

  initQuizForm: FormGroup<InitQuizForm>;

  readonly PlaceHolder = PlaceHolder;
  readonly AnswerDifficultyList = AnswerDifficultyList;

  get title(): FormControl<string> {
    return this.initQuizForm.controls.title;
  }

  get theme(): FormControl<string> {
    return this.initQuizForm.controls.theme;
  }

  get difficulty(): FormControl<QUIZ_DIFFICULTY> {
    return this.initQuizForm.controls.difficulty;
  }

  // get selectedDifficultyItem(): DropDownItem {
  //   return this.AnswerDifficultyList.find(
  //     (item) => item.value === this.difficulty.value
  //   );
  // }

  constructor(
    private fb: FormBuilder,
    private quizService: QuizService,
    private modalRefFacadeService: ModalRefFacadeService<Quiz>,
    private subscriptionsService: SubscriptionsService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  close(data?: Quiz): void {
    this.modalRefFacadeService.close(data);
  }

  saveQuiz(): void {
    const formData = this.getFormData();
    const newQuiz = { ...this.quiz, ...formData };

    const saveMethod = this.getSaveMethod();

    this.subscriptionsService.addSubscription(
      saveMethod(newQuiz).subscribe({
        next: (savedQuiz: Quiz) => {
          this.close(savedQuiz);
        },
        error: (error) => {
          console.log(error);
        }
      })
    );
  }

  private getSaveMethod(): (quiz: Quiz) => Observable<Quiz> {
    if (!this.quiz.id) {
      return this.addQuiz.bind(this);
    } else {
      return this.editQuiz.bind(this);
    }
  }

  private editQuiz(newQuiz: Quiz): Observable<Quiz> {
    return this.quizService.editQuiz(this.quiz.id, newQuiz);
  }

  private addQuiz(newQuiz: Quiz): Observable<Quiz> {
    return this.quizService.addQuiz(newQuiz);
  }

  private initForm(): void {
    this.initQuizForm = this.fb.nonNullable.group<InitQuizForm>({
      title: this.fb.control(this.quiz.title || '', [
        Validators.required,
        Validators.minLength(2)
      ]),
      theme: this.fb.control(this.quiz.theme || '', [
        Validators.required,
        Validators.minLength(2)
      ]),
      difficulty: this.fb.control(this.quiz.difficulty || QUIZ_DIFFICULTY.EASY)
    });
  }

  private getFormData(): Quiz {
    const quiz: Quiz = {
      title: this.title.value,
      theme: this.theme.value,
      difficulty: this.difficulty.value,
      questions: []
    };

    return quiz;
  }
}
