import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-ten',
  templateUrl: './home-ru-ten.component.html',
  styleUrl: './home-ru-ten.component.scss',
})
export class HomeRuTenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Позиции в трейдинге: виды, перенос и дата валютирования'
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Узнайте, что такое позиции в трейдинге, их типы, механизм переноса и дату валютирования. Полное руководство для трейдеров и инвесторов, содержащее уникальную информацию и примеры.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-13' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/currencyPosition.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
