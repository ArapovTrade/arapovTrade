import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-eighteen',
  templateUrl: './home-uk-blog-eighteen.component.html',
  styleUrl: './home-uk-blog-eighteen.component.scss',
})
export class HomeUkBlogEighteenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Об`ємний аналіз ринку - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Що таке об’ємний аналіз ринку? Розбираємо ключові принципи, інструменти та стратегії. Повний посібник з об’ємного аналізу та його застосування у трейдингу.',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
