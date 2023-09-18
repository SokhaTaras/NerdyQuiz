import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { InputComponent } from './components/input/input.component';
import { ModalFooterComponent } from './components/modal-footer/modal-footer.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { RadioButtonComponent } from './components/radio-button/radio-button.component';
import { TranslateJsonPipe } from './pipes/translate-json/translate-json.pipe';
import { ButtonComponent } from './components/button/button.component';
import { LoaderComponent } from './components/loader/loader.component';
import { BaseQuizComponent } from './components/base-quiz/base-quiz.component';

@NgModule({
  declarations: [
    InputComponent,
    ModalFooterComponent,
    ErrorMessageComponent,
    DropdownComponent,
    ConfirmModalComponent,
    RadioButtonComponent,
    TranslateJsonPipe,
    ButtonComponent,
    LoaderComponent,
    BaseQuizComponent,
    TranslateJsonPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzModalModule,
    BrowserModule,
    BrowserAnimationsModule,
    NzDropDownModule,
    NzRadioModule,
    NzIconModule
  ],
  exports: [
    InputComponent,
    ModalFooterComponent,
    ErrorMessageComponent,
    DropdownComponent,
    RadioButtonComponent,
    TranslateJsonPipe,
    ButtonComponent,
    LoaderComponent,
    TranslateJsonPipe
  ]
})
export class SharedModule {}
