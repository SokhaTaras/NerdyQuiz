import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { QuizService } from '../../services/quiz/quiz.service';
import { InitQuizForm } from '../../../shared/types/forms';
import { Quiz } from '../../interfaces/quiz';
import { PlaceHolder } from '../../../shared/enums/placeHolder';
import { ModalRefFacadeService } from '../../../shared/services/modal-ref-facade/modal-ref-facade.service';

@Component({
  selector: 'quiz-app-create-quiz-modal',
  templateUrl: './create-quiz-modal.component.html',
  providers: [ModalRefFacadeService]
})
export class CreateQuizModalComponent implements OnInit {
  @Input() quizId: string;
  @Input() quiz: Quiz = {};
  @Input() label: string;
  @Input() buttonText: string;

  public initQuizForm: FormGroup<InitQuizForm>;

  readonly PlaceHolder = PlaceHolder;

  get title() {
    return this.initQuizForm.controls.title;
  }

  get theme() {
    return this.initQuizForm.controls.theme;
  }

  constructor(
    private fb: FormBuilder,
    private quizService: QuizService,
    private modalRefFacadeService: ModalRefFacadeService<Quiz>
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

    const saveMethod = this.getSaveMethod();

    const quizToSave = saveMethod(newQuiz);

    this.close(quizToSave);
  }

  private getSaveMethod(): (quiz: Quiz) => Quiz {
    if (!this.quiz.id) {
      return this.addQuiz.bind(this);
    } else {
      return this.editQuiz.bind(this);
    }
  }

  private editQuiz(newQuiz: Quiz): Quiz {
    return this.quizService.editQuiz(this.quiz.id, newQuiz);
  }

  private addQuiz(newQuiz: Quiz): Quiz {
    return this.quizService.addQuiz(newQuiz);
  }

  private initForm(): void {
    this.initQuizForm = this.fb.nonNullable.group<InitQuizForm>({
      title: this.fb.control(this.quiz.title || '', [
        Validators.required,
        Validators.minLength(2)
      ]),
      theme: this.fb.control(this.quiz.theme || '', [
        Validators.required,
        Validators.minLength(2)
      ])
    });
  }

  private getFormData(): Quiz {
    const quiz: Quiz = {
      title: this.initQuizForm.controls.title.value,
      theme: this.initQuizForm.controls.theme.value,
      questions: []
    };

    return quiz;
  }
}
