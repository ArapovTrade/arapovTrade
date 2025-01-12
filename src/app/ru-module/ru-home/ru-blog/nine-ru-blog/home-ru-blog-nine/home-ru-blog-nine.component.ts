import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-nine',
  templateUrl: './home-ru-blog-nine.component.html',
  styleUrl: './home-ru-blog-nine.component.scss',
})
export class HomeRuBlogNineComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Как прогнозировать цену на рынке? - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Прогнозирование цены в трейдинге: фундаментальный и технический анализ, индикаторы, математические модели и рыночная психология. Полное руководство по предсказанию движения рынка.',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
