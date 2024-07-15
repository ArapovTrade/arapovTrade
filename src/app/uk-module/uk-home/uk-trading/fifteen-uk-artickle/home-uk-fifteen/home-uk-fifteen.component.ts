import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-fifteen',
  templateUrl: './home-uk-fifteen.component.html',
  styleUrl: './home-uk-fifteen.component.scss',
})
export class HomeUkFifteenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Основні центральні банки - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Основні центральні банки ринку Форекс',
    });
  }
}
