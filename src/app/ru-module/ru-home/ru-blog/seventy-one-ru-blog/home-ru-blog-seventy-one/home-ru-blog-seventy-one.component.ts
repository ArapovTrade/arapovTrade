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
      'Как трейдеру торговать на новостях - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Полное руководство по торговле на новостях. Разбираем, как экономические события влияют на рынок, какие стратегии новостной торговли самые эффективные и как минимизировать риски во время высокой волатильности.',
    });
    this.meta.updateTag({ name: 'author', content: 'Игорь Арапов' });
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
