import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('10 порад початківцям трейдерам');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Корисні поради для початківців трейдерів. Дізнайтеся, як керувати ризиками, розробляти стратегію та уникати помилок у трейдингу.',
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
