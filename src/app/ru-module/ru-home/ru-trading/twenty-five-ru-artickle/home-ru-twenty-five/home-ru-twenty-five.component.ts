import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-twenty-five',
  templateUrl: './home-ru-twenty-five.component.html',
  styleUrl: './home-ru-twenty-five.component.scss',
})
export class HomeRuTwentyFiveComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Экономические показатели роста: что влияет на рынки | Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Узнайте, какие экономические показатели важны для роста: ВВП, инфляция, безработица и их влияние на финансовые рынки.',
    });
  
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-17' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/keyeconomicgrowth.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
