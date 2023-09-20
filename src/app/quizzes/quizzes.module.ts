import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@a-shared/shared.module';
import { QuestionsModule } from '@a-questions/questions.module';
import { QuizzesRoutingModule } from '@a-quizzes/quizzes-routing.module';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { QuizCardComponent } from '@a-quizzes/components/quiz-card/quiz-card.component';
import { QuizListComponent } from '@a-quizzes/components/quiz-list/quiz-list.component';
import { QuizDetailsComponent } from '@a-quizzes/components/quiz-details/quiz-details.component';
import { CreateQuizModalComponent } from '@a-quizzes/components/create-quiz-modal/create-quiz-modal.component';
import { HomeComponent } from '../home/components/home/home.component';
import { IntroductionComponent } from '@a-quizzes/components/introduction/introduction.component';
import { PrePlayComponent } from '@a-quizzes/components/pre-play/pre-play.component';
import { PlayComponent } from '@a-quizzes/components/play/play.component';
import { ResultComponent } from '@a-quizzes/components/result/result.component';

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
