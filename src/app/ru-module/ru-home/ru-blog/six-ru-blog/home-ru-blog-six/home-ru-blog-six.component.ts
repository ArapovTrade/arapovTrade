import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-six',
  templateUrl: './home-ru-blog-six.component.html',
  styleUrl: './home-ru-blog-six.component.scss',
})
export class HomeRuBlogSixComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Smart Money в трейдинге: стратегия крупных игроков | Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Узнайте, как Smart Money влияет на трейдинг! Методы крупных игроков, манипуляции ценой и ликвидность для прибыльной торговли с Arapov.trade.',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
