import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-thirty-eight',
  templateUrl: './home-uk-blog-thirty-eight.component.html',
  styleUrl: './home-uk-blog-thirty-eight.component.scss',
})
export class HomeUkBlogThirtyEightComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Принципи зберігання криптовалют | Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Принципи зберігання криптовалют: вибір гаманців, безпека та стратегії захисту активів. Повний посібник для інвесторів Arapov.trade.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-23' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cryptostoring.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
