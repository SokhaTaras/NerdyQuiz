import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { InitQuizForm } from '@a-shared/types/forms';
import { CategoriesResponse, Quiz } from '@a-quizzes/interfaces/quiz';
import { PlaceHolder } from '@a-shared/enums/placeHolder';
import { ModalRefFacadeService } from '@a-shared/services/modal-ref-facade/modal-ref-facade.service';
import { SubscriptionsService } from '@a-shared/services/subscription/subscriptions.service';
import { AnswerDifficultyList } from '@a-questions/constants/dropdowns';
import { DropDownItem } from '@a-questions/interfaces/question';
import { QuizApiService } from '@a-quizzes/services/quiz-api/quiz-api.service';
import { mapArrayToDropDownItems } from '@a-shared/utils/drop-down-mapper';
import {
  defaultCategory,
  defaultDifficulty
} from '@a-shared/enums/shared-components';
import { StoreService } from '@a-store/services/store.service';
import { AppState } from '@a-store/state/app.state';
import { AddQuiz, EditQuiz } from '@a-store/actions/quizz.actions';
import { getNewQuizId } from '@a-shared/utils/getId';

@Component({
  selector: 'quiz-app-create-quiz-modal',
  templateUrl: './create-quiz-modal.component.html',
  providers: [ModalRefFacadeService, SubscriptionsService]
})
export class CreateQuizModalComponent implements OnInit {
  @Input() quiz: Quiz = {};
  @Input() label: string;
  @Input() buttonText: string;

  isLoading: boolean;

  initQuizForm: FormGroup<InitQuizForm>;

  dropDownCategories: DropDownItem[];

  readonly PlaceHolder = PlaceHolder;
  readonly AnswerDifficultyList = AnswerDifficultyList;

  get title(): FormControl<string> {
    return this?.initQuizForm?.controls?.title;
  }

  get category(): FormControl<DropDownItem> {
    return this?.initQuizForm?.controls?.category;
  }

  get difficulty(): FormControl<DropDownItem> {
    return this?.initQuizForm?.controls?.difficulty;
  }

  get quizId(): string {
    return this?.quiz?.id;
  }

  constructor(
    private fb: FormBuilder,
    private modalRefFacadeService: ModalRefFacadeService<Quiz>,
    private subscriptionsService: SubscriptionsService,
    private quizApi: QuizApiService,
    private store: StoreService<AppState>
  ) {}

  ngOnInit(): void {
    this.setCategories();
    this.initForm();
  }

  close(data?: Quiz): void {
    this.modalRefFacadeService.close(data);
  }

  saveQuiz(): void {
    const formData = this.getFormData();
    const newQuiz = { ...this.quiz, ...formData };

    if (!this.quiz.id) {
      newQuiz.id = getNewQuizId();
      this.store.dispatch(AddQuiz({ quiz: newQuiz }));
    } else {
      this.store.dispatch(EditQuiz({ quizId: this.quiz.id, quiz: newQuiz }));
    }

    this.close(newQuiz);
  }

  setDifficulty(item: DropDownItem): void {
    this?.initQuizForm?.controls?.difficulty?.setValue(item);
  }

  setCategory(item: DropDownItem): void {
    this?.initQuizForm?.controls?.category?.setValue(item);
  }


  private initForm(): void {
    this.isLoading = true;
    this.initQuizForm = this.fb.nonNullable.group<InitQuizForm>({
      title: this.fb.control(this?.quiz?.title || '', [
        Validators.required,
        Validators.minLength(2)
      ]),
      category: this.fb.control(this?.quiz?.category || defaultCategory, [
        Validators.required,
        Validators.minLength(2)
      ]),
      difficulty: this.fb.control(this?.quiz?.difficulty || defaultDifficulty)
    });
    this.isLoading = false;
  }

  private getFormData(): Quiz {
    const quiz: Quiz = {
      title: this.title?.value,
      category: this.category?.value,
      difficulty: this.difficulty?.value,
      questions: []
    };

    return quiz;
  }

  private setCategories(): void {
    this.isLoading = true;
    this.subscriptionsService.addSubscription(
      this.quizApi.getCategories().subscribe((categories) => {
        this.mapToDropDownItem(categories);
        this.isLoading = false;
      })
    );
  }

  private mapToDropDownItem(fetchedCategories: CategoriesResponse): void {
    this.dropDownCategories = mapArrayToDropDownItems(
      fetchedCategories.trivia_categories,
      'id',
      'name'
    );
  }
}
