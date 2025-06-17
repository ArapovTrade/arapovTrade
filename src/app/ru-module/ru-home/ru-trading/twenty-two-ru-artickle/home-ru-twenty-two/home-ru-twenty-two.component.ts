import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-twenty-two',
  templateUrl: './home-ru-twenty-two.component.html',
  styleUrl: './home-ru-twenty-two.component.scss',
})
export class HomeRuTwentyTwoComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Экономические факторы в трейдинге | Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.addTag({
      name: 'description',
      content:
        'Узнайте, как экономические факторы влияют на валютные курсы! Ключевые аспекты и их роль в анализе трейдинга на Arapov.trade.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-20' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/economicfactors.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
