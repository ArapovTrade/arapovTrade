import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-seventeen',
  templateUrl: './home-ru-seventeen.component.html',
  styleUrl: './home-ru-seventeen.component.scss',
})
export class HomeRuSeventeenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Что такое Биткоин и как он работает | Arapov.trade'
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Что такое Биткоин и как он работает? Узнайте его преимущества, риски и как использовать криптовалюту в инвестициях и трейдинге с Arapov.trade.',
    });
    
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-31' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/bitcoin.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
