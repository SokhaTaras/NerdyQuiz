import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Question } from '../../../questions/interfaces/question';
import { BUTTON_TYPE } from '../../../shared/enums/buttonType';
import { ModalQuizService } from '../../services/modal-quiz/modal-quiz.service';

@Component({
  selector: 'quiz-app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  @Input() questions: Question[];
  @Output() whenCancel: EventEmitter<void> = new EventEmitter();

  readonly BUTTON_TYPE = BUTTON_TYPE;

  constructor(private modalQuizService: ModalQuizService) {}

  ngOnInit(): void {}

  cancelQuizConfirm(): void {
    const data: any = {
      text: 'CONFIRM_MODAL_TEXT.CANCEL_QUIZ',
      buttonText: 'BUTTON.CANCEL'
    };

    this.modalQuizService
      .confirmDeletionModal(data)
      .onClose.subscribe((isConfirm) => {
        if (isConfirm) {
          this.whenCancel.emit();
        }
      });
  }
}
