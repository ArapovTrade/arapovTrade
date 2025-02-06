import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-en-fourty-three',
  templateUrl: './home-en-fourty-three.component.html',
  styleUrl: './home-en-fourty-three.component.scss',
})
export class HomeEnFourtyThreeComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Liquidity Pools: How Big Players Find Liquidity in the Market? - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Liquidity pools play a key role in trading. Learn how Smart Money finds liquidity, creates market manipulations, and uses hidden liquidity zones.',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-06' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/liquiditypools.png',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
