import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-seven',
  templateUrl: './home-ru-seven.component.html',
  styleUrl: './home-ru-seven.component.scss',
})
export class HomeRuSevenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Что такое рынок FOREX: основы и стратегии | Arapov.trade');

this.meta.updateTag({ name: 'robots', content: 'index, follow' });

this.meta.addTag({
  name: 'description',
  content:
    'Узнайте, как работает рынок FOREX: особенности, участники, торговые сессии и стратегии. Полное руководство для трейдера от Arapov.trade.',
});

    this.meta.updateTag({ name: 'datePublished', content: '2025-04-11' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/ForexMarket.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
