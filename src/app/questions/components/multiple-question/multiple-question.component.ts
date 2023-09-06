import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { PlaceHolder } from '../../../shared/enums/placeHolder';
import { QuestionForm } from '../../../shared/interfaces/forms';
import { DifficultyList } from '../../constants/dropdonws';
import { AnswersFormType } from '../../../shared/types/formsType';
import { maxQuestions } from '../../constants/max-questions';
import { QuestionFormHelperService } from '../../../shared/services/questionFormHelper/question-form-helper.service';
import { QUESTION_TYPE } from '../../../shared/enums/question-info';
import {
  CommonProperties,
  Question
} from '../../interfaces/question.interface';

@Component({
  selector: 'quiz-app-multiple-question',
  templateUrl: './multiple-question.component.html',
  providers: [QuestionFormHelperService]
})
export class MultipleQuestionComponent implements OnInit {
  @Output() saveMultipleFormEvent: EventEmitter<FormGroup<QuestionForm>> =
    new EventEmitter<FormGroup<QuestionForm>>();

  public multipleQuestionForm: FormGroup<QuestionForm>;
  public formData: CommonProperties;

  protected readonly PlaceHolder = PlaceHolder;
  protected readonly difficultyList = DifficultyList;
  protected readonly maxQuestionsAmount = maxQuestions;

  constructor(private questionFormHelper: QuestionFormHelperService) {}

  ngOnInit(): void {
    this.initForm();
    this.initControls();
    this.questionFormHelper.initRadioButtons();
  }

  addAnswer(): void {
    const answer: AnswersFormType = this.questionFormHelper.generateNewAnswer(
      '',
      false
    );

    this.formData.answersControl.push(answer);
    this.formData.answerLength = this.questionFormHelper.answerLength;
    this.questionFormHelper.initRadioButtons();
    this.saveMultipleFormEvent.emit(this.multipleQuestionForm);
  }

  private initForm(): void {
    const question: Question = {
      type: QUESTION_TYPE.MULTIPLE
    };
    this.questionFormHelper.initForm(question);
    this.multipleQuestionForm = this.questionFormHelper.currentForm;
    this.saveMultipleFormEvent.emit(this.multipleQuestionForm);
  }

  private initControls(): void {
    this.formData = this.questionFormHelper.getControls();
  }
}
