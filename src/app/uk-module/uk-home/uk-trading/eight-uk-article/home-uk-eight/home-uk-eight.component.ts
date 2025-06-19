import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-eight',
  templateUrl: './home-uk-eight.component.html',
  styleUrl: './home-uk-eight.component.scss',
})
export class HomeUkEightComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Валюти та котирування: основи трейдингу');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтесь про валюти, їх види, котирування та використання в торгівлі й на фінансових ринках. Посібник для трейдерів від ArapovTrade.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-11' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/currencies.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
