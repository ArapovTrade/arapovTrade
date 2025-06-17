import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-eleven',
  templateUrl: './home-ru-eleven.component.html',
  styleUrl: './home-ru-eleven.component.scss',
})
export class HomeRuElevenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Как начать торговать на криптобирже | Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.addTag({
      name: 'description',
      content:
        'Узнайте, как начать торговать на криптобирже! Выбор платформы, регистрация, стратегии и советы по управлению рисками на Arapov.trade.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-29' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cryptostart.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
