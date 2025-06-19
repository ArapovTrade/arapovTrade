import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-fourty',
  templateUrl: './home-uk-blog-fourty.component.html',
  styleUrl: './home-uk-blog-fourty.component.scss',
})
export class HomeUkBlogFourtyComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Чому трейдинг такий складний? | Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтеся, чому трейдинг складний і які фактори впливають на успіх. Поради для подолання труднощів і досягнення результатів у трейдингу.',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
