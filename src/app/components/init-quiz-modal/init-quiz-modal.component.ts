import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ModalService } from '../../services/modal/modal.service';
import { InitialQuiz } from '../../interfaces/initial-quiz.interface';
import { QuizStateService } from '../../services/quiz-state/quiz-state.service';
import { StorageKey } from '../../enums/storageKey';
import { NavigationRoutes } from '../../enums/navigationRoutes';

@Component({
  selector: 'quiz-app-init-quiz-modal',
  templateUrl: './init-quiz-modal.component.html',
  styleUrls: ['./init-quiz-modal.component.scss'],
})
export class InitQuizModalComponent implements OnInit {
  initQuizForm: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private modalService: ModalService,
    private quizService: QuizStateService,
  ) {}
  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    this.initQuizForm = this.fb.group({
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
  getInitialQuizObject(form: FormGroup): InitialQuiz {
    return {
      title: form.get('title')?.value,
      theme: form.get('theme')?.value,
    };
  }
  hasFormErrors(): boolean {
    return this.initQuizForm.invalid;
  }
  handleCancel(): void {
    this.modalService.closeModal();
  }
  handleOk(): void {
    this.quizService.addInitialQuiz(
      StorageKey.INIT_QUIZ,
      this.getInitialQuizObject(this.initQuizForm),
    );
    this.modalService.closeModal();
    this.router.navigate([
      NavigationRoutes.HOME,
      NavigationRoutes.QUIZ_DETAILS,
    ]);
  }
}
