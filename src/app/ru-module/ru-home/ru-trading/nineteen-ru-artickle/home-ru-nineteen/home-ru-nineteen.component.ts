import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-nineteen',
  templateUrl: './home-ru-nineteen.component.html',
  styleUrl: './home-ru-nineteen.component.scss',
})
export class HomeRuNineteenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Как торговать на валютном рынке FOREX через интернет - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Как правильно торговать на Форекс?',
    });
  }
}
