import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-thirty-nine',
  templateUrl: './home-ru-thirty-nine.component.html',
  styleUrl: './home-ru-thirty-nine.component.scss',
})
export class HomeRuThirtyNineComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Соотношение прибыли и убытка  в трейдинге - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Как правильно рассчитать соотношение прибыли и убытка в трейдинге? Узнайте о R/R Ratio, управлении рисками и стратегиях повышения эффективности торговли.',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
