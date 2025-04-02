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
      'Просадки в трейдингу: Як керувати ризиками та зберігати прибуток'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтеся, що таке просадки в трейдингу, як їх аналізувати та керувати ними для досягнення стабільного прибутку.',
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
