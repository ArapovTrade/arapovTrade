import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-eighty-one',
  templateUrl: './home-uk-blog-eighty-one.component.html',
  styleUrl: './home-uk-blog-eighty-one.component.scss',
})
export class HomeUkBlogEightyOneComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Фігура `Трикутник` - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Розбираємо фігуру `Трикутник` – один із ключових патернів технічного аналізу. Дізнайтеся, як правильно визначити цей патерн на графіку, які сигнали підтверджують пробій і як використовувати його в торгових стратегіях.',
    });
    this.meta.updateTag({ name: 'author', content: 'Ігор Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-20' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/trianglefigure.webp',
    });
    this.meta.updateTag({
      name: 'headline',
      content: 'Фігура `Трикутник`',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
