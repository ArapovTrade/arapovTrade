import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-fourty-one',
  templateUrl: './home-ru-blog-fourty-one.component.html',
  styleUrl: './home-ru-blog-fourty-one.component.scss',
})
export class HomeRuBlogFourtyOneComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Правила для успешного трейдинга | Arapov.trade'

    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Полное руководство по успешному трейдингу: стратегии, управление рисками, выбор брокера, технический и фундаментальный анализ. Станьте успешным трейдером!',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
