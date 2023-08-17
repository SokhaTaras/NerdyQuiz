import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { QuestionsRoutingModule } from './questions-routing.module';
import { SharedModule } from '../shared/shared.module';

import { QuestionCardComponent } from './components/question-card/question-card.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { CreateQuestionComponent } from './components/create-question/create-question.component';

@NgModule({
  declarations: [
    QuestionCardComponent,
    QuestionListComponent,
    CreateQuestionComponent
  ],
  imports: [CommonModule, BrowserModule, QuestionsRoutingModule, SharedModule],
  exports: [
    QuestionListComponent,
    CreateQuestionComponent,
    QuestionCardComponent
  ]
})
export class QuestionsModule {}
