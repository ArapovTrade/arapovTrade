import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-eighty-three',
  templateUrl: './home-ru-blog-eighty-three.component.html',
  styleUrl: './home-ru-blog-eighty-three.component.scss',
})
export class HomeRuBlogEightyThreeComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Фигура `Чашка с ручкой`: Как торговать сильные пробои? - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Разбираем фигуру `Чашка с ручкой` – один из самых надежных паттернов продолжения тренда. Узнайте, как правильно идентифицировать этот паттерн, какие сигналы подтверждают пробой и как применять его в торговых стратегиях.',
    });
    this.meta.updateTag({ name: 'author', content: 'Игорь Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-21' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cupandhandle.png',
    });
    this.meta.updateTag({
      name: 'headline',
      content: 'Фигура `Чашка с ручкой`: Как торговать сильные пробои?',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
