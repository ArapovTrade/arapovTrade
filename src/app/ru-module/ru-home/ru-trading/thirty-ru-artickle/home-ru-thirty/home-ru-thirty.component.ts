import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-thirty',
  templateUrl: './home-ru-thirty.component.html',
  styleUrl: './home-ru-thirty.component.scss',
})
export class HomeRuThirtyComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Imbalance и FVG (Fair Value Gaps): Как находить сильные зоны ликвидности? - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Разбираем, что такое Imbalance и FVG (Fair Value Gaps), как их находить на графике и использовать в торговле. Узнайте, почему эти зоны важны для определения ликвидности и как применять их в стратегиях.',
    });
    
    this.meta.updateTag({ name: 'datePublished', content: '2025-03-30' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/imbalanceandfvg.png',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
