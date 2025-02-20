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
    this.titleService.setTitle('Фигура `Треугольник` - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Разбираем фигуру `Треугольник` – один из ключевых паттернов технического анализа. Узнайте, как правильно определить этот паттерн на графике, какие сигналы подтверждают пробой и как использовать его в торговых стратегиях.',
    });
    this.meta.updateTag({ name: 'author', content: 'Игорь Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-20' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/trianglefigure.webp',
    });
    this.meta.updateTag({
      name: 'headline',
      content: 'Фигура `Треугольник`',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
