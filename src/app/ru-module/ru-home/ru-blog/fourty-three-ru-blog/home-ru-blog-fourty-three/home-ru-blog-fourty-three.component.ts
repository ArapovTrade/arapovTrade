import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-fourty-three',
  templateUrl: './home-ru-blog-fourty-three.component.html',
  styleUrl: './home-ru-blog-fourty-three.component.scss',
})
export class HomeRuBlogFourtyThreeComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Спрос и предложение в криптовалютах | ArapovTrade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Анализ спроса и предложения в криптовалютах: как торговать? Гид от ArapovTrade по стратегиям и инвестициям.',
    });
   
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-25' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cryptomarketanalysis.png',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
