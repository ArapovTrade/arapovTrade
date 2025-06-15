import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-seventy-seven',
  templateUrl: './home-ru-blog-seventy-seven.component.html',
  styleUrl: './home-ru-blog-seventy-seven.component.scss',
})
export class HomeRuBlogSeventySevenComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Психология трейдинга: влияние эмоций на сделки | Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Как эмоции влияют на трейдинг? Узнайте, как страх и жадность мешают торговать и какие техники помогут контролировать эмоции для успешных сделок',
    });
   
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-18' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/emotionsaffect.webp',
    });
    this.meta.updateTag({
      name: 'headline',
      content: 'Психология трейдинга: влияние эмоций на сделки | Arapov.trade',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
