import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-eighty-three',
  templateUrl: './home-uk-blog-eighty-three.component.html',
  styleUrl: './home-uk-blog-eighty-three.component.scss',
})
export class HomeUkBlogEightyThreeComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Фігура `Чашка з ручкою`: Як торгувати сильні пробої? - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Розбираємо фігуру `Чашка з ручкою` – один з найнадійніших патернів продовження тренду. Дізнайтеся, як правильно ідентифікувати цей патерн, які сигнали підтверджують пробій і як застосовувати його в торгових стратегіях.',
    });
    this.meta.updateTag({ name: 'author', content: 'Ігор Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-21' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cupandhandle.png',
    });
    this.meta.updateTag({
      name: 'headline',
      content: 'Фігура `Чашка з ручкою`: Як торгувати сильні пробої?',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
