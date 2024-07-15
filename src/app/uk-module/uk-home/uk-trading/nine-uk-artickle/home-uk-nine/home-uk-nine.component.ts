import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-nine',
  templateUrl: './home-uk-nine.component.html',
  styleUrl: './home-uk-nine.component.scss',
})
export class HomeUkNineComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Формування курсу валют - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Формування курсу валют на ринку Форекс',
    });
  }
}
