import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-en-blog-eighty-one',
  templateUrl: './home-en-blog-eighty-one.component.html',
  styleUrl: './home-en-blog-eighty-one.component.scss',
})
export class HomeEnBlogEightyOneComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Triangle Pattern - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Analyzing the `Triangle` pattern – one of the key technical analysis patterns. Learn how to correctly identify this pattern on a chart, what signals confirm a breakout, and how to use it in trading strategies.',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-20' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/trianglefigure.webp',
    });
    this.meta.updateTag({
      name: 'headline',
      content: 'Triangle Pattern',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
