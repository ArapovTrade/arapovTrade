import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-en-thirty-two',
  templateUrl: './home-en-thirty-two.component.html',
  styleUrl: './home-en-thirty-two.component.scss',
})
export class HomeEnThirtyTwoComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Stop Order: A Complete Guide for Traders - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'What is a stop order and how to use it correctly in trading? A detailed breakdown of the Stop Order, its types, advantages and disadvantages, as well as strategies for applying it on cryptocurrency and stock exchanges.',
    });
    
    this.meta.updateTag({ name: 'datePublished', content: '2025-03-29' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/stoporder.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
