import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-fourty-nine',
  templateUrl: './home-ru-blog-fourty-nine.component.html',
  styleUrl: './home-ru-blog-fourty-nine.component.scss',
})
export class HomeRuBlogFourtyNineComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Как выбрать торговую платформу для трейдинга?');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Как выбрать торговую платформу для трейдинга? Советы, критерии выбора и лучшие платформы для начинающих и опытных трейдеров от ArapovTrade.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-03' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/choosingtradingplatform.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
