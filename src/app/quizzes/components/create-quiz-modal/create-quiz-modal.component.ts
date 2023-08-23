import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { QuizService } from '../../services/quiz/quiz.service';
import { ModalQuizService } from '../../services/modal-quiz/modal-quiz.service';
import { getNewQuizId } from '../../../shared/utils/getId';
import { InitQuizForm } from '../../../shared/interfaces/forms.interface';
import { Quiz } from '../../interfaces/quiz.interface';
import { StorageKey } from '../../../shared/enums/storageKey';
import { NavigationRoutes } from '../../../shared/enums/navigationRoutes';
import { PlaceHolder } from '../../../shared/enums/placeHolder';

@Component({
  selector: 'quiz-app-create-quiz-modal',
  templateUrl: './create-quiz-modal.component.html'
})
export class CreateQuizModalComponent implements OnInit {
  @Input() quizId: string;
  @Input() label: string;
  @Input() isSave: boolean;
  @Input() buttonText: string;

  protected readonly PlaceHolder = PlaceHolder;

  public initQuizForm!: FormGroup<InitQuizForm>;
  newQuizId: string;

  get title() {
    return this.initQuizForm.controls.title;
  }

  get theme() {
    return this.initQuizForm.controls.theme;
  }

  constructor(
    private fb: FormBuilder,
    private quizService: QuizService,
    private quizModal: ModalQuizService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.newQuizId = getNewQuizId();
  }

  initForm(): void {
    this.initQuizForm = this.fb.nonNullable.group<InitQuizForm>({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      theme: new FormControl('', [Validators.required, Validators.minLength(2)])
    });
  }

  getInitialQuizObject(quizInitForm: FormGroup<InitQuizForm>): Quiz {
    const quiz: Quiz = {
      title: quizInitForm.controls.title.value as string,
      theme: quizInitForm.controls.theme.value as string,
      type: '',
      questions: [],
      id: this.newQuizId
    };

    return quiz;
  }

  editQuiz(): void {
    this.quizService.editQuiz(
      this?.quizId,
      this.getInitialQuizObject(this.initQuizForm)
    );
    this.quizModal.closeModal();
  }

  saveQuiz(): void {
    this.quizService.addQuiz(
      StorageKey.QUIZZES,
      this.getInitialQuizObject(this.initQuizForm)
    );
    this.quizModal.closeModal();
    this.navigateToQuizDetailsPage();
  }

  navigateToQuizDetailsPage() {
    this.router.navigate([
      NavigationRoutes.QUIZ,
      `${this.newQuizId}`,
      NavigationRoutes.DETAILS
    ]);
  }
}
