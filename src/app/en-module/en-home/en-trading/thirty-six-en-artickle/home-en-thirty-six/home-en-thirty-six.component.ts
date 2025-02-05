import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-en-thirty-six',
  templateUrl: './home-en-thirty-six.component.html',
  styleUrl: './home-en-thirty-six.component.scss',
})
export class HomeEnThirtySixComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'How Smart Money Uses False Breakouts to Gather Liquidity? - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Let`s analyze how Smart Money manipulates the market using false breakouts to gather liquidity before moving in their desired direction. How to identify traps and avoid market manipulation?',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-05' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/falsebreakouts.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
