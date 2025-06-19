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
    this.titleService.setTitle('Стоп-ордер: як використовувати в трейдингу');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтесь, що таке стоп-ордер, його види, переваги, недоліки та стратегії використання на крипто- і фондових ринках від ArapovTrade.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-03-29' });
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
