import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { InitQuizForm } from '@a-shared/types/forms';
import { Quiz } from '@a-quizzes/interfaces/quiz';
import { PlaceHolder } from '@a-shared/enums/placeHolder';
import { ModalRefFacadeService } from '@a-shared/services/modal-ref-facade/modal-ref-facade.service';
import { SubscriptionsService } from '@a-shared/services/subscription/subscriptions.service';
import {
  AnswerDifficultyList,
  defaultDifficulty
} from '@a-questions/constants/dropdowns';
import { DropDownItem } from '@a-questions/interfaces/question';
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

  initQuizForm: FormGroup<InitQuizForm>;

  readonly PlaceHolder = PlaceHolder;
  readonly AnswerDifficultyList = AnswerDifficultyList;

  get title(): FormControl<string> {
    return this?.initQuizForm?.controls?.title;
  }

  get theme(): FormControl<string> {
    return this?.initQuizForm?.controls?.theme;
  }

  get difficulty(): FormControl<DropDownItem> {
    return this?.initQuizForm?.controls?.difficulty;
  }

  get easyDifficulty(): DropDownItem {
    return AnswerDifficultyList[0];
  }

  get quizId(): string {
    return this?.quiz?.id;
  }

  constructor(
    private fb: FormBuilder,
    private modalRefFacadeService: ModalRefFacadeService<Quiz>,
    private store: StoreService<AppState>
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

    if (!this.quiz.id) {
      newQuiz.id = getNewQuizId();
      this.store.dispatch(AddQuiz({ quiz: newQuiz }));
    } else {
      this.store.dispatch(EditQuiz({ quizId: this.quiz.id, quiz: newQuiz }));
    }

    this.close(newQuiz);
  }

  setDifficulty(item: DropDownItem) {
    this?.initQuizForm?.controls?.difficulty?.setValue(item);
  }

  private initForm(): void {
    this.initQuizForm = this.fb.nonNullable.group<InitQuizForm>({
      title: this.fb.control(this?.quiz?.title || '', [
        Validators.required,
        Validators.minLength(2)
      ]),
      theme: this.fb.control(this?.quiz?.theme || '', [
        Validators.required,
        Validators.minLength(2)
      ]),
      difficulty: this.fb.control(this?.quiz?.difficulty || defaultDifficulty)
    });
  }

  private getFormData(): Quiz {
    const quiz: Quiz = {
      title: this.title?.value,
      theme: this.theme?.value,
      difficulty: this.difficulty?.value,
      questions: []
    };

    return quiz;
  }
}
