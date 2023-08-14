import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StorageKey } from '../../enums/storageKey';
import { NavigationRoutes } from '../../enums/navigationRoutes';
import { Router } from '@angular/router';
import { QuizService } from '../../services/quiz/quiz.service';
import { ModalFacadeService } from '../../services/modal-facade/modal-facade.service';
import { Quiz } from '../../interfaces/quiz.interface';
@Component({
  selector: 'quiz-app-modal-footer',
  templateUrl: './modal-footer.component.html',
})
export class ModalFooterComponent {
  @Input() form: FormGroup = new FormGroup({});
  constructor(
    private modalFacadeService: ModalFacadeService,
    private router: Router,
    private quizService: QuizService,
  ) {}
  hasFormErrors(form: FormGroup): boolean {
    return form.invalid;
  }
  handleCancel(): void {
    this.modalFacadeService.closeModal();
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
      this.getInitialQuizObject(this.form),
    );
    this.modalFacadeService.closeModal();
    this.navigateToQuizDetailsPage();
  }
  navigateToQuizDetailsPage() {
    this.router.navigate([
      NavigationRoutes.HOME,
      NavigationRoutes.QUIZ_DETAILS,
    ]);
  }
}
