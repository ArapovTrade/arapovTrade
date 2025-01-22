import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-en-blog-twenty-eight',
  templateUrl: './home-en-blog-twenty-eight.component.html',
  styleUrl: './home-en-blog-twenty-eight.component.scss',
})
export class HomeEnBlogTwentyEightComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'What are Alternative Blockchains? - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Discover what alternative blockchains are, how they work, their benefits, and how they differ from Bitcoin and Ethereum. A comprehensive guide to next-generation blockchains.',
    });
    this.meta.updateTag({ name: 'author', content: 'Ihor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-22' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/altblockchains.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
