import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-fourty',
  templateUrl: './home-ru-fourty.component.html',
  styleUrl: './home-ru-fourty.component.scss',
})
export class HomeRuFourtyComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Ошибки начинающих трейдеров - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Основные ошибки начинающих трейдеров ',
    });
  }
}
