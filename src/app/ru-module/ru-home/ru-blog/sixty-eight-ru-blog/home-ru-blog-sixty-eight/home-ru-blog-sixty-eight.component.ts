import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-sixty-eight',
  templateUrl: './home-ru-blog-sixty-eight.component.html',
  styleUrl: './home-ru-blog-sixty-eight.component.scss',
})
export class HomeRuBlogSixtyEightComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Как развивается рыночный аукцион и оценка сентимента участников рынка - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Глубокий анализ рыночного аукциона и сентимента участников рынка. Как работает аукционная теория, какие индикаторы помогают выявить баланс спроса и предложения, и как трейдеры могут использовать эти знания для торговли.',
    });
    this.meta.updateTag({ name: 'author', content: 'Игорь Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-12' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/marketauctiondevelops.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
