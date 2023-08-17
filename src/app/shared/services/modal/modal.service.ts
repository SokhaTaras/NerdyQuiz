import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private modalService: NzModalService) {}

  showModal(component: any): void {
    this.modalService.create({
      nzContent: component,
      nzFooter: null,
      nzCentered: true
    });
  }

  closeModal(): void {
    this.modalService.closeAll();
  }
}
