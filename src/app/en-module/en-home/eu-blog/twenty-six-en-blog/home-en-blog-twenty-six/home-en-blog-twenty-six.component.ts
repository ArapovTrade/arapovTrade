import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-en-blog-twenty-six',
  templateUrl: './home-en-blog-twenty-six.component.html',
  styleUrl: './home-en-blog-twenty-six.component.scss',
})
export class HomeEnBlogTwentySixComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Types of orders on the exchange - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'What are the different types of orders on the exchange? How to choose the right type of order for trading? A complete guide to market, limit, stop orders, and advanced orders. Features of using different orders in trading.',
    });
    this.meta.updateTag({ name: 'author', content: 'Ihor Arapov' });
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
