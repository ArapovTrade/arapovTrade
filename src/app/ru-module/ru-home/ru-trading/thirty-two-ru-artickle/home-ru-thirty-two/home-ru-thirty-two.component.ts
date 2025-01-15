import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-thirty-two',
  templateUrl: './home-ru-thirty-two.component.html',
  styleUrl: './home-ru-thirty-two.component.scss',
})
export class HomeRuThirtyTwoComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Стоп-ордер: Полное руководство для трейдеров - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Что такое стоп-ордер и как его правильно использовать в трейдинге? Подробный разбор Stop Order, его видов, преимуществ и недостатков, а также стратегий применения на криптовалютных и фондовых биржах.',
    });
    this.meta.updateTag({ name: 'author', content: 'Игорь Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/stoporder.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
