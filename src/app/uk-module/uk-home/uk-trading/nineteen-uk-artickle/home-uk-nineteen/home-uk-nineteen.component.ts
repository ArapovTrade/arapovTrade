import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-nineteen',
  templateUrl: './home-uk-nineteen.component.html',
  styleUrl: './home-uk-nineteen.component.scss',
})
export class HomeUkNineteenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Як торгувати на FOREX: посібник');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтесь, як торгувати на валютному ринку FOREX: посібник для новачків із стратегіями, порадами та прикладами від ArapovTrade.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-09' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/howtotradeonforex.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
