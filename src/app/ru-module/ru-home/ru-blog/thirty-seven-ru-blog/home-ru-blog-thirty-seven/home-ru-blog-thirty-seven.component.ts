import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-thirty-seven',
  templateUrl: './home-ru-blog-thirty-seven.component.html',
  styleUrl: './home-ru-blog-thirty-seven.component.scss',
})
export class HomeRuBlogThirtySevenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Просадки в трейдинге: управление рисками | Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.addTag({
      name: 'description',
      content:
        'Узнайте, как анализировать и управлять просадками в трейдинге! Советы по минимизации рисков и сохранению прибыли на Arapov.trade.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-02' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/drawdowns.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
