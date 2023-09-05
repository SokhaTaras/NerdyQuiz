import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { PlaceHolder } from '../../../shared/enums/placeHolder';
import { QuestionForm } from '../../../shared/interfaces/forms';
import { DifficultyList } from '../../constants/dropdonws';
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

  multipleQuestionForm: FormGroup<QuestionForm>;

  protected readonly PlaceHolder = PlaceHolder;
  protected readonly difficultyList = DifficultyList;
  protected readonly maxQuestionsAmount = maxQuestions;

  get title(): FormControl {
    return this.multipleQuestionForm.controls.title;
  }

  get type(): FormControl {
    return this.multipleQuestionForm.controls.type;
  }

  get difficulty(): FormControl {
    return this.multipleQuestionForm.controls.difficulty;
  }

  get answerLength(): number {
    return this.multipleQuestionForm.controls.answers.length;
  }

  get answersFormArray(): FormArray {
    return this.multipleQuestionForm.controls.answers;
  }

  get answersControl(): AnswersFormType[] {
    const formArray = this.multipleQuestionForm.controls.answers;
    return formArray.controls;
  }

  constructor(private questionFormHelper: QuestionFormHelperService) {}

  ngOnInit(): void {
    this.initForm();
    this.questionFormHelper.initRadioButtons(this.answersFormArray);
  }

  addAnswer(): void {
    const answer: AnswersFormType = this.questionFormHelper.generateNewAnswer(
      '',
      false
    );

    this.answersControl.push(answer);
    this.questionFormHelper.initRadioButtons(this.answersFormArray);
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
}
