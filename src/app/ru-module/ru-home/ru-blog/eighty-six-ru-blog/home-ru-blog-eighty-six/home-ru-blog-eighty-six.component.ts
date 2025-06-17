import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-eighty-six',
  templateUrl: './home-ru-blog-eighty-six.component.html',
  styleUrl: './home-ru-blog-eighty-six.component.scss',
})
export class HomeRuBlogEightySixComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Паттерн 1-2-3: разворот тренда | ArapovTrade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Паттерн 1-2-3: как торговать разворот тренда? Руководство от ArapovTrade по анализу, стратегиям и успеху на крипто- и фондовых рынках.',
    });
    
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-23' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/pattern-1-2-3.png',
    });
    this.meta.updateTag({
      name: 'headline',
      content: 'Паттерн 1-2-3: разворот тренда | ArapovTrade',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
