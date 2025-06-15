import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-fifty-nine',
  templateUrl: './home-ru-blog-fifty-nine.component.html',
  styleUrl: './home-ru-blog-fifty-nine.component.scss',
})
export class HomeRuBlogFiftyNineComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Как торговать пробой уровня в трейдинге | ArapovTrade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Узнайте, как торговать пробой уровня: определение ключевых зон, пин-бары, объёмы. Практические советы от ArapovTrade',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-18' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/levelbreakoutstrategy.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
