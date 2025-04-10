import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-four-en',
  templateUrl: './home-four-en.component.html',
  styleUrl: './home-four-en.component.scss',
})
export class HomeFourEnComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Exchange and Over-the-Counter Markets');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Learn about the differences between exchange and over-the-counter markets, their features, advantages, and disadvantages. A comprehensive guide for traders and investors.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-10' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/exchangemarkets.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
