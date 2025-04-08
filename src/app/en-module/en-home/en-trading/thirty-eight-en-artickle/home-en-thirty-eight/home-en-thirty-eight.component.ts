import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-en-thirty-eight',
  templateUrl: './home-en-thirty-eight.component.html',
  styleUrl: './home-en-thirty-eight.component.scss',
})
export class HomeEnThirtyEightComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Specifics of Capital Management in Trading - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'A complete guide to capital management in trading. Risk management, money management, loss control, and effective deposit management strategies.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-08' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/capitalmanagement.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
