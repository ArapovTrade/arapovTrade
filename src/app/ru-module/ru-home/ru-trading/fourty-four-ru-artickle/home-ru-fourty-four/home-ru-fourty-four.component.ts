import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-fourty-four',
  templateUrl: './home-ru-fourty-four.component.html',
  styleUrl: './home-ru-fourty-four.component.scss',
})
export class HomeRuFourtyFourComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Скрытые ордера (Iceberg Orders): Как банки маскируют свои позиции? - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Что такое скрытые ордера (Iceberg Orders)? Как банки и крупные игроки используют их для маскировки своих позиций? Узнайте, как обнаружить айсберг-ордера и как их использовать в торговле.',
    });
     
    this.meta.updateTag({ name: 'datePublished', content: '2025-03-30' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/icebergorders.png',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
