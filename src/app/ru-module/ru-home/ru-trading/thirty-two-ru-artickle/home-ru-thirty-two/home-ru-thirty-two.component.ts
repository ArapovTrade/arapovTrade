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
      'Стоп-ордер в трейдинге: как использовать | Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.addTag({
      name: 'description',
      content:
        'Узнайте, что такое стоп-ордер в трейдинге: виды, плюсы, минусы и стратегии для торговли на крипто- и фондовых рынках на Arapov.trade.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-03-29' });
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
