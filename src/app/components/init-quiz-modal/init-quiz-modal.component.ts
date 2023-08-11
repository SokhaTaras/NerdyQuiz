import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalService } from '../../services/modal/modal.service';
import { IInitialQuiz } from '../../interfaces/initial-quiz.interface';
import { QuizStateService } from '../../services/quiz-state/quiz-state.service';

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
  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.initQuizForm = this.fb.group({
      title: new FormControl(''),
      theme: new FormControl(''),
    });
  }

  getInitialQuizObject(form: FormGroup): IInitialQuiz {
    return {
      title: form.get('title')?.value || '',
      theme: form.get('theme')?.value || '',
    };
  }
  handleCancel() {
    this.modalService.closeModal();
  }
  handleOk() {
    this.quizService.addInitialQuiz(
      'test',
      this.getInitialQuizObject(this.initQuizForm),
    );

    this.modalService.closeModal();
    this.router.navigate(['quiz-details-page']);
  }
}
