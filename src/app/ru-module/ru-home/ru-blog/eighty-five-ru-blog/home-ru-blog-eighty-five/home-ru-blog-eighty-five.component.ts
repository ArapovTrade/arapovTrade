import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-eighty-five',
  templateUrl: './home-ru-blog-eighty-five.component.html',
  styleUrl: './home-ru-blog-eighty-five.component.scss',
})
export class HomeRuBlogEightyFiveComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Фигура `Двойная вершина` и `Двойное дно`: Как торговать разворотные паттерны? - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Разбираем фигуры `Двойная вершина` и `Двойное дно` – надежные разворотные паттерны технического анализа. Узнайте, как правильно их идентифицировать, какие сигналы подтверждают смену тренда и как эффективно применять их в торговых стратегиях.',
    });
    this.meta.updateTag({ name: 'author', content: 'Игорь Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-22' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/doubletopandbottom.png',
    });
    this.meta.updateTag({
      name: 'headline',
      content:
        'Фигура `Двойная вершина` и `Двойное дно`: Как торговать разворотные паттерны?',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
