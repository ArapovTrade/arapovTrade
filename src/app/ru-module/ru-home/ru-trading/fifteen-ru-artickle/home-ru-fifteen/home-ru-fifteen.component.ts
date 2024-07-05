import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-fifteen',
  templateUrl: './home-ru-fifteen.component.html',
  styleUrl: './home-ru-fifteen.component.scss',
})
export class HomeRuFifteenComponent implements OnInit {
  constructor(private meta: Meta) {}
  ngOnInit(): void {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Основные центральные банки рынка Форекс',
    });
  }
}
