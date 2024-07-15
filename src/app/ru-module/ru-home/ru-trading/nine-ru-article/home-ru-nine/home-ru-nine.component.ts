import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-nine',
  templateUrl: './home-ru-nine.component.html',
  styleUrl: './home-ru-nine.component.scss',
})
export class HomeRuNineComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Формирование курса валют - Arapov.trade');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Формирование курса валют на рынке Форекс',
    });
  }
}
