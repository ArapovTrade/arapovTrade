import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-en-thirty-nine',
  templateUrl: './home-en-thirty-nine.component.html',
  styleUrl: './home-en-thirty-nine.component.scss',
})
export class HomeEnThirtyNineComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Profit and Loss Ratio in Trading - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'How to correctly calculate the profit and loss ratio in trading? Learn about R/R Ratio, risk management, and strategies to improve trading efficiency.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-08' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/profitandlossratio.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
