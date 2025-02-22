import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-eighty-four',
  templateUrl: './home-uk-blog-eighty-four.component.html',
  styleUrl: './home-uk-blog-eighty-four.component.scss',
})
export class HomeUkBlogEightyFourComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Фігура `Поглинання` (Bullish & Bearish Engulfing): Як спіймати розворот? - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Розбираємо фігуру `Поглинання` (Bullish & Bearish Engulfing) – потужний сигнал розвороту тренду. Дізнайтеся, як правильно ідентифікувати цей патерн, які сигнали підтверджують його силу та як використовувати його у торгових стратегіях.',
    });
    this.meta.updateTag({ name: 'author', content: 'Ігор Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-22' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/engulfing.webp',
    });
    this.meta.updateTag({
      name: 'headline',
      content:
        'Фігура `Поглинання` (Bullish & Bearish Engulfing): Як спіймати розворот?',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
