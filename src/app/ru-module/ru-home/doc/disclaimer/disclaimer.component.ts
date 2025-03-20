import { Component } from '@angular/core';
import { LangService } from '../../../../servises/lang.service';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrl: './disclaimer.component.scss',
})
export class DisclaimerComponent {
  constructor(private lang: LangService) {}

  ngOnInit(): void {
    this.lang.setNumber(2);
  }
}
