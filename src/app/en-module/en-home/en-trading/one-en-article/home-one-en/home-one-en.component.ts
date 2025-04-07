import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-one-en',
  templateUrl: './home-one-en.component.html',
  styleUrl: './home-one-en.component.scss',
})
export class HomeOneEnComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('10 Tips for Beginner Traders');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Useful tips for beginner traders. Learn how to manage risks, develop strategies, and avoid mistakes in trading.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-07' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/traderStarterw.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
