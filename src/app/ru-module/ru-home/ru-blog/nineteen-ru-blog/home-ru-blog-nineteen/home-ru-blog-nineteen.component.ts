import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-nineteen',
  templateUrl: './home-ru-blog-nineteen.component.html',
  styleUrl: './home-ru-blog-nineteen.component.scss',
})
export class HomeRuBlogNineteenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Метод Вайкоффа в трейдинге - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Метод Вайкоффа – это мощный инструмент анализа рынка, основанный на законах спроса и предложения. Узнайте, как применять Wyckoff Method для определения трендов, точек входа и выхода из рынка.',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
