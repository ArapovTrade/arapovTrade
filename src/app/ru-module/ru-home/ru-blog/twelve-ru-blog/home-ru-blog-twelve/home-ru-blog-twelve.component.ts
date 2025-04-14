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
    this.titleService.setTitle('Торговля уровнями: Полное руководство');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Детальное руководство по торговле уровнями для начинающих трейдеров. Как определять, использовать и торговать ключевые уровни.',
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
