import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-fifty-one',
  templateUrl: './home-uk-blog-fifty-one.component.html',
  styleUrl: './home-uk-blog-fifty-one.component.scss',
})
export class HomeUkBlogFiftyOneComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Price Action: Повний посібник');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтеся все про метод Price Action: основні принципи, популярні патерни, стратегії та приклади їх застосування. Повний посібник для початківців та досвідчених трейдерів.',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
