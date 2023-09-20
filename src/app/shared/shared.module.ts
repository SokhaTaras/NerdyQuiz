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
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { SelectComponent } from '@a-shared/components/select/select.component';
import { InputComponent } from '@a-shared/components/input/input.component';
import { ModalFooterComponent } from '@a-shared/components/modal-footer/modal-footer.component';
import { ErrorMessageComponent } from '@a-shared/components/error-message/error-message.component';
import { ConfirmModalComponent } from '@a-shared/components/confirm-modal/confirm-modal.component';
import { RadioButtonComponent } from '@a-shared/components/radio-button/radio-button.component';
import { ButtonComponent } from '@a-shared/components/button/button.component';
import { LoaderComponent } from '@a-shared/components/loader/loader.component';
import { BaseQuizComponent } from '@a-shared/components/base-quiz/base-quiz.component';
import { TranslateJsonPipe } from '@a-shared/pipes/translate-json/translate-json.pipe';

@NgModule({
  declarations: [
    InputComponent,
    ModalFooterComponent,
    ErrorMessageComponent,
    ConfirmModalComponent,
    RadioButtonComponent,
    TranslateJsonPipe,
    ButtonComponent,
    LoaderComponent,
    BaseQuizComponent,
    TranslateJsonPipe,
    SelectComponent
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
    NzIconModule,
    NzSelectModule
  ],
  exports: [
    InputComponent,
    ModalFooterComponent,
    ErrorMessageComponent,
    RadioButtonComponent,
    TranslateJsonPipe,
    ButtonComponent,
    LoaderComponent,
    TranslateJsonPipe,
    SelectComponent
  ]
})
export class SharedModule {}
