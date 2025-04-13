import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-ten',
  templateUrl: './home-uk-ten.component.html',
  styleUrl: './home-uk-ten.component.scss',
})
export class HomeUkTenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Позиції в трейдингу: види, перенесення та дата валютування'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтеся, що таке позиції в трейдингу, їх типи, механізм перенесення та дату валютування. Повний посібник для трейдерів та інвесторів, що містить унікальну інформацію та приклади.',
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
