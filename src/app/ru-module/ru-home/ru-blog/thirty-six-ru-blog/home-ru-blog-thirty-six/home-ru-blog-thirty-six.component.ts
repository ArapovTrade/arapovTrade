import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-thirty-six',
  templateUrl: './home-ru-blog-thirty-six.component.html',
  styleUrl: './home-ru-blog-thirty-six.component.scss',
})
export class HomeRuBlogThirtySixComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Обучение Трейдингу Криптовалют - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Обучение Трейдингу | Обучение Трейдингу Криптовалют',
    });
  }
}
