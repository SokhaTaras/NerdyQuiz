import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { getNewQuestionId } from '../../../shared/utils/getId';
import {
  BooleanQuestionForm,
  MultipleQuestionForm
} from '../../../shared/interfaces/forms.interface';
import { Answer, Question } from '../../interfaces/question.interface';
import { QuizService } from '../../../quizzes/services/quiz/quiz.service';

@Component({
  selector: 'quiz-app-create-question',
  templateUrl: './create-question.component.html'
})
export class CreateQuestionComponent {
  @Input() quizId: string | null;
  @Input() isBoolean: boolean;
  @Output() hideCreation: EventEmitter<void> = new EventEmitter();

  booleanQuestionForm: FormGroup<BooleanQuestionForm>;
  multipleQuestionForm: FormGroup<MultipleQuestionForm>;
  isFormNotValid = true;

  get multipleTitle(): string {
    return this.multipleQuestionForm.controls.title.value;
  }

  get multipleType(): string {
    return this.multipleQuestionForm.controls.type.value;
  }

  get multipleDifficulty(): string {
    return this.multipleQuestionForm.controls.difficulty.value;
  }

  get booleanTitle(): string {
    return this.booleanQuestionForm.controls.title.value;
  }

  get booleanType(): string {
    return this.booleanQuestionForm.controls.type.value;
  }

  get booleanDifficulty(): string {
    return this.booleanQuestionForm.controls.difficulty.value;
  }

  constructor(private quizService: QuizService) {}

  getBooleanQuestionForm(event: any): void {
    this.booleanQuestionForm = event;
    this.isFormNotValid = this.disableButton(this.booleanQuestionForm);
  }

  getMultipleQuestionForm(event: any): void {
    this.multipleQuestionForm = event;
    this.isFormNotValid = this.disableButton(this.multipleQuestionForm);
  }

  saveQuestion(): void {
    const question: Question = this.mapQuestionToObject();
    this.quizService.addQuestion(this.quizId, question);
    this.hideCreation.emit();
  }

  cancelQuestion(): void {
    this.hideCreation.emit();
  }

  private mapQuestionToObject(): Question {
    const questionId: string = getNewQuestionId();

    if (this.multipleQuestionForm) {
      const formData = this.multipleQuestionForm.value;
      const multipleQuestion: Question = {
        title: formData.title,
        type: formData.type,
        difficulty: formData.difficulty,
        answers: this.getMultipleAnswers(this.multipleQuestionForm),
        // answers: formData.answers.map(),
        id: questionId
      };

      return multipleQuestion;
    } else {
      const fromData = this.booleanQuestionForm.value;
      const booleanQuestion: Question = {
        title: this.booleanTitle,
        type: this.booleanType,
        difficulty: this.booleanDifficulty,
        answers: this.getMultipleAnswers(this.booleanQuestionForm),
        id: questionId
      };

      return booleanQuestion;
    }
  }

  private getFormData() {}

  private getMultipleAnswers(
    form: FormGroup<MultipleQuestionForm> | FormGroup<BooleanQuestionForm>
  ): Answer[] {
    const answersArray: Answer[] = form.controls.answers.controls.map(
      (answerForm) => {
        const text = answerForm.controls.text.value;
        const isCorrect = answerForm.controls.isCorrect.value;
        return { text, isCorrect };
      }
    );
    return answersArray;
  }

  private disableButton(formGroup: FormGroup): boolean {
    return formGroup && formGroup.invalid;
  }
}
