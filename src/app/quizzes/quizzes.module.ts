import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@a-shared/shared.module';
import { QuestionsModule } from '@a-questions/questions.module';
import { QuizzesRoutingModule } from '@a-quizzes/quizzes-routing.module';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { QuizDetailsComponent } from './components/quiz-details/quiz-details.component';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { QuizCardComponent } from './components/quiz-card/quiz-card.component';
import { CreateQuizModalComponent } from './components/create-quiz-modal/create-quiz-modal.component';
import { HomeComponent } from '../home/components/home/home.component';
import { IntroductionComponent } from './components/introduction/introduction.component';
import { PrePlayComponent } from './components/pre-play/pre-play.component';
import { PlayComponent } from './components/play/play.component';
import { ResultComponent } from './components/result/result.component';

@NgModule({
  declarations: [
    QuizCardComponent,
    QuizListComponent,
    QuizDetailsComponent,
    CreateQuizModalComponent,
    HomeComponent,
    IntroductionComponent,
    PrePlayComponent,
    PlayComponent,
    ResultComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    QuestionsModule,
    QuizzesRoutingModule,
    ReactiveFormsModule,
    NzIconModule
  ]
})
export class QuizzesModule {}
