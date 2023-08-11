import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { QuizCardComponent } from './components/quiz-card/quiz-card.component';
import { IntroductionComponent } from './components/introduction/introduction.component';
import { InitQuizModalComponent } from './components/init-quiz-modal/init-quiz-modal.component';
import { QuizDetailsComponent } from './components/quiz-details/quiz-details.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuizListComponent,
    QuizCardComponent,
    IntroductionComponent,
    InitQuizModalComponent,
    QuizDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NzModalModule,
    ReactiveFormsModule,
    NzButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
