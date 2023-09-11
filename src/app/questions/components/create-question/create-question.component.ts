import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { QuestionForm } from '../../../shared/interfaces/forms';
import { Question } from '../../interfaces/question';
import { QuizService } from '../../../quizzes/services/quiz/quiz.service';
import { BUTTON_TYPE } from '../../../shared/enums/buttonType';

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
  addQuestSubscription: Subscription;

  protected readonly BUTTON_TYPE = BUTTON_TYPE;

  protected readonly BUTTON_TYPE = BUTTON_TYPE;

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
    this.addQuestSubscription = this.quizService
      .addQuestion(this.quizId, question)
      .subscribe();
    this.hideCreation.emit();
  }

  cancelQuestion(): void {
    this.hideCreation.emit();
  }

  private mapQuestionToObject(): Question {
    const formData = this.getFormData();

    const question: Question = {
      title: formData.title,
      type: formData.type,
      difficulty: formData.difficulty,
      answers: formData.answers
    };

    return question;
  }

  private getFormData(): Question {
    if (this.multipleQuestionForm) {
      return this.multipleQuestionForm.value as Question;
    } else {
      return this.booleanQuestionForm.value as Question;
    }
  }

  private disableButton(formGroup: FormGroup): void {
    this.formSubscription = formGroup.valueChanges.subscribe(() => {
      return (this.isFormNotValid = formGroup.invalid);
    });
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
    this.addQuestSubscription.unsubscribe();
  }
}
