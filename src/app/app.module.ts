import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { QuizCardComponent } from './components/quiz-card/quiz-card.component';
import { IntroductionComponent } from './components/introduction/introduction.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuizListComponent,
    QuizCardComponent,
    IntroductionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
