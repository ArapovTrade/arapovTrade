import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-thirty',
  templateUrl: './home-ru-blog-thirty.component.html',
  styleUrl: './home-ru-blog-thirty.component.scss',
})
export class HomeRuBlogThirtyComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Основы Криптовалют для Начинающих Трейдеров - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Основы Криптовалют для Начинающих Трейдеров',
    });
  }
}
