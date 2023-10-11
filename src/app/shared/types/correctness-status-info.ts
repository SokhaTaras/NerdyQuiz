import { CORRECTNESS } from '@a-shared/enums/shared-components';
import { SVG_COLOR, SVG_TYPE } from '@a-shared/enums/svg';

export type CorrectnessStatusInfo = {
  correctness?: CORRECTNESS;
  icon: SVG_TYPE;
  iconColor: SVG_COLOR;
};
