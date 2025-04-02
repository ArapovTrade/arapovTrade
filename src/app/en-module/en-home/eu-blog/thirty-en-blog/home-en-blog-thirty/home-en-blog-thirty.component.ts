import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-en-blog-thirty',
  templateUrl: './home-en-blog-thirty.component.html',
  styleUrl: './home-en-blog-thirty.component.scss',
})
export class HomeEnBlogThirtyComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Cryptocurrency Basics for Beginner Traders');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Learn the basics of cryptocurrencies, their features, and key trading principles for beginner traders.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-02' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cryptocurrencybasics.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
