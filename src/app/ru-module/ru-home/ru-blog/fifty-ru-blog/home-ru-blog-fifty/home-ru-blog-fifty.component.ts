import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-fifty',
  templateUrl: './home-ru-blog-fifty.component.html',
  styleUrl: './home-ru-blog-fifty.component.scss',
})
export class HomeRuBlogFiftyComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Алгоримические Ордера на Бирже - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Что такое алгоритмические ордера? Изучите их типы, преимущества, риски и будущее использования в трейдинге. Полное руководство для трейдеров.',
    });
     
    this.meta.updateTag({ name: 'datePublished', content: '2025-03-26' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/algorithmicorders.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
