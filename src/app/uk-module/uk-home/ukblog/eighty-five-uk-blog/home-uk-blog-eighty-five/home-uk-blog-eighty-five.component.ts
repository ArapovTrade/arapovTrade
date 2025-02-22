import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-eighty-five',
  templateUrl: './home-uk-blog-eighty-five.component.html',
  styleUrl: './home-uk-blog-eighty-five.component.scss',
})
export class HomeUkBlogEightyFiveComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Фігура `Подвійна вершина` і `Подвійне дно`: Як торгувати розворотні патерни? - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Розбираємо фігури `Подвійна вершина` і `Подвійне дно` – надійні розворотні патерни технічного аналізу. Дізнайтеся, як правильно їх ідентифікувати, які сигнали підтверджують зміну тренду та як ефективно застосовувати їх у торгових стратегіях.',
    });
    this.meta.updateTag({ name: 'author', content: 'Ігор Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-22' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/doubletopandbottom.png',
    });
    this.meta.updateTag({
      name: 'headline',
      content:
        'Фігура `Подвійна вершина` і `Подвійне дно`: Як торгувати розворотні патерни?',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
