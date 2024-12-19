import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-sixty',
  templateUrl: './home-ru-blog-sixty.component.html',
  styleUrl: './home-ru-blog-sixty.component.scss',
})
export class HomeRuBlogSixtyComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Трейдинг Vs Опционы: сравнение инструментов');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Сравнение трейдинга и опционов. Разбираем преимущества и недостатки инструментов, стратегии, риски и применение для разных типов трейдеров.',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
