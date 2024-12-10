import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-fifty-seven',
  templateUrl: './home-ru-blog-fifty-seven.component.html',
  styleUrl: './home-ru-blog-fifty-seven.component.scss',
})
export class HomeRuBlogFiftySevenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Индикаторы в трейдинге: Полное руководство');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Узнайте всё о торговых индикаторах: их виды, применение и популярные стратегии для эффективного анализа рынка, включая RSI и MACD.',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
