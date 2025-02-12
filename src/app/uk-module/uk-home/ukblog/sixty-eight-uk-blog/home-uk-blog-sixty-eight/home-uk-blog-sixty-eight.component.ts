import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-sixty-eight',
  templateUrl: './home-uk-blog-sixty-eight.component.html',
  styleUrl: './home-uk-blog-sixty-eight.component.scss',
})
export class HomeUkBlogSixtyEightComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Як розвивається ринковий аукціон і оцінка сентименту учасників ринку - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Глибокий аналіз ринкового аукціону та сентименту учасників ринку. Як працює аукціонна теорія, які індикатори допомагають виявити баланс попиту та пропозиції, і як трейдери можуть використовувати ці знання для торгівлі.',
    });
    this.meta.updateTag({ name: 'author', content: 'Ігор Арапов' });
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
