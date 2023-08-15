import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { SharedModule } from './shared/shared.module';
import { QuizzesModule } from './quizzes/quizzes.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './quizzes/components/home/home.component';
import { QuizListComponent } from './quizzes/components/quiz-list/quiz-list.component';
import { QuizCardComponent } from './quizzes/components/quiz-card/quiz-card.component';
import { IntroductionComponent } from './quizzes/components/introduction/introduction.component';
import { CreateQuizModalComponent } from './quizzes/components/create-quiz-modal/create-quiz-modal.component';
import { QuizDetailsComponent } from './quizzes/components/quiz-details/quiz-details.component';
import { ModalFooterComponent } from './shared/components/modal-footer/modal-footer.component';
import { ModalInputComponent } from './shared/components/modal-input/modal-input.component';
import { ErrorMessageComponent } from './shared/components/error-message/error-message.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuizListComponent,
    QuizCardComponent,
    IntroductionComponent,
    CreateQuizModalComponent,
    QuizDetailsComponent,
    ModalFooterComponent,
    ModalInputComponent,
    ErrorMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NzModalModule,
    ReactiveFormsModule,
    NzButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
