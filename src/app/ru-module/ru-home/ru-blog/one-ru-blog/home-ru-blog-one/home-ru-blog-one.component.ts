import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-one',
  templateUrl: './home-ru-blog-one.component.html',
  styleUrl: './home-ru-blog-one.component.scss',
})
export class HomeRuBlogOneComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Фазы рынка в трейдинге  - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Какие существуют фазы рынка? Как определить текущий этап рыночного цикла? Полное руководство по фазам рынка в трейдинге: накопление, рост, распределение и снижение. Стратегии торговли в каждой фазе.',
    });
    this.meta.updateTag({ name: 'author', content: 'Игорь Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-13' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/blogmarketphases.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
