import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-twenty-six',
  templateUrl: './home-ru-blog-twenty-six.component.html',
  styleUrl: './home-ru-blog-twenty-six.component.scss',
})
export class HomeRuBlogTwentySixComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Виды ордеров на бирже: полный обзор | Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Виды ордеров на бирже: рыночные, лимитные, стоп-ордера и сложные ордера. Узнайте, как выбирать и применять каждый тип для эффективного трейдинга.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-14' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/ordertypes.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
