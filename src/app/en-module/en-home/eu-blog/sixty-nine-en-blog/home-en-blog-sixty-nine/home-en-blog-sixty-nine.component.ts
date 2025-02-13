import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-en-blog-sixty-nine',
  templateUrl: './home-en-blog-sixty-nine.component.html',
  styleUrl: './home-en-blog-sixty-nine.component.scss',
})
export class HomeEnBlogSixtyNineComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'How Volume Analysis Differs in the Stock Market and Futures Market'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'A complete guide to the differences in volume analysis between the stock and futures markets. Exploring key aspects of working with volumes, analysis methods, and practical application of volume indicators.',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
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
