import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-eighteen',
  templateUrl: './home-ru-blog-eighteen.component.html',
  styleUrl: './home-ru-blog-eighteen.component.scss',
})
export class HomeRuBlogEighteenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Объемный анализ рынка - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Что такое объемный анализ рынка? Разбираем ключевые принципы, инструменты и стратегии. Полное руководство по объемному анализу и его применению в трейдинге.',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
