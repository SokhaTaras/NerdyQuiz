import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { QuizzesModule } from './quizzes/quizzes.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, QuizzesModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
