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
      'Аналіз обсягів: акції vs фʼючерси | Arapov.trade'
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.addTag({
      name: 'description',
      content:
        'У чому різниця між аналізом обсягів на ринку акцій і фʼючерсів? Ключові особливості, підходи та індикатори для трейдингу.',
    });

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
