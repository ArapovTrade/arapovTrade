import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-thirty-six',
  templateUrl: './home-ru-blog-thirty-six.component.html',
  styleUrl: './home-ru-blog-thirty-six.component.scss',
})
export class HomeRuBlogThirtySixComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Особенности рынка криптовалют | Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.addTag({
      name: 'description',
      content:
        'Узнайте особенности рынка криптовалют! Ключевые отличия, стратегии торговли и советы для успешного заработка на Arapov.trade.',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
