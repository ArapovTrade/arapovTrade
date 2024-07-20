import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-twenty-one',
  templateUrl: './home-ru-twenty-one.component.html',
  styleUrl: './home-ru-twenty-one.component.scss',
})
export class HomeRuTwentyOneComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Анализ рынка FOREX - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Анализ рынка Форекс',
    });
  }
}
