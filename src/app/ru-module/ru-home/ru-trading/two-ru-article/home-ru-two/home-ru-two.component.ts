import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-two',
  templateUrl: './home-ru-two.component.html',
  styleUrl: './home-ru-two.component.scss',
})
export class HomeRuTwoComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Основы рынка. Словарь терминов - Arapov.trade');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Полное руководство по основным терминам финансового рынка. Разбираем ключевые понятия фондового, валютного и криптовалютного рынков, а также стратегии трейдинга и анализа.',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
