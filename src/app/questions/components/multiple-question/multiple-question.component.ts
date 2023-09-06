import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { PlaceHolder } from '../../../shared/enums/placeHolder';
import { QuestionForm } from '../../../shared/interfaces/forms';
import { AnswerDifficultyList } from '../../constants/dropdonws';
import { AnswersFormType } from '../../../shared/types/formsType';
import { maxQuestions } from '../../constants/max-questions';
import { QuestionFormHelperService } from '../../../shared/services/questionFormHelper/question-form-helper.service';
import { QUESTION_TYPE } from '../../../shared/enums/question-info';
import { Question } from '../../interfaces/question.interface';

@Component({
  selector: 'quiz-app-multiple-question',
  templateUrl: './multiple-question.component.html',
  providers: [QuestionFormHelperService]
})
export class MultipleQuestionComponent implements OnInit {
  @Output() saveMultipleFormEvent: EventEmitter<FormGroup<QuestionForm>> =
    new EventEmitter<FormGroup<QuestionForm>>();

  public multipleQuestionForm: FormGroup<QuestionForm>;

  protected readonly PlaceHolder = PlaceHolder;
  protected readonly maxQuestionsAmount = maxQuestions;
  protected readonly AnswerDifficultyList = AnswerDifficultyList;

  get form(): FormGroup<QuestionForm> {
    return this.questionFormHelper.currentForm;
  }

  get titleControl(): FormControl<string> {
    return this.form.controls.title;
  }

  get difficultyControl(): FormControl<string> {
    return this.form.controls.difficulty;
  }

  get answerControl(): AnswersFormType[] {
    return this.form.controls.answers.controls;
  }

  get answersFormArray(): FormArray {
    return this.form.controls.answers;
  }

  get answerLength(): number {
    return this.form.controls.answers.length;
  }

  constructor(private questionFormHelper: QuestionFormHelperService) {}

  ngOnInit(): void {
    this.initForm();
    this.questionFormHelper.initRadioButtons();
  }

  addAnswer(): void {
    this.questionFormHelper.addAnswer();
  }

  private initForm(): void {
    const question: Question = {
      type: QUESTION_TYPE.MULTIPLE
    };

    this.questionFormHelper.initForm(question);
    this.multipleQuestionForm = this.form;
    this.saveMultipleFormEvent.emit(this.multipleQuestionForm);
  }
}
