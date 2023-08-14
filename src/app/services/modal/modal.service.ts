import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private modalService: NzModalService) {}

  // Todo move nzBodyStyle to variable
  showModal(component: any): void {
    this.modalService.create({
      nzContent: component,
      nzFooter: null,
      nzCentered: true,
      nzBodyStyle: {
        'background-image': 'linear-gradient(to bottom, #c7c7ff, #b3b3ff)',
      },
    });
  }
  closeModal(): void {
    this.modalService.closeAll();
  }
}
