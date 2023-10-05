import { LABELS } from '@a-shared/enums/shared-components';

export class LabelItem {
  constructor(
    public text: string,
    public type: LABELS,
    public isChecked: boolean
  ) {
    this.text = text;
    this.type = type;
    this.isChecked = isChecked;
  }
}
