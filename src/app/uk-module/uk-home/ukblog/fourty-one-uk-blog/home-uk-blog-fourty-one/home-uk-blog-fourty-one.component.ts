import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-fourty-one',
  templateUrl: './home-uk-blog-fourty-one.component.html',
  styleUrl: './home-uk-blog-fourty-one.component.scss',
})
export class HomeUkBlogFourtyOneComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Правила успішного трейдингу | Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтеся ключові правила успішного трейдингу: стратегії, управління ризиками, вибір брокера та аналіз ринку для початківців і профі.',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
