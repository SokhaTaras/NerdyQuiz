import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  FormControlStatus
} from '@angular/forms';
import { InitQuizForm } from '../../../shared/interfaces/forms.interface';
import { Quiz } from '../../interfaces/quiz.interface';
import { StorageKey } from '../../../shared/enums/storageKey';
import { NavigationRoutes } from '../../../shared/enums/navigationRoutes';
import { QuizService } from '../../services/quiz/quiz.service';
import { ModalQuizService } from '../../services/modal-quiz/modal-quiz.service';
import { Router } from '@angular/router';
import { PlaceHolder } from '../../../shared/enums/placeHolder';

@Component({
  selector: 'quiz-app-create-quiz-modal',
  templateUrl: './create-quiz-modal.component.html'
})
export class CreateQuizModalComponent implements OnInit {
  protected readonly PlaceHolder = PlaceHolder;

  public initQuizForm!: FormGroup<InitQuizForm>;
  isValid: FormControlStatus | boolean = true;
  quizId: string | undefined;

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
    this.getValidForm();
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

  getValidForm(): void {
    this.initQuizForm.statusChanges.subscribe((isValid): void => {
      this.isValid = isValid !== 'VALID';
    });
  }

  getInitialQuizObject(form: FormGroup): Quiz {
    const newQuizId: string = this.quizService.geNewQuizId();
    const quiz: Quiz = {
      title: form.get('title')?.value,
      theme: form.get('theme')?.value,
      id: newQuizId
    };

    this.quizId = newQuizId;

    return quiz;
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
      `${this.quizId}`,
      NavigationRoutes.DETAILS
    ]);
  }
}
