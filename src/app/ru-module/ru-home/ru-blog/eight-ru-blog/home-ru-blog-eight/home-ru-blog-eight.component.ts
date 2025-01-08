import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-eight',
  templateUrl: './home-ru-blog-eight.component.html',
  styleUrl: './home-ru-blog-eight.component.scss',
})
export class HomeRuBlogEightComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Имбаланс в трейдинге - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Разбираем концепцию имбаланса в трейдинге, его влияние на движение цены, методы анализа и торговые стратегии. Полное руководство по использованию рыночного дисбаланса.',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
