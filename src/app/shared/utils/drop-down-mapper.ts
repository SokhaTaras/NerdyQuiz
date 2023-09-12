import { DropDownItem } from '../../questions/interfaces/question';

export function mapArrayToDropDownItems<T extends DropDownItem>(
  array: T[]
): DropDownItem[] {
  return array.map((item: T) => ({
    value: item.value,
    text: item.text
  }));
}

export function mapArrayToDropDownItems2<T>(
  array: T[],
  valueProperty: keyof T,
  textProperty: keyof T
): DropDownItem[] {
  return array.map((item: T) => ({
    value: String(item[valueProperty]),
    text: String(item[textProperty])
  }));
}
