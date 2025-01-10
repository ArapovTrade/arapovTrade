import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';
@Component({
  selector: 'app-home-ru-blog-fifty-two',
  templateUrl: './home-ru-blog-fifty-two.component.html',
  styleUrl: './home-ru-blog-fifty-two.component.scss',
})
export class HomeRuBlogFiftyTwoComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Анатомия трендов на рынке - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Разбираем, что такое тренд на финансовом рынке, его фазы, типы и методы анализа. Полное руководство по анатомии трендов: индикаторы, стратегии и принципы торговли.',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
