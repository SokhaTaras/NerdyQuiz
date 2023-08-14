import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalService } from '../../services/modal/modal.service';
import { InitialQuiz } from '../../interfaces/initial-quiz.interface';
import { StorageKey } from '../../enums/storageKey';
import { NavigationRoutes } from '../../enums/navigationRoutes';
import { Router } from '@angular/router';
import { QuizService } from '../../services/quiz-state/quiz.service';

@Component({
  selector: 'quiz-app-modal-footer',
  templateUrl: './modal-footer.component.html',
  styleUrls: ['./modal-footer.component.scss'],
})
export class ModalFooterComponent {
  @Input() form: FormGroup = new FormGroup({});

  constructor(
    private modalService: ModalService,
    private router: Router,
    private quizService: QuizService,
  ) {}
  hasFormErrors(form: FormGroup): boolean {
    return form.invalid;
  }
  handleCancel(): void {
    this.modalService.closeModal();
  }
  getInitialQuizObject(form: FormGroup): InitialQuiz {
    return {
      title: form.get('title')?.value,
      theme: form.get('theme')?.value,
    };
  }
  saveQuiz(): void {
    this.quizService.addInitialQuiz(
      StorageKey.INIT_QUIZ,
      this.getInitialQuizObject(this.form),
    );
    this.modalService.closeModal();
    this.navigateToQuizDetailsPage();
  }
  navigateToQuizDetailsPage() {
    this.router.navigate([
      NavigationRoutes.HOME,
      NavigationRoutes.QUIZ_DETAILS,
    ]);
  }
}
