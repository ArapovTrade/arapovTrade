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
      'Стоп-лимитный ордер: как использовать | Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.addTag({
      name: 'description',
      content:
        'Узнайте, что такое стоп-лимитный ордер! Руководство по настройке и применению Stop-Limit в трейдинге на Arapov.trade.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-03-29' });
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
