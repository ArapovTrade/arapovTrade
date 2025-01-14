import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-thirty-one',
  templateUrl: './home-ru-thirty-one.component.html',
  styleUrl: './home-ru-thirty-one.component.scss',
})
export class HomeRuThirtyOneComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Рыночный ордер - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Что такое рыночный ордер и как он работает? Узнайте, как использовать Market Order для быстрого входа и выхода из сделок, его преимущества, недостатки и примеры применения на биржах.',
    });
    this.meta.updateTag({ name: 'author', content: 'Игорь Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-14' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/marketorder.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
