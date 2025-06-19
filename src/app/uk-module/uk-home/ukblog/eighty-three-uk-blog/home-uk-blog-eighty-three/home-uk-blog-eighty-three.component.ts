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
    this.titleService.setTitle('Чашка з ручкою: торгуємо пробої');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтесь про патерн Чашка з ручкою: як визначити пробій тренду та використовувати в трейдингу. Посібник від ArapovTrade.',
    });

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
