import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { QuizDetailsComponent } from './components/quiz-details/quiz-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home/quiz-details-page', component: QuizDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class QuizzesRoutingModule {}
