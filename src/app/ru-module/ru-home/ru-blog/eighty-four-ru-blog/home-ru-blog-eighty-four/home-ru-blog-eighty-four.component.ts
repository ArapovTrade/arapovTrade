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
      'Фигура `Поглощение` (Bullish & Bearish Engulfing): Как ловить разворот? - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Разбираем фигуру `Поглощение` (Bullish & Bearish Engulfing) – мощный сигнал разворота тренда. Узнайте, как правильно идентифицировать этот паттерн, какие сигналы подтверждают его силу и как использовать его в торговых стратегиях.',
    });
    this.meta.updateTag({ name: 'author', content: 'Игорь Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-22' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/engulfing.webp',
    });
    this.meta.updateTag({
      name: 'headline',
      content:
        'Фигура `Поглощение` (Bullish & Bearish Engulfing): Как ловить разворот?',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
