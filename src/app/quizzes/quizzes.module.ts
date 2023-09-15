import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { QuizzesRoutingModule } from './quizzes-routing.module';
import { QuestionsModule } from '../questions/questions.module';

import { QuizDetailsComponent } from './components/quiz-details/quiz-details.component';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { QuizCardComponent } from './components/quiz-card/quiz-card.component';
import { CreateQuizModalComponent } from './components/create-quiz-modal/create-quiz-modal.component';
import { HomeComponent } from '../home/components/home/home.component';
import { IntroductionComponent } from './components/introduction/introduction.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SubscriptionsService } from '../shared/services/subscription/subscriptions.service';
import { QuizService } from './services/quiz/quiz.service';

@NgModule({
  declarations: [
    QuizCardComponent,
    QuizListComponent,
    QuizDetailsComponent,
    CreateQuizModalComponent,
    HomeComponent,
    IntroductionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    QuestionsModule,
    QuizzesRoutingModule,
    ReactiveFormsModule,
    NzIconModule
  ],

  //todo get confirmation for solution
  providers: [SubscriptionsService, QuizService]
})
export class QuizzesModule {}
