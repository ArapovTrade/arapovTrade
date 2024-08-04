import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-thirty',
  templateUrl: './home-uk-blog-thirty.component.html',
  styleUrl: './home-uk-blog-thirty.component.scss',
})
export class HomeUkBlogThirtyComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Основи Криптовалют для Трейдерів Початківців - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Основи Криптовалют для Трейдерів Початківців',
    });
  }
}
