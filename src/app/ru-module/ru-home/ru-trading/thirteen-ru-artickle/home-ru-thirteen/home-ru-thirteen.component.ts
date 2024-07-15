import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-thirteen',
  templateUrl: './home-ru-thirteen.component.html',
  styleUrl: './home-ru-thirteen.component.scss',
})
export class HomeRuThirteenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Риск изменения курса на рынке Форекс  - Arapov.trade'
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Риск изменения валютного курса на рынке Форекс',
    });
  }
}
