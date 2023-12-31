import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@a-shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { QuizzesModule } from '@a-quizzes/quizzes.module';
import { AppComponent } from './app.component';
import { appReducers } from './store/reducers/app.reducers';
import { QuizEffects } from './store/effects/quiz.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    QuizzesModule,
    SharedModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([QuizEffects]),
    BrowserModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
