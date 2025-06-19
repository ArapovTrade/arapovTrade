import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-sixty',
  templateUrl: './home-uk-blog-sixty.component.html',
  styleUrl: './home-uk-blog-sixty.component.scss',
})
export class HomeUkBlogSixtyComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Трейдинг Vs Опціони: порівняння інструментів');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Порівняння трейдингу та опціонів. Переваги, недоліки, стратегії та ризики для різних типів трейдерів на Arapov.trade.',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
