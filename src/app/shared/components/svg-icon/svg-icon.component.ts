import { Component, Input } from '@angular/core';

import { SVG_COLOR, SVG_TYPE } from '@a-shared/enums/svg';

@Component({
  selector: 'quiz-app-svg-icon',
  templateUrl: './svg-icon.component.html'
})
export class SvgIconComponent {
  @Input() svgName: SVG_TYPE;
  @Input() iconColor = SVG_COLOR.PRIMARY;
}
