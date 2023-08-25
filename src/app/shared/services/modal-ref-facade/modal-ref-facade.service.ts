import { Injectable, SkipSelf } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Injectable()
export class ModalRefFacadeService {
  constructor(@SkipSelf() private ref: NzModalRef) {}

  close(isConfirm: boolean) {
    this.ref.close(isConfirm);
  }
}
