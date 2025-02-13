import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-sixty-nine',
  templateUrl: './home-uk-blog-sixty-nine.component.html',
  styleUrl: './home-uk-blog-sixty-nine.component.scss',
})
export class HomeUkBlogSixtyNineComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Чим відрізняється аналіз обсягів на ринку акцій і на ринку ф`ючерсів - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Повний посібник із відмінностей в аналізі обсягів на фондовому та ф`ючерсному ринках. Розглядаємо ключові особливості роботи з обсягами, методики аналізу та практичне застосування об`ємних індикаторів.',
    });
    this.meta.updateTag({ name: 'author', content: 'Ігор Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-13' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/volumeandfuturesmarket.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
