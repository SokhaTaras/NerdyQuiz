import { DropDownItem } from '../../questions/interfaces/question';

//not sure with solution (verification is needed)
export function mapArrayToDropDownItems<T>(
  array: T[],
  valueProperty: keyof T,
  textProperty: keyof T
): DropDownItem[] {
  return array.map(
    (item: T): DropDownItem => ({
      value: item[valueProperty] as string,
      text: item[textProperty] as string
    })
  );
}
