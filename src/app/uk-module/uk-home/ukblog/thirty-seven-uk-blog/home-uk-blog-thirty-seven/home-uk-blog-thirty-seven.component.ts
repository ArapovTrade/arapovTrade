import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-thirty-seven',
  templateUrl: './home-uk-blog-thirty-seven.component.html',
  styleUrl: './home-uk-blog-thirty-seven.component.scss',
})
export class HomeUkBlogThirtySevenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Просадки в трейдингу: як керувати ризиками  Arapov.trade'
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.addTag({
      name: 'description',
      content:
        'Що таке просадки в трейдингу та як ними керувати? Дізнайтесь, як знизити ризики та зберегти прибуток за допомогою грамотного аналізу.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-04-02' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/drawdowns.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
