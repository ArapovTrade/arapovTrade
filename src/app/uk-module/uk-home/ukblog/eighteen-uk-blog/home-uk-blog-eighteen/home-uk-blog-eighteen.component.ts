import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-eighteen',
  templateUrl: './home-uk-blog-eighteen.component.html',
  styleUrl: './home-uk-blog-eighteen.component.scss',
})
export class HomeUkBlogEighteenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Об’ємний аналіз ринку у трейдингу | Arapov.trade'
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтеся, як працює об’ємний аналіз ринку: принципи, інструменти та стратегії для ефективної торгівлі за обсягами.',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
