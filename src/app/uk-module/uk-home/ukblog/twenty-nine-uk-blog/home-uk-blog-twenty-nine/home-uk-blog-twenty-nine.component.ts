import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';
@Component({
  selector: 'app-home-uk-blog-twenty-nine',
  templateUrl: './home-uk-blog-twenty-nine.component.html',
  styleUrl: './home-uk-blog-twenty-nine.component.scss',
})
export class HomeUkBlogTwentyNineComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Швидкий старт у трейдингу для новачків');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтесь, як швидко почати трейдинг: основи, ключові навички, стратегії та як уникнути типових помилок для новачків від ArapovTrade.',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
