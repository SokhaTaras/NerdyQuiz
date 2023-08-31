import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionsRoutingModule } from './questions-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NzRadioModule } from 'ng-zorro-antd/radio';

import { QuestionCardComponent } from './components/question-card/question-card.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { CreateQuestionComponent } from './components/create-question/create-question.component';
import { BooleanQuestionComponent } from './components/boolean-question/boolean-question.component';
import { MultipleQuestionComponent } from './components/multiple-question/multiple-question.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@NgModule({
  declarations: [
    QuestionCardComponent,
    QuestionListComponent,
    CreateQuestionComponent,
    BooleanQuestionComponent,
    MultipleQuestionComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    QuestionsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NzRadioModule,
    NzDropDownModule
  ],
  exports: [
    QuestionListComponent,
    CreateQuestionComponent,
    QuestionCardComponent,
    MultipleQuestionComponent,
    BooleanQuestionComponent
  ]
})
export class QuestionsModule {}
