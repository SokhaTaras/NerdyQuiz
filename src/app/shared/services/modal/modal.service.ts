import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

import { ModalResponse } from '@a-shared/types/modalResponse';
import { ConfirmModalComponent } from '@a-shared/components/confirm-modal/confirm-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private modalService: NzModalService) {}

  showModal(component: any, data?: any): ModalResponse {
    const modalRef = this.modalService.create({
      nzContent: component,
      nzFooter: null,
      nzCentered: true,
      nzComponentParams: {
        ...data
      }
    });

    return { onClose: modalRef.afterClose };
  }

  showConfirmModal(data: any): ModalResponse {
    const modalRef = this.modalService.confirm({
      nzContent: ConfirmModalComponent,
      nzCentered: true,
      nzFooter: null,
      nzComponentParams: {
        ...data
      }
    });

    return { onClose: modalRef.afterClose };
  }
}
