import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-en-blog-sixty-six',
  templateUrl: './home-en-blog-sixty-six.component.html',
  styleUrl: './home-en-blog-sixty-six.component.scss',
})
export class HomeEnBlogSixtySixComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'How to Analyze High Volume Accumulation Levels - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'A complete guide to analyzing high volume levels. Learn how to identify areas of significant interest, determine key support and resistance levels, and trade using volume analysis.',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-11' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/peakvolumelevels.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
