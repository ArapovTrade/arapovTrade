import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-thirty-two',
  templateUrl: './home-uk-thirty-two.component.html',
  styleUrl: './home-uk-thirty-two.component.scss',
})
export class HomeUkThirtyTwoComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Стоп-ордер: Повний посібник для трейдерів - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Що таке стоп-ордер і як його правильно використовувати в трейдингу? Детальний розбір Stop Order, його видів, переваг і недоліків, а також стратегій застосування на криптовалютних та фондових біржах.',
    });
    this.meta.updateTag({ name: 'author', content: 'Ігор Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/stoporder.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
