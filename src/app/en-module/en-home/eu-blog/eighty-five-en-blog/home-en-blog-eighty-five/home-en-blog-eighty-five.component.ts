import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-en-blog-eighty-five',
  templateUrl: './home-en-blog-eighty-five.component.html',
  styleUrl: './home-en-blog-eighty-five.component.scss',
})
export class HomeEnBlogEightyFiveComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Double Top and Double Bottom: How to Trade Reversal Patterns? - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Analyzing `Double Top` and `Double Bottom` patterns – reliable reversal patterns in technical analysis. Learn how to correctly identify them, what signals confirm trend changes, and how to effectively apply them in trading strategies.',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-22' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/doubletopandbottom.png',
    });
    this.meta.updateTag({
      name: 'headline',
      content: 'Double Top and Double Bottom: How to Trade Reversal Patterns?',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
