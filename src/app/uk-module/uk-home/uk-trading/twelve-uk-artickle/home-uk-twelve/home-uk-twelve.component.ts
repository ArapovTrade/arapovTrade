import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-twelve',
  templateUrl: './home-uk-twelve.component.html',
  styleUrl: './home-uk-twelve.component.scss',
})
export class HomeUkTwelveComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Основні таймфрейми у трейдингу - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Як заробити на ринку Форекс?',
    });
  }
}
