import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-eu-blog-fifty-three',
  templateUrl: './home-eu-blog-fifty-three.component.html',
  styleUrl: './home-eu-blog-fifty-three.component.scss',
})
export class HomeEuBlogFiftyThreeComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Block Order in Trading - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'What is an order block in trading? We analyze the concept, identification methods, and trading strategies. A complete guide to order blocks and their use in market analysis.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-03-30' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/orderblockintrading.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
