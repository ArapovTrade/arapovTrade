import { Component } from '@angular/core';
import { LangService } from '../../../../servises/lang.service';

@Component({
  selector: 'app-disclaimeren',
  templateUrl: './disclaimeren.component.html',
  styleUrl: './disclaimeren.component.scss',
})
export class DisclaimerenComponent {
  constructor(private lang: LangService) {}

  ngOnInit(): void {
    this.lang.setNumber(3);
  }
}
