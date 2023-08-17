import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuizDetailsComponent } from './components/quiz-details/quiz-details.component';

const routes: Routes = [{ path: 'details', component: QuizDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class QuizzesRoutingModule {}
