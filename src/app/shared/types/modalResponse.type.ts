import { Subject } from 'rxjs';

export type ModalResponseType<T = any> = {
  onClose: Subject<T>;
};
