import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import {
  confirmModalInterface,
  ModalDataInterface
} from '../../interfaces/modalData.interface';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private modalService: NzModalService) {}

  showCreateModal(component: any, data?: ModalDataInterface): void {
    this.modalService.create({
      nzContent: component,
      nzFooter: null,
      nzCentered: true,
      nzComponentParams: {
        inputData: data
      }
    });
  }

  showConfirmModal(component: any, data: confirmModalInterface): void {
    this.modalService.confirm({
      nzContent: component,
      nzCentered: true,
      nzFooter: null,
      nzComponentParams: {
        inputData: data
      }
    });
  }

  closeModal(): void {
    this.modalService.closeAll();
  }
}
