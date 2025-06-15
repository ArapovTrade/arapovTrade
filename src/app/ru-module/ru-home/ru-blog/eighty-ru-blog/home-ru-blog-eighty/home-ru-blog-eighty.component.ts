import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-eighty',
  templateUrl: './home-ru-blog-eighty.component.html',
  styleUrl: './home-ru-blog-eighty.component.scss',
})
export class HomeRuBlogEightyComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Голова и плечи — мощный паттерн разворота | ArapovTrade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Голова и плечи: как торговать разворотный паттерн? Руководство от ArapovTrade по анализу и стратегиям',
    });
    
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-20' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/headandshoulders.png',
    });
    this.meta.updateTag({
      name: 'headline',
      content: 'Голова и плечи — мощный паттерн разворота | ArapovTrade',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
