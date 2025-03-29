import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-en-thirty-one',
  templateUrl: './home-en-thirty-one.component.html',
  styleUrl: './home-en-thirty-one.component.scss',
})
export class HomeEnThirtyOneComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Market Order - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'What is a market order and how does it work? Learn how to use Market Order for quick trade entry and exit, its advantages, disadvantages, and examples of application on exchanges.',
    });
     
    this.meta.updateTag({ name: 'datePublished', content: '2025-03-29' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/marketorder.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
