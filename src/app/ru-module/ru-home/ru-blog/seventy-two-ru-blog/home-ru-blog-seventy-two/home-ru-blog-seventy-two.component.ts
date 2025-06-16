import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-seventy-two',
  templateUrl: './home-ru-blog-seventy-two.component.html',
  styleUrl: './home-ru-blog-seventy-two.component.scss',
})
export class HomeRuBlogSeventyTwoComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Экономический календарь в трейдинге: как использовать | Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Узнайте, как экономический календарь помогает в трейдинге! Гид по событиям, влияющим на акции, индексы и стратегии торговли на новостях',
    });
     
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/economiccalendar.png',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
