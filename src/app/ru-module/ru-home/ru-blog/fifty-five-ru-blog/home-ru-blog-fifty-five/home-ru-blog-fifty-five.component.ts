import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-fifty-five',
  templateUrl: './home-ru-blog-fifty-five.component.html',
  styleUrl: './home-ru-blog-fifty-five.component.scss',
})
export class HomeRuBlogFiftyFiveComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Скальпинг в трейдинге: Полное руководство - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Подробное руководство по скальпингу в трейдинге: стратегии, индикаторы, риски и автоматизация. Научитесь зарабатывать на краткосрочных сделках!',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
