import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-thirty-six',
  templateUrl: './home-ru-thirty-six.component.html',
  styleUrl: './home-ru-thirty-six.component.scss',
})
export class HomeRuThirtySixComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Разделение торговых систем. Длительность сделки - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Виды торговых систем в трейдинге. По таймингу сделок',
    });
  }
}
