import { Injectable, SkipSelf } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Injectable()
export class ModalRefFacadeService<T = any> {
  constructor(@SkipSelf() private ref: NzModalRef) {}

  close(data?: T) {
    this.ref.close(data);
  }
}
