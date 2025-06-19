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
    this.titleService.setTitle('Подвійна вершина і дно: розворотні патерни');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтеся, як працюють фігури “Подвійна вершина” і “Подвійне дно” у теханалізі. Сигнали розвороту, входи та виходи з позицій.',
    });

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
