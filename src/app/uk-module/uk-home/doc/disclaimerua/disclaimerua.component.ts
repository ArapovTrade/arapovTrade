import { Component } from '@angular/core';
import { LangService } from '../../../../servises/lang.service';

@Component({
  selector: 'app-disclaimerua',
  templateUrl: './disclaimerua.component.html',
  styleUrl: './disclaimerua.component.scss',
})
export class DisclaimeruaComponent {
  constructor(private lang: LangService) {}

  ngOnInit(): void {
    this.lang.setNumber(1);
  }
}
