import { LABELS } from '@a-shared/enums/shared-components';

export class LabelItem {
  constructor(
    public value: string,
    public text: string,
    public type: LABELS
  ) {
    this.value = value;
    this.text = text;
    this.type = type;
  }
}
