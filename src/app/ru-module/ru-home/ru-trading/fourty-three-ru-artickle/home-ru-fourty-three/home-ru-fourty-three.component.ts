import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-fourty-three',
  templateUrl: './home-ru-fourty-three.component.html',
  styleUrl: './home-ru-fourty-three.component.scss',
})
export class HomeRuFourtyThreeComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Пулы ликвидности в трейдинге | Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.addTag({
      name: 'description',
      content:
        'Узнайте, как работают пулы ликвидности! Как Smart Money ищет ликвидность и использует скрытые зоны в трейдинге на Arapov.trade.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-06' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/liquiditypools.png',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
