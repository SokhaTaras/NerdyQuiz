import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ModalInputDataInterface } from '../../interfaces/modalInputData.interface';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private modalService: NzModalService) {}

  showModal(component: any, data?: ModalInputDataInterface): void {
    this.modalService.create({
      nzContent: component,
      nzFooter: null,
      nzCentered: true,
      nzComponentParams: {
        inputData: data
      }
    });
  }

  closeModal(): void {
    this.modalService.closeAll();
  }
}
