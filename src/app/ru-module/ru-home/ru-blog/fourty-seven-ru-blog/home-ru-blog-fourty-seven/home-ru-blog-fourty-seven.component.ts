import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-fourty-seven',
  templateUrl: './home-ru-blog-fourty-seven.component.html',
  styleUrl: './home-ru-blog-fourty-seven.component.scss',
})
export class HomeRuBlogFourtySevenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Фундаментальный анализ рынка | ArapovTrade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Фундаментальный анализ рынка: как применять в трейдинге. Узнайте об основных принципах, стратегиях и макроэкономических факторах с ArapovTrade.',
    });
    
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-19' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/fundamentalanalysis.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
