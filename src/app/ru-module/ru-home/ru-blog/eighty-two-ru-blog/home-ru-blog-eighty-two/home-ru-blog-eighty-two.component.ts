import { Component } from '@angular/core';
import { ArticlesService } from '../../../../../servises/articles.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-eighty-two',
  templateUrl: './home-ru-blog-eighty-two.component.html',
  styleUrl: './home-ru-blog-eighty-two.component.scss',
})
export class HomeRuBlogEightyTwoComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Флаг и вымпел: пробой тренда | ArapovTrade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Флаг и вымпел: как торговать пробой тренда? Руководство от ArapovTrade по паттернам, стратегиям и анализу для успешной торговли.',
    });
     
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-21' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/flagandpennant.webp',
    });
    this.meta.updateTag({
      name: 'headline',
      content: 'Флаг и вымпел: пробой тренда | ArapovTrade',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
