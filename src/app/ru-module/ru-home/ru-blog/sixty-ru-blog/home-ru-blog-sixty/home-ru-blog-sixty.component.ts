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
    this.titleService.setTitle('Трейдинг vs опционы: что выбрать трейдеру | Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Трейдинг или опционы: что выбрать трейдеру? Сравнение стратегий, рисков и преимуществ для успешной торговли с Arapov.trade',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
