import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-en-blog-seventy-one',
  templateUrl: './home-en-blog-seventy-one.component.html',
  styleUrl: './home-en-blog-seventy-one.component.scss',
})
export class HomeEnBlogSeventyOneComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('How a Trader Can Trade on News - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'A complete guide to trading on news. We analyze how economic events affect the market, which news trading strategies are the most effective, and how to minimize risks during high volatility.',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-14' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/newstrading.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
