import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Question } from '../../interfaces/question.interface';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  public questions$ = new BehaviorSubject<Question[]>([]);

  constructor() {}

  addQuestion(): void {}

  geNewQuestionId(): string {
    const hexadecimalSystem = 16;
    return new Date().getTime().toString(hexadecimalSystem);
  }
}
