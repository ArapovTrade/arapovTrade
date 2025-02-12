import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-en-blog-sixty-seven',
  templateUrl: './home-en-blog-sixty-seven.component.html',
  styleUrl: './home-en-blog-sixty-seven.component.scss',
})
export class HomeEnBlogSixtySevenComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Why It Is Important to Analyze Volumes Within Current Market Trends - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'We explore why volume analysis is a key tool in determining trend strength, reversal points, and confirming market movements. Learn how volume analysis helps avoid false signals and trade with high accuracy.',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-12' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/trendvolumeanalysis.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
