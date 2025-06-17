import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-eighty-three',
  templateUrl: './home-ru-blog-eighty-three.component.html',
  styleUrl: './home-ru-blog-eighty-three.component.scss',
})
export class HomeRuBlogEightyThreeComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Чашка с ручкой: пробой тренда | ArapovTrade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Чашка с ручкой: как торговать пробой тренда? Руководство от ArapovTrade по паттерну, стратегиям и успеху на крипто- и фондовых рынках.',
    });
     
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-21' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cupandhandle.png',
    });
    this.meta.updateTag({
      name: 'headline',
      content: 'Чашка с ручкой: пробой тренда | ArapovTrade',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
