import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-thirty-seven',
  templateUrl: './home-ru-thirty-seven.component.html',
  styleUrl: './home-ru-thirty-seven.component.scss',
})
export class HomeRuThirtySevenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Разделение торговых систем. Автоматизация - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Типы торговых систем в трейдинге ',
    });
  }
}
