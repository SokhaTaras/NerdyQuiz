import { Injectable, SkipSelf } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { QuestionForm } from '../../../shared/interfaces/forms';
import { AnswersFormType } from '../../../shared/types/formsType';
import { Question } from '../../interfaces/question.interface';
import { QUESTION_TYPE } from '../../../shared/enums/question-info';
import {
  AnswerBooleanList,
  AnswerDifficultyList,
  AnswerTypeList
} from '../../constants/dropdonws';
import { SubscriptionsService } from '../../../shared/services/subscription/subscriptions.service';

export const defaultForm: QuestionForm = {
  title: new FormControl(''),
  type: new FormControl(AnswerTypeList[0].value),
  difficulty: new FormControl(AnswerDifficultyList[0].value),
  answers: new FormArray([])
};

@Injectable()
export class QuestionFormHelperService {
  currentForm: FormGroup<QuestionForm>;

  get title(): FormControl {
    return this.currentForm.controls.title;
  }

  get type(): FormControl {
    return this.currentForm.controls.type;
  }

  get answersFormArray(): FormArray {
    return this.currentForm.controls.answers;
  }

  constructor(
    private fb: FormBuilder,
    @SkipSelf() private subscriptionsService: SubscriptionsService
  ) {}

  initForm(question: Question): void {
    let currentAnswers: AnswersFormType[] = [];

    if (question.answers) {
      currentAnswers = this.mapCurrentAnswers(question);
    }

    const defaultAnswers = this.generateDefaultAnswers(question.type);

    const initForm: QuestionForm = {
      title: this.fb.control(defaultForm.title.value || question.title, [
        Validators.required
      ]),
      type: this.fb.control(question.type, [Validators.required]),
      difficulty: this.fb.control(
        defaultForm.difficulty.value || question.difficulty,
        [Validators.required]
      ),
      answers: this.fb.array(defaultAnswers || currentAnswers, [
        Validators.required
      ])
    };

    this.currentForm = this.fb.group<QuestionForm>(initForm);
    this.initRadioButtons();
  }

  generateNewAnswer(text: string, isCorrect: boolean): AnswersFormType {
    return this.fb.group({
      text: this.fb.control(text, [Validators.required]),
      isCorrect: this.fb.control(isCorrect)
    });
  }

  //todo radio buttons group onChange
  initRadioButtons(): void {
    this.answersFormArray.controls.forEach((control, index) => {
      this.subscriptionsService.addSubscription(
        control.valueChanges.subscribe((checked) => {
          if (checked.isCorrect) {
            this.answersFormArray.controls.forEach(
              (otherControl, otherIndex) => {
                if (otherIndex !== index) {
                  otherControl.get('isCorrect')?.setValue(false);
                }
              }
            );
          }
        })
      );
    });
  }

  addAnswer(): void {
    const answer: AnswersFormType = this.generateNewAnswer('', false);
    this.answersFormArray.push(answer);
    this.initRadioButtons();
  }

  mapCurrentAnswers(question: Question): AnswersFormType[] {
    if (question) {
      const answers = question.answers.map((a) => {
        return this.generateNewAnswer(a.text, a.isCorrect);
      });
      return answers;
    } else {
      return [];
    }
  }

  private generateDefaultAnswers(answerType: string): AnswersFormType[] {
    if (answerType === QUESTION_TYPE.MULTIPLE) {
      const answers = [
        this.generateNewAnswer('', true),
        this.generateNewAnswer('', false)
      ];
      return answers;
    } else if (answerType === QUESTION_TYPE.BOOLEAN) {
      const answers = [
        this.generateNewAnswer(AnswerBooleanList[0].value, true),
        this.generateNewAnswer(AnswerBooleanList[1].value, false)
      ];
      return answers;
    } else {
      return [];
    }
  }
}
