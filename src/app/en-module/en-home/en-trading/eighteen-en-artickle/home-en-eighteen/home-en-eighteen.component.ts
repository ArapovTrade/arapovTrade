import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-en-eighteen',
  templateUrl: './home-en-eighteen.component.html',
  styleUrl: './home-en-eighteen.component.scss',
})
export class HomeEnEighteenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Psychological Risks in FOREX');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Learn about the psychological risks associated with FOREX trading and how to minimize them. A comprehensive guide for traders with examples and tips.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-09' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/psychorisks.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
