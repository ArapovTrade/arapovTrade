import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-ten',
  templateUrl: './home-ru-ten.component.html',
  styleUrl: './home-ru-ten.component.scss',
})
export class HomeRuTenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Позиции в трейдинге: виды и перенос | Arapov.trade'
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.addTag({
      name: 'description',
      content:
        'Что такое позиции в трейдинге? Узнайте виды позиций, как происходит перенос и что значит дата валютирования. Полезно трейдерам и инвесторам.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-04-13' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/currencyPosition.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
