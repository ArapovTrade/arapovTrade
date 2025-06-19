import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-eight',
  templateUrl: './home-uk-blog-eight.component.html',
  styleUrl: './home-uk-blog-eight.component.scss',
})
export class HomeUkBlogEightComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Що таке імбаланс у трейдингу | Arapov.trade');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.addTag({
      name: 'description',
      content:
        'Що таке імбаланс у трейдингу, як він впливає на ринок. Приклади, методи виявлення і стратегії з урахуванням ринкового дисбалансу.',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
