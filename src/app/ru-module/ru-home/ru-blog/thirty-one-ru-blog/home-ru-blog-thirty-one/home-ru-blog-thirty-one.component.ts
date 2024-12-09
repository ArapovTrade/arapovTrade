import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-thirty-one',
  templateUrl: './home-ru-blog-thirty-one.component.html',
  styleUrl: './home-ru-blog-thirty-one.component.scss',
})
export class HomeRuBlogThirtyOneComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Уровни Поддержки и Сопротивления');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Детальное руководство по уровням поддержки и сопротивления. Узнайте, как их строить, определять и эффективно использовать в трейдинге.',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
