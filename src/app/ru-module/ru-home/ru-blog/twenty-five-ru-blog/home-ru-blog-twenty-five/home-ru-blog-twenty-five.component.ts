import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-twenty-five',
  templateUrl: './home-ru-blog-twenty-five.component.html',
  styleUrl: './home-ru-blog-twenty-five.component.scss',
})
export class HomeRuBlogTwentyFiveComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Функции маркет-мейкеров на рынке криптовалют - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Узнайте, какие функции выполняют маркет-мейкеры на рынке криптовалют, их роль в обеспечении ликвидности, стабильности цен и развитии торговли. Уникальный взгляд на важность маркет-мейкеров в криптоиндустрии.',
    });

    this.meta.updateTag({ name: 'author', content: 'Игорь Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-22' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cryptommakers.webpp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
