import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-fifty-seven',
  templateUrl: './home-uk-blog-fifty-seven.component.html',
  styleUrl: './home-uk-blog-fifty-seven.component.scss',
})
export class HomeUkBlogFiftySevenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Індикатори у трейдингу: Повний посібник');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтеся все про торгові індикатори: їх види, застосування та популярні стратегії для ефективного аналізу ринку, включаючи RSI та MACD.',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
