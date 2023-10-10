export class InfoCardItem {
  constructor(
    public label: string,
    public subLabel: string,
    public value?: string
  ) {
    this.label = label;
    this.subLabel = subLabel;
    this.value = value;
  }
}
