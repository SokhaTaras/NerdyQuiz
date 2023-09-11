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
import { Answer, Question } from '../../../questions/interfaces/question';
import { ANSWER_PROPERTIES, QUESTION_TYPE } from '../../enums/question-info';
import {
  AnswerBooleanList,
  AnswerDifficultyList,
  AnswerTypeList
} from '../../../questions/constants/dropdonws';

export const defaultFormValues = {
  title: '',
  type: AnswerTypeList[0].value,
  difficulty: AnswerDifficultyList[0].value
};

@Injectable()
export class QuestionFormHelperService implements OnDestroy {
  currentForm: FormGroup<QuestionForm>;

  radioButtonsSubscription: Subscription;

  get title(): FormControl {
    return this.currentForm?.controls?.title;
  }

  get difficulty(): FormControl {
    return this.currentForm?.controls?.difficulty;
  }

  get type(): FormControl {
    return this.currentForm?.controls?.type;
  }

  get answersFormArray(): FormArray {
    return this.currentForm?.controls?.answers;
  }

  get answersCount(): number {
    return this.currentForm?.controls?.answers?.length;
  }

  constructor(private fb: FormBuilder) {}

  initForm(question: Question): void {
    let currentAnswers: AnswersFormType[];

    if (question.answers) {
      currentAnswers = this.mapCurrentAnswers(question.answers);
    }

    const defaultAnswers = this.generateDefaultAnswers(question.type);

    const initForm: QuestionForm = {
      title: this.fb.control(question.title || defaultFormValues.title, [
        Validators.required
      ]),
      type: this.fb.control(question.type, [Validators.required]),
      difficulty: this.fb.control(
        question.difficulty || defaultFormValues.difficulty,
        [Validators.required]
      ),
      answers: this.fb.array(currentAnswers || defaultAnswers, [
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

  addAnswer(): void {
    const answer: AnswersFormType = this.generateNewAnswer('', false);
    this.answersFormArray.push(answer);
    this.initRadioButtons();
  }

  private mapCurrentAnswers(answers: Answer[]): AnswersFormType[] {
    if (answers) {
      const mappedAnswers = answers.map((a) => {
        return this.generateNewAnswer(a.text, a.isCorrect);
      });
      return mappedAnswers;
    } else {
      return [];
    }
  }

  private initRadioButtons(): void {
    if (this.radioButtonsSubscription) {
      this.radioButtonsSubscription.unsubscribe();
    }

    this.answersFormArray.controls.forEach((control, index) => {
      this.radioButtonsSubscription = control.valueChanges.subscribe(
        (checked) => {
          if (checked.isCorrect) {
            this.answersFormArray.controls.forEach(
              (otherControl, otherIndex) => {
                if (otherIndex !== index) {
                  otherControl
                    .get(ANSWER_PROPERTIES.IS_CORRECT)
                    ?.setValue(false);
                }
              }
            );
          }
        }
      );
    });
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

  ngOnDestroy(): void {
    this.radioButtonsSubscription.unsubscribe();
  }
}
