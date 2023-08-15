import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { InitQuizForm } from '../../interfaces/initQuizForm.interface';
import { Quiz } from '../../interfaces/quiz.interface';
import { StorageKey } from '../../enums/storageKey';
import { NavigationRoutes } from '../../enums/navigationRoutes';
import { QuizService } from '../../services/quiz/quiz.service';
import { ModalQuizService } from '../../services/modal-quiz/modal-quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'quiz-app-create-quiz-modal',
  templateUrl: './create-quiz-modal.component.html',
})
export class CreateQuizModalComponent implements OnInit {
  public initQuizForm!: FormGroup<InitQuizForm>;

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
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.initQuizForm = this.fb.nonNullable.group<InitQuizForm>({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      theme: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
    });
  }

  getInitialQuizObject(form: FormGroup): Quiz {
    return {
      title: form.get('title')?.value,
      theme: form.get('theme')?.value,
      id: this.quizService.geNewQuizId(),
    };
  }

  saveQuiz(): void {
    this.quizService.addQuiz(
      StorageKey.QUIZZES,
      this.getInitialQuizObject(this.initQuizForm),
    );
    this.quizModal.closeModal();
    this.navigateToQuizDetailsPage();
  }

  navigateToQuizDetailsPage() {
    this.router.navigate([
      NavigationRoutes.HOME,
      NavigationRoutes.QUIZ_DETAILS,
    ]);
  }
}
