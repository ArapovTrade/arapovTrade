import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-en-fourty-six',
  templateUrl: './home-en-fourty-six.component.html',
  styleUrl: './home-en-fourty-six.component.scss',
})
export class HomeEnFourtySixComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Tether Cryptocurrency (USDT): What It Is and How to Use It - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Learn everything about Tether (USDT): what it is, how it works, and why it is essential for the crypto market. Features, advantages, and risks.',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-28' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cryptotether.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
