import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-eighty-two',
  templateUrl: './home-uk-blog-eighty-two.component.html',
  styleUrl: './home-uk-blog-eighty-two.component.scss',
})
export class HomeUkBlogEightyTwoComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Прапор і Вимпел: торгуємо пробій');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтесь про патерни Прапор і Вимпел: як визначити пробій тренду та використовувати в трейдингу. Посібник від ArapovTrade.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-21' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/flagandpennant.webp',
    });
    this.meta.updateTag({
      name: 'headline',
      content: 'Прапор і вимпел: Як правильно торгувати після імпульсу?',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
