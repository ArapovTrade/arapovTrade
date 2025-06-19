import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-fifty-three',
  templateUrl: './home-uk-blog-fifty-three.component.html',
  styleUrl: './home-uk-blog-fifty-three.component.scss',
})
export class HomeUkBlogFiftyThreeComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Ордер блок у трейдингу: як використовувати');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтесь, що таке ордер блок у трейдингу, як його визначити та використовувати в торгових стратегіях від ArapovTrade.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-03-30' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/orderblockintrading.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
