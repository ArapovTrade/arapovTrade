import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-en-twenty-nine',
  templateUrl: './home-en-twenty-nine.component.html',
  styleUrl: './home-en-twenty-nine.component.scss',
})
export class HomeEnTwentyNineComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Why Do 90% of Traders Lose Money? Traps Created by Smart Money - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Find out why 90% of traders lose money and what traps are set by Smart Money. We analyze the main mistakes, manipulations, and ways to avoid financial losses in the market.',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-04' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/smartmoneytraps.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
