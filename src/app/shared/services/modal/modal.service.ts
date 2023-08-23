import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private modalService: NzModalService) {}

  showModal(component: any, data?: any): void {
    this.modalService.create({
      nzContent: component,
      nzFooter: null,
      nzCentered: true,
      nzComponentParams: {
        ...data
      }
    });
  }

  showConfirmModal(data: any): void {
    this.modalService.confirm({
      nzContent: ConfirmModalComponent,
      nzCentered: true,
      nzFooter: null,
      nzComponentParams: {
        ...data
      }
    });
  }

  closeModal(): void {
    this.modalService.closeAll();
  }
}
