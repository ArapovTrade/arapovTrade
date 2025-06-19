import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-nine',
  templateUrl: './home-uk-blog-nine.component.html',
  styleUrl: './home-uk-blog-nine.component.scss',
})
export class HomeUkBlogNineComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Як прогнозувати ціну на ринку | Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтеся, як прогнозувати ціну на ринку: технічний і фундаментальний аналіз, індикатори та ринкова психологія для трейдерів.',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
