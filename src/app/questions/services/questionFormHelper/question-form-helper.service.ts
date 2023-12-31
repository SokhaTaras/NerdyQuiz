import { Injectable, SkipSelf } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import {
  AnswerBooleanList,
  AnswerDifficultyList,
  AnswerTypeList
} from '@a-questions/constants/dropdowns';
import { SubscriptionsService } from '@a-shared/services/subscription/subscriptions.service';
import {
  ANSWER_PROPERTIES,
  QUESTION_DIFFICULTY,
  QUESTION_TYPE
} from '@a-shared/enums/question-info';
import { AnswersFormType, QuestionForm } from '@a-shared/types/forms';
import { Answer, Question } from '@a-questions/interfaces/question';

export const defaultFormValues = {
  title: '',
  type: AnswerTypeList[0].value,
  difficulty: AnswerDifficultyList[0].value as QUESTION_DIFFICULTY
};

@Injectable()
export class QuestionFormHelperService {
  currentForm: FormGroup<QuestionForm>;

  get title(): FormControl {
    return this.currentForm?.controls?.title;
  }

  get type(): FormControl {
    return this.currentForm?.controls?.type;
  }

  get answersFormArray(): FormArray {
    return this.currentForm?.controls?.answers;
  }

  get answersControl(): AnswersFormType[] {
    return this.currentForm?.controls?.answers.controls;
  }

  get answersCount(): number {
    return this.currentForm?.controls?.answers?.length;
  }

  constructor(
    private fb: FormBuilder,
    @SkipSelf() private subscriptionsService: SubscriptionsService
  ) {}

  initForm(question: Question): void {
    let currentAnswers: AnswersFormType[];

    if (question?.answers) {
      currentAnswers = this.mapCurrentAnswers(question.answers);
    }

    const defaultAnswers = this.generateDefaultAnswers(question?.type);

    const initForm: QuestionForm = {
      title: this.fb.control(question?.title || defaultFormValues.title, [
        Validators.required
      ]),
      type: this.fb.control(question?.type, [Validators.required]),
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
    this.answersFormArray.controls.forEach((control, index) => {
      this.subscriptionsService.addSubscription(
        control.valueChanges.subscribe((checked) => {
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
        })
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
}
