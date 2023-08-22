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

import { InitQuizForm } from '../../../shared/interfaces/forms.interface';
import { Quiz } from '../../interfaces/quiz.interface';
import { StorageKey } from '../../../shared/enums/storageKey';
import { NavigationRoutes } from '../../../shared/enums/navigationRoutes';
import { PlaceHolder } from '../../../shared/enums/placeHolder';
import { ModalDataInterface } from '../../../shared/interfaces/modalData.interface';

@Component({
  selector: 'quiz-app-create-quiz-modal',
  templateUrl: './create-quiz-modal.component.html'
})
export class CreateQuizModalComponent implements OnInit {
  @Input() inputData: ModalDataInterface;
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
    this.newQuizId = this.quizService.getNewQuizId();
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

  getInitialQuizObject(form: FormGroup): Quiz {
    const quiz: Quiz = {
      title: form.get('title')?.value,
      theme: form.get('theme')?.value,
      type: '',
      questions: [],
      id: this.newQuizId as string
    };

    return quiz;
  }

  editQuiz(): void {
    this.quizService.editQuiz(
      this.inputData?.currentQuizId,
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
