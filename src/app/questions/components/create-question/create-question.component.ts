import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { getNewQuestionId } from '../../../shared/utils/getId';
import { QuestionForm } from '../../../shared/interfaces/forms.interface';
import { Answer, Question } from '../../interfaces/question.interface';
import { QuizService } from '../../../quizzes/services/quiz/quiz.service';

@Component({
  selector: 'quiz-app-create-question',
  templateUrl: './create-question.component.html'
})
export class CreateQuestionComponent implements OnDestroy {
  @Input() quizId: string | null;
  @Input() isBoolean: boolean;
  @Output() hideCreation: EventEmitter<void> = new EventEmitter();

  booleanQuestionForm: FormGroup<QuestionForm>;
  multipleQuestionForm: FormGroup<QuestionForm>;
  isFormNotValid = true;
  formSubscription: Subscription;

  constructor(private quizService: QuizService) {}

  getBooleanQuestionForm(event: any): void {
    this.booleanQuestionForm = event;
    this.disableButton(this.booleanQuestionForm);
  }

  getMultipleQuestionForm(event: any): void {
    this.multipleQuestionForm = event;
    this.disableButton(this.multipleQuestionForm);
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
    const formData = this.getFormData();
    const questionId: string = getNewQuestionId();

    const question: Question = {
      title: formData.controls.title.value,
      type: formData.controls.type.value,
      difficulty: formData.controls.difficulty.value,
      answers: this.getAnswers(formData),
      id: questionId
    };

    return question;
  }

  private getFormData(): FormGroup<QuestionForm> {
    if (this.multipleQuestionForm) {
      return this.multipleQuestionForm;
    } else {
      return this.booleanQuestionForm;
    }
  }

  private getAnswers(form: FormGroup<QuestionForm>): Answer[] {
    const answersArray: Answer[] = form.controls.answers.controls.map(
      (answerForm) => {
        const text = answerForm.controls.text.value;
        const isCorrect = answerForm.controls.isCorrect.value;
        return { text, isCorrect };
      }
    );
    return answersArray;
  }

  private disableButton(formGroup: FormGroup): void {
    this.formSubscription = formGroup.valueChanges.subscribe(() => {
      return (this.isFormNotValid = formGroup.invalid);
    });
  }

  ngOnDestroy() {
    this.formSubscription.unsubscribe();
  }
}
