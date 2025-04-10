import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-one',
  templateUrl: './home-ru-one.component.html',
  styleUrl: './home-ru-one.component.scss',
})
export class HomeRuOneComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Деривативы и их виды');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Узнайте, что такое деривативы, их основные виды, применение и влияние на финансовые рынки. Полное руководство для трейдеров и инвесторов.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-10' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/dericativessBebPack.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
