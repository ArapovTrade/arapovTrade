import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-eighty-four',
  templateUrl: './home-ru-blog-eighty-four.component.html',
  styleUrl: './home-ru-blog-eighty-four.component.scss',
})
export class HomeRuBlogEightyFourComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Поглощение: Bullish и Bearish | ArapovTrade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Поглощение (Bullish & Bearish): как ловить разворот? Руководство от ArapovTrade по паттерну и стратегиям',
    });
    
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-22' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/engulfing.webp',
    });
    this.meta.updateTag({
      name: 'headline',
      content:
        'Поглощение: Bullish и Bearish | ArapovTrade',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
