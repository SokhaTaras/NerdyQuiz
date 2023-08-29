import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { getNewQuestionId } from '../../../shared/utils/getId';
import {
  BooleanQuestionForm,
  MultipleQuestionForm
} from '../../../shared/interfaces/forms.interface';
import { Answer, Question } from '../../interfaces/question.interface';
import { QuizService } from '../../../quizzes/services/quiz/quiz.service';
import { BUTTON_TYPE } from '../../../shared/enums/buttonType';

@Component({
  selector: 'quiz-app-create-question',
  templateUrl: './create-question.component.html'
})
export class CreateQuestionComponent {
  @Input() quizId: string | null;
  @Input() isBoolean: boolean;
  @Output() displayFalse: EventEmitter<void> = new EventEmitter();

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

  get BooleanCorrectAnswer(): string {
    return this.booleanQuestionForm.controls.correctAnswer.value;
  }

  constructor(private quizService: QuizService) {}

  getBooleanQuestionForm(event: any): void {
    this.booleanQuestionForm = event;
    this.isFormNotValid = true;
    this.isFormNotValid = this.disableButton(this.booleanQuestionForm);
  }

  getMultipleQuestionForm(event: any): void {
    this.multipleQuestionForm = event;
    this.isFormNotValid = true;
    this.isFormNotValid = this.disableButton(this.multipleQuestionForm);
  }

  saveQuestion(): void {
    this.quizService.addQuestion(this.quizId, this.formQuestionToObject());
    this.displayFalse.emit();
  }

  cancelQuestion(): void {
    this.displayFalse.emit();
  }

  private formQuestionToObject(): Question {
    const questionId: string = getNewQuestionId();

    if (this.multipleQuestionForm) {
      const multipleQuestion: Question = {
        title: this.multipleTitle,
        type: this.multipleType,
        difficulty: this.multipleDifficulty,
        answers: this.getMultipleAnswers(),
        id: questionId
      };

      return multipleQuestion;
    } else {
      const booleanQuestion: Question = {
        title: this.booleanTitle,
        type: this.booleanType,
        difficulty: this.booleanDifficulty,
        answers: this.BooleanCorrectAnswer,
        id: questionId
      };

      return booleanQuestion;
    }
  }

  private getMultipleAnswers(): Answer[] {
    const answersArray: Answer[] =
      this.multipleQuestionForm.controls.answers.controls.map((answerForm) => {
        const text = answerForm.controls.text.value;
        const isCorrect = answerForm.controls.isCorrect.value;
        return { text, isCorrect };
      });
    return answersArray;
  }

  private disableButton(formGroup: FormGroup): boolean {
    return formGroup && formGroup.invalid;
  }

  protected readonly BUTTON_TYPE = BUTTON_TYPE;
}
