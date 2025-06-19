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
    this.titleService.setTitle('Фігура Трикутник у технічному аналізі');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтесь про фігуру Трикутник: як визначити патерн, сигнали пробою та використання в трейдингу. Посібник від ArapovTrade.',
    });

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
