import { Injectable, OnDestroy } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Subscription } from 'rxjs';

import { QuestionForm } from '../../interfaces/forms';
import { AnswersFormType } from '../../types/formsType';
import { Question } from '../../../questions/interfaces/question.interface';
import { QUESTION_TYPE } from '../../enums/question-info';
import {
  AnswerBooleanList,
  AnswerDifficultyList,
  AnswerTypeList
} from '../../../questions/constants/dropdonws';

export const defaultForm: QuestionForm = {
  title: new FormControl(''),
  type: new FormControl(AnswerTypeList[0].value),
  difficulty: new FormControl(AnswerDifficultyList[0].value),
  answers: new FormArray([])
};

@Injectable()
export class QuestionFormHelperService implements OnDestroy {
  radioButtonsSubscription: Subscription[] = [];
  currentForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

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
      type: this.fb.control(defaultForm.type.value || question.type, [
        Validators.required
      ]),
      difficulty: this.fb.control(
        defaultForm.difficulty.value || question.difficulty,
        [Validators.required]
      ),
      answers: this.fb.array(defaultAnswers || currentAnswers, [
        Validators.required
      ])
    };

    this.currentForm = this.fb.group<QuestionForm>(initForm);

    console.log(this.currentForm);
  }

  generateNewAnswer(text: string, isCorrect: boolean): AnswersFormType {
    return this.fb.group({
      text: this.fb.control(text, [Validators.required]),
      isCorrect: this.fb.control(isCorrect)
    });
  }

  initRadioButtons(answersFormArray: FormArray): void {
    answersFormArray.controls.forEach((control, index) => {
      this.radioButtonsSubscription.push(
        control.valueChanges.subscribe((checked) => {
          if (checked.isCorrect) {
            answersFormArray.controls.forEach((otherControl, otherIndex) => {
              if (otherIndex !== index) {
                otherControl.get('isCorrect')?.setValue(false);
              }
            });
          }
        })
      );
    });
  }

  mapCurrentAnswers(question: Question): AnswersFormType[] {
    if (question) {
      const answers = question.answers.map((a) => {
        return this.generateNewAnswer(a.text, a.isCorrect);
      });
      console.log(answers);
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
    } else if (answerType === QUESTION_TYPE.MULTIPLE) {
      const answers = [
        this.generateNewAnswer(AnswerBooleanList[0].value, true),
        this.generateNewAnswer(AnswerBooleanList[1].value, false)
      ];
      return answers;
    } else {
      return [];
    }
  }

  // private getFormConfig(): QuestionForm {
  //   return {
  //     title: this.fb.control('', [Validators.required]),
  //     type: this.fb.control('', [Validators.required]),
  //     difficulty: this.fb.control(AnswerDifficultyList[0].value, [
  //       Validators.required
  //     ]),
  //     answers: this.fb.array(
  //       [this.generateNewAnswer('', true)],
  //       [Validators.required]
  //     )
  //   };
  // }

  ngOnDestroy(): void {
    this.radioButtonsSubscription.forEach((sub) => sub.unsubscribe());
  }
}
