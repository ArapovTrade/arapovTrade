import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-thirty',
  templateUrl: './home-ru-thirty.component.html',
  styleUrl: './home-ru-thirty.component.scss',
})
export class HomeRuThirtyComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Виды и типы ордеров - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Виды и типы ордеров на бирже',
    });
  }
}
