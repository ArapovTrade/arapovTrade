import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-sixteen',
  templateUrl: './home-ru-blog-sixteen.component.html',
  styleUrl: './home-ru-blog-sixteen.component.scss',
})
export class HomeRuBlogSixteenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Трендовые каналы в трейдинге: как использовать | Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Узнайте, как использовать трендовые каналы в трейдинге! Полное руководство по их построению, стратегиям торговли и советам для успеха с Arapov.trade',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/trandingchannels.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
