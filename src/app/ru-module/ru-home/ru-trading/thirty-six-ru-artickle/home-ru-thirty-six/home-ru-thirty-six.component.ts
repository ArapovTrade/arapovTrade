import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-thirty-six',
  templateUrl: './home-ru-thirty-six.component.html',
  styleUrl: './home-ru-thirty-six.component.scss',
})
export class HomeRuThirtySixComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Smart Money и ложные пробои: как работают | Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.addTag({
      name: 'description',
      content:
        'Узнайте, как Smart Money создают ложные пробои для сбора ликвидности! Способы распознавания ловушек в трейдинге на Arapov.trade.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-05' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/falsebreakouts.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
