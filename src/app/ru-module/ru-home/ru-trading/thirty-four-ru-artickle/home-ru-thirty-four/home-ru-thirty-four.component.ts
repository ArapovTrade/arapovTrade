import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-thirty-four',
  templateUrl: './home-ru-thirty-four.component.html',
  styleUrl: './home-ru-thirty-four.component.scss',
})
export class HomeRuThirtyFourComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Стоп-лимитный ордер: Полное руководство - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Что такое стоп-лимитный ордер и как его правильно использовать? Полное руководство для трейдеров по настройке и применению Stop-Limit Order в криптовалютном и фондовом рынках.',
    });
    this.meta.updateTag({ name: 'author', content: 'Игорь Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/stoplimitorder1.png',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
