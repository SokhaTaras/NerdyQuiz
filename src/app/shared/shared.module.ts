import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';

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
import { PopoverComponent } from './components/popover/popover.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { TextSanitizerPipe } from './pipes/text-sanitizer/text-sanitizer.pipe';
import { AddQuizComponent } from './components/add-quiz/add-quiz.component';
import { LabelComponent } from './components/label/label.component';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { DividerComponent } from './components/divider/divider.component';
import { PopoverItemComponent } from './components/popover-item/popover-item.component';
import { DifficultyListComponent } from '@a-shared/components/difficulty-list/difficulty-list.component';
import { CollapsePanelComponent } from './components/collapse-panel/collapse-panel.component';
import { CorrectnessStatusComponent } from '@a-shared/components/correctness-status/correctness-status.component';
import { InfoCardComponent } from './components/info-card/info-card.component';

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
    PopoverComponent,
    SelectComponent,
    PopoverComponent,
    ProgressBarComponent,
    TextSanitizerPipe,
    AddQuizComponent,
    LabelComponent,
    SvgIconComponent,
    DividerComponent,
    PopoverItemComponent,
    CollapsePanelComponent,
    InfoCardComponent,
    DifficultyListComponent,
    CorrectnessStatusComponent
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
    NzSelectModule,
    NzPopoverModule,
    NzDividerModule,
    NgOptimizedImage,
    NzCollapseModule,
    AngularSvgIconModule.forRoot()
  ],
  exports: [
    InputComponent,
    ModalFooterComponent,
    ErrorMessageComponent,
    RadioButtonComponent,
    TranslateJsonPipe,
    ButtonComponent,
    LoaderComponent,
    PopoverComponent,
    SelectComponent,
    ProgressBarComponent,
    TextSanitizerPipe,
    AddQuizComponent,
    LabelComponent,
    DividerComponent,
    SvgIconComponent,
    CollapsePanelComponent,
    CorrectnessStatusComponent,
    InfoCardComponent,
    DifficultyListComponent
  ]
})
export class SharedModule {}
