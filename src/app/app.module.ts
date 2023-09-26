import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@a-shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { QuizzesModule } from '@a-quizzes/quizzes.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    QuizzesModule,
    SharedModule,
    BrowserModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
