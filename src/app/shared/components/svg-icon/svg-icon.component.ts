import { Component, Input } from '@angular/core';
import { SVG_TYPE } from '@a-shared/enums/shared-components';

@Component({
  selector: 'quiz-app-svg-icon',
  templateUrl: './svg-icon.component.html'
})
export class SvgIconComponent {
  @Input() svgPath: SVG_TYPE;
}
