import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-en-twelve',
  templateUrl: './home-en-twelve.component.html',
  styleUrl: './home-en-twelve.component.scss',
})
export class HomeEnTwelveComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'What is Bitcoin Halving and How Does It Affect the Crypto Market? - Arapov.trade'
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Bitcoin halving is one of the key mechanisms affecting the price and supply of cryptocurrency. Learn what halving is, how it works, and its impact on the market.',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/halving.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
