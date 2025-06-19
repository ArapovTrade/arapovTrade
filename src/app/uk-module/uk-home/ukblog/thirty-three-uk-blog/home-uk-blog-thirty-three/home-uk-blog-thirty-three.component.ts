import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';
@Component({
  selector: 'app-home-uk-blog-thirty-three',
  templateUrl: './home-uk-blog-thirty-three.component.html',
  styleUrl: './home-uk-blog-thirty-three.component.scss',
})
export class HomeUkBlogThirtyThreeComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Пін-бар: Грааль трейдингу | Arapov.trade');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.addTag({
      name: 'description',
      content:
        'Що таке Пін-бар у трейдингу? Як використовувати цей патерн для аналізу ринку та прийняття ефективних торгових рішень — гід від Arapov.trade.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-04-16' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/pinbar.jpg',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
