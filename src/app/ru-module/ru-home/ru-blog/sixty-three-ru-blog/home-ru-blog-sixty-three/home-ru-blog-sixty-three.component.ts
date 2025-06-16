import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-sixty-three',
  templateUrl: './home-ru-blog-sixty-three.component.html',
  styleUrl: './home-ru-blog-sixty-three.component.scss',
})
export class HomeRuBlogSixtyThreeComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Smart Money: манипуляции рынком | Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Узнайте, как Smart Money манипулирует рынком через новости и толпу! Советы по распознанию трендов, ловушек и ликвидности для трейдинга с Arapov.trade',
    });
     
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-08' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/smartmoneycontrol.png',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
