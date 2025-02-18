import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-en-blog-seventy-seven',
  templateUrl: './home-en-blog-seventy-seven.component.html',
  styleUrl: './home-en-blog-seventy-seven.component.scss',
})
export class HomeEnBlogSeventySevenComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Trading Psychology: How Emotions Affect Your Trades? - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Analyzing how emotions impact trading, why fear and greed prevent profits, and which psychological techniques help control emotions and improve trading efficiency.',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-18' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/emotionsaffect.webp',
    });
    this.meta.updateTag({
      name: 'headline',
      content: 'Trading Psychology: How Emotions Affect Your Trades?',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
