import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { InitQuizForm } from '@a-shared/types/forms';
import { Quiz, QUIZ_DIFFICULTY } from '@a-quizzes/interfaces/quiz';
import { PlaceHolder } from '@a-shared/enums/placeHolder';
import { ModalRefFacadeService } from '@a-shared/services/modal-ref-facade/modal-ref-facade.service';
import { SubscriptionsService } from '@a-shared/services/subscription/subscriptions.service';
import {
  DropDownItem,
  RadioButtonItem
} from '@a-questions/interfaces/question';
import { defaultDifficulty, LABELS } from '@a-shared/enums/shared-components';
import { getNewQuizId } from '@a-shared/utils/getId';
import { QuizService } from '@a-quizzes/services/quiz/quiz.service';
import { LabelItem } from '@a-shared/classes/label-item/label-item';
import { QuizStateService } from '@a-quizzes/services/quiz-state/quiz-state.service';

@Component({
  selector: 'quiz-app-create-quiz-modal',
  templateUrl: './create-quiz-modal.component.html',
  providers: [ModalRefFacadeService, SubscriptionsService]
})
export class CreateQuizModalComponent implements OnInit {
  @Input() quiz: Quiz = {};
  @Input() label: string;
  @Input() buttonText: string;

  readonly PlaceHolder = PlaceHolder;

  isLoading: boolean;

  initQuizForm: FormGroup<InitQuizForm>;

  dropDownCategories: DropDownItem[];
  labelsList: RadioButtonItem[];


  get title(): FormControl<string> {
    return this.initQuizForm?.controls?.title;
  }

  get category(): FormControl<DropDownItem> {
    return this.initQuizForm?.controls?.category;
  }

  get difficulty(): FormControl<RadioButtonItem> {
    return this.initQuizForm?.controls?.difficulty;
  }

  get quizId(): string {
    return this?.quiz?.id;
  }

  constructor(
    private fb: FormBuilder,
    private modalRefFacadeService: ModalRefFacadeService<Quiz>,
    private quizService: QuizService,
    private quizState: QuizStateService
  ) {}

  ngOnInit(): void {
    this.labelsSetup();
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
      this.quizState.addQuiz(newQuiz);
    } else {
      this.quizState.editQuiz(this.quizId, newQuiz);
    }

    this.close(newQuiz);
  }

  setCategory(item: DropDownItem): void {
    this.initQuizForm?.controls?.category?.setValue(item);
  }

  private initForm(): void {
    this.isLoading = true;
    this.initQuizForm = this.fb.nonNullable.group<InitQuizForm>({
      title: this.fb.control(this.quiz?.title || '', [
        Validators.required,
        Validators.minLength(2)
      ]),
      category: this.fb.control(
        this.quiz?.category || this.dropDownCategories[0],
        [Validators.required, Validators.minLength(2)]
      ),
      difficulty: this.fb.control(this.quiz?.difficulty || defaultDifficulty)
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
    this.dropDownCategories = this.quizService?.categories;
  }

  private labelsSetup(): void {
    this.labelsList = [
      new LabelItem(
        QUIZ_DIFFICULTY.EASY,
        'DIFFICULTY.EASY',
        LABELS.GREEN,
        false
      ),
      new LabelItem(
        QUIZ_DIFFICULTY.MEDIUM,
        'DIFFICULTY.MEDIUM',
        LABELS.YELLOW,
        false
      ),
      new LabelItem(QUIZ_DIFFICULTY.HARD, 'DIFFICULTY.HARD', LABELS.RED, false)
    ];
  }
}
