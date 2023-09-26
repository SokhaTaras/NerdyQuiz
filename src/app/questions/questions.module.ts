import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { SharedModule } from '@a-shared/shared.module';
import { QuestionsRoutingModule } from '@a-questions/questions-routing.module';
import { QuestionCardComponent } from '@a-questions/components/question-card/question-card.component';
import { QuestionListComponent } from '@a-questions/components/question-list/question-list.component';
import { CreateQuestionComponent } from '@a-questions/components/create-question/create-question.component';
import { BooleanQuestionComponent } from '@a-questions/components/boolean-question/boolean-question.component';
import { MultipleQuestionComponent } from '@a-questions/components/multiple-question/multiple-question.component';

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
