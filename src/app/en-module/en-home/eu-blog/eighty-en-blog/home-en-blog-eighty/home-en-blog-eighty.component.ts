import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-en-blog-eighty',
  templateUrl: './home-en-blog-eighty.component.html',
  styleUrl: './home-en-blog-eighty.component.scss',
})
export class HomeEnBlogEightyComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Head and Shoulders Pattern - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Analyzing the `Head and Shoulders` pattern – one of the most reliable technical analysis patterns. Learn how to correctly identify this pattern, what signals confirm a trend reversal, and which strategies can help trade it effectively.',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-20' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/headandshoulders.png',
    });
    this.meta.updateTag({
      name: 'headline',
      content: 'Head and Shoulders Pattern',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
