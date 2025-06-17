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
  'Маркет-мейкеры в крипторынке: функции и роль | Arapov.trade'
);
this.meta.updateTag({ name: 'robots', content: 'index, follow' });
this.meta.addTag({
  name: 'description',
  content:
    'Функции маркет-мейкеров в крипторынке: обеспечение ликвидности, стабилизация цен и поддержка торговли. Роль маркет-мейкеров в развитии криптоиндустрии.',
});


   
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
