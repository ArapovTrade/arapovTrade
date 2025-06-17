import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-twelve',
  templateUrl: './home-ru-blog-twelve.component.html',
  styleUrl: './home-ru-blog-twelve.component.scss',
})
export class HomeRuBlogTwelveComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Торговля уровнями в трейдинге | Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.addTag({
      name: 'description',
      content:
        'Узнайте, как торговать уровнями в трейдинге! Полное руководство по определению и использованию ключевых уровней на Arapov.trade.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-14' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/tradingoflevels.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
