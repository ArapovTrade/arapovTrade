import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-eighty-one',
  templateUrl: './home-ru-blog-eighty-one.component.html',
  styleUrl: './home-ru-blog-eighty-one.component.scss',
})
export class HomeRuBlogEightyOneComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Треугольник: паттерн трейдинга | ArapovTrade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Фигура Треугольник: как торговать паттерн? Руководство от ArapovTrade по анализу, пробою и стратегиям',
    });
     
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-20' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/trianglefigure.webp',
    });
    this.meta.updateTag({
      name: 'headline',
      content: 'Треугольник: паттерн трейдинга | ArapovTrade`',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
