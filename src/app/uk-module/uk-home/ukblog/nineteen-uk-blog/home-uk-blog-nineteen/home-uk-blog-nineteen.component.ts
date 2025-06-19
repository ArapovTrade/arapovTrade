import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-nineteen',
  templateUrl: './home-uk-blog-nineteen.component.html',
  styleUrl: './home-uk-blog-nineteen.component.scss',
})
export class HomeUkBlogNineteenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Метод Вайкоффа в трейдингу | Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтеся, як методом Вайкоффа аналізувати попит і пропозицію, визначати тренди та оптимальні точки входу і виходу в трейдингу.',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
