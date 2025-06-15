import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-seventy-one',
  templateUrl: './home-ru-blog-seventy-one.component.html',
  styleUrl: './home-ru-blog-seventy-one.component.scss',
})
export class HomeRuBlogSeventyOneComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Торговля на новостях в трейдинге | ArapovTrade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Торговля на новостях: как минимизировать риски? Советы от ArapovTrade по стратегиям и волатильности.',
    });
   
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-14' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/newstrading.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
