import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-seven',
  templateUrl: './home-ru-blog-seven.component.html',
  styleUrl: './home-ru-blog-seven.component.scss',
})
export class HomeRuBlogSevenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Как Зарабатывают в Трейдинге?');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Узнайте, как зарабатывать в трейдинге, какие инструменты и стратегии помогут вам достичь успеха. Разберем, что такое Форекс и как использовать торговое плечо.',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
