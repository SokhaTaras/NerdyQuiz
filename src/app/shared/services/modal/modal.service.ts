import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';
import { ModalResponseType } from '../../types/modalResponse.type';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private modalService: NzModalService) {}

  showModal(component: any, data?: any): ModalResponseType {
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

  showConfirmModal(data: any): ModalResponseType {
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
