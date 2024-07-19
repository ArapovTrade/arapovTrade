import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-thirty-seven',
  templateUrl: './home-uk-thirty-seven.component.html',
  styleUrl: './home-uk-thirty-seven.component.scss',
})
export class HomeUkThirtySevenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Розподіл торгових систем. Автоматизація - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Типи торгових систем у трейдингу',
    });
  }
}
