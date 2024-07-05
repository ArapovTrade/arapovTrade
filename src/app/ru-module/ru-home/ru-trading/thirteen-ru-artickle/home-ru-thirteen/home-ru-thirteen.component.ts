import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-thirteen',
  templateUrl: './home-ru-thirteen.component.html',
  styleUrl: './home-ru-thirteen.component.scss',
})
export class HomeRuThirteenComponent implements OnInit {
  constructor(private meta: Meta) {}
  ngOnInit(): void {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Риск изменения валютного курса на рынке Форекс',
    });
  }
}
