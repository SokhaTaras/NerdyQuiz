import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { PlaceHolder } from '../../../shared/enums/placeHolder';
import { QuestionForm } from '../../../shared/interfaces/forms';
import { AnswerDifficultyList } from '../../constants/dropdonws';
import {
  maxQuestionsAmount,
  minQuestionsAmount
} from '../../constants/questions-info';
import { QuestionFormHelperService } from '../../../shared/services/questionFormHelper/question-form-helper.service';
import {
  ANSWER_PROPERTIES,
  QUESTION_TYPE
} from '../../../shared/enums/question-info';
import { Question } from '../../interfaces/question';
import { BUTTON_TYPE } from '../../../shared/enums/buttonType';

@Component({
  selector: 'quiz-app-multiple-question',
  templateUrl: './multiple-question.component.html',
  providers: [QuestionFormHelperService]
})
export class MultipleQuestionComponent implements OnInit {
  @Output() saveMultipleFormEvent: EventEmitter<FormGroup<QuestionForm>> =
    new EventEmitter<FormGroup<QuestionForm>>();

  readonly PlaceHolder = PlaceHolder;
  readonly maxQuestionsAmount = maxQuestionsAmount;
  readonly AnswerDifficultyList = AnswerDifficultyList;
  readonly ANSWER_PROPERTIES = ANSWER_PROPERTIES;
  readonly BUTTON_TYPE = BUTTON_TYPE;
  readonly minQuestionsAmount = minQuestionsAmount;

  get form(): FormGroup<QuestionForm> {
    return this.questionFormHelper?.currentForm;
  }

  constructor(public questionFormHelper: QuestionFormHelperService) {}

  ngOnInit(): void {
    this.initForm();
  }

  addAnswer(): void {
    if (maxQuestionsAmount > this.questionFormHelper.answersCount) {
      this.questionFormHelper.addAnswer();
    }
  }

  deleteAnswer(answerIndex: number): void {
    this.questionFormHelper.answersFormArray.controls.splice(answerIndex, 1);
  }

  private initForm(): void {
    const question: Question = {
      type: QUESTION_TYPE.MULTIPLE
    };

    this.questionFormHelper.initForm(question);
    this.saveMultipleFormEvent.emit(this.form);
  }
}
