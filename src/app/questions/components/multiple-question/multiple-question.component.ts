import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { PlaceHolder } from '../../../shared/enums/placeHolder';
import { QuestionForm } from '../../../shared/interfaces/forms';
import { DifficultyList, TypeList } from '../../constants/dropdonws';
import { AnswersFormType } from '../../../shared/types/formsType';
import {
  maxQuestionsAmount,
  minQuestionsAmount
} from '../../constants/questions-info';
import { BUTTON_TYPE } from '../../../shared/enums/buttonType';
import { AnswerDifficultyList } from '../../constants/dropdonws';
import { maxQuestions } from '../../constants/max-questions';
import { QuestionFormHelperService } from '../../../shared/services/questionFormHelper/question-form-helper.service';
import {
  ANSWER_PROPERTIES,
  QUESTION_TYPE
} from '../../../shared/enums/question-info';
import { Question } from '../../interfaces/question';

@Component({
  selector: 'quiz-app-multiple-question',
  templateUrl: './multiple-question.component.html',
  providers: [QuestionFormHelperService]
})
export class MultipleQuestionComponent implements OnInit {
  @Output() saveMultipleFormEvent: EventEmitter<FormGroup<QuestionForm>> =
    new EventEmitter<FormGroup<QuestionForm>>();

  readonly PlaceHolder = PlaceHolder;
  readonly maxQuestionsAmount = maxQuestions;
  readonly AnswerDifficultyList = AnswerDifficultyList;
  readonly ANSWER_PROPERTIES = ANSWER_PROPERTIES;

  get form(): FormGroup<QuestionForm> {
    return this.questionFormHelper?.currentForm;
  }

  constructor(public questionFormHelper: QuestionFormHelperService) {}

  ngOnInit(): void {
    this.initForm();
  }

  addAnswer(): void {
    if (maxQuestions > this.questionFormHelper.answersCount) {
      this.questionFormHelper.addAnswer();
    }
  }

  deleteAnswer(answerIndex: number): void {
    this.answersControl.splice(answerIndex, 1);
  }

  private initForm(): void {
    const question: Question = {
      type: QUESTION_TYPE.MULTIPLE
    };

    this.questionFormHelper.initForm(question);
    this.saveMultipleFormEvent.emit(this.form);
  }
}
