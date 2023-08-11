import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { InitQuizModalComponent } from '../components/init-quiz-modal/init-quiz-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private modalService: NzModalService) {}
  showModal(): void {
    this.modalService.create({
      nzContent: InitQuizModalComponent,
      nzFooter: null,
    });
  }
}
