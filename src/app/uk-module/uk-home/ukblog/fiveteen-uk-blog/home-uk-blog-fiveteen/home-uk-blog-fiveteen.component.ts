import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-fiveteen',
  templateUrl: './home-uk-blog-fiveteen.component.html',
  styleUrl: './home-uk-blog-fiveteen.component.scss',
})
export class HomeUkBlogFiveteenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Торгівля ф’ючерсами: правда, ризики і можливості'
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.addTag({
      name: 'description',
      content:
        'Правда про торгівлю ф’ючерсами: основні переваги, ризики та стратегії. Дізнайтеся, як працює ф’ючерсний ринок і що варто знати трейдерам.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-04-10' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/futurestrading.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
