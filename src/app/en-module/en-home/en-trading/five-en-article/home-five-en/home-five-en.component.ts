import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-five-en',
  templateUrl: './home-five-en.component.html',
  styleUrl: './home-five-en.component.scss',
})
export class HomeFiveEnComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Derivatives and Their Types');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Learn about derivatives, their main types, applications, and impact on financial markets. A complete guide for traders and investors.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-10' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/dericativessBebPack.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
