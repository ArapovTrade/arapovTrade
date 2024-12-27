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
    this.titleService.setTitle('Особенности рынка криптовалют');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Узнайте, чем рынок криптовалют отличается от других рынков, его ключевые особенности и стратегии торговли, которые помогут вам заработать.',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
