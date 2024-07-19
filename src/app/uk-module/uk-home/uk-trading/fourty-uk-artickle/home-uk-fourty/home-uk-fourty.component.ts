import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-fourty',
  templateUrl: './home-uk-fourty.component.html',
  styleUrl: './home-uk-fourty.component.scss',
})
export class HomeUkFourtyComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Помилки трейдерів початківців - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Основні помилки трейдерів-початківців',
    });
  }
}
