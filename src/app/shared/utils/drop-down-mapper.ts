import { DropDownItem } from '../../questions/interfaces/question';

export function mapArrayToDropDownItems<T>(
  array: T[],
  valueProperty: keyof T,
  textProperty: keyof T
): DropDownItem[] {
  return array.map(
    (item: T): DropDownItem => ({
      value: (item[valueProperty] as string) || '',
      text: (item[textProperty] as string) || ''
    })
  );
}
