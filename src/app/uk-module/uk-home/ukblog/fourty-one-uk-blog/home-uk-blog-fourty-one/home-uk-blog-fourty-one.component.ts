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
    this.titleService.setTitle(
      'Правила для Успішного Трейдингу - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Повний посібник з успішного трейдингу: стратегії, управління ризиками, вибір брокера, технічний і фундаментальний аналіз. Дізнайтеся, як стати успішним трейдером!',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
