import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-five',
  templateUrl: './home-ru-blog-five.component.html',
  styleUrl: './home-ru-blog-five.component.scss',
})
export class HomeRuBlogFiveComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Ценообразование и ликвидность | ArapovTrade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Ценообразование и ликвидность: как они работают? Руководство от ArapovTrade по анализу рынка и стратегиям.',
    });
    
    this.meta.updateTag({ name: 'datePublished', content: '2025-03-26' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/pricingandliquidity.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
