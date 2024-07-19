import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-nineteen',
  templateUrl: './home-uk-nineteen.component.html',
  styleUrl: './home-uk-nineteen.component.scss',
})
export class HomeUkNineteenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Як торгувати на валютному ринку FOREX через інтернет - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Як правильно торгувати на Форекс?',
    });
  }
}
