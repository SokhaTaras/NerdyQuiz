import { Subject } from 'rxjs';

export type ModalResponse<T = any> = {
  onClose: Subject<T>;
};
