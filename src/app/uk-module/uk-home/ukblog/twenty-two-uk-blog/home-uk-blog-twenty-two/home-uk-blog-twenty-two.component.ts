import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-twenty-two',
  templateUrl: './home-uk-blog-twenty-two.component.html',
  styleUrl: './home-uk-blog-twenty-two.component.scss',
})
export class HomeUkBlogTwentyTwoComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Що таке арбітраж криптовалют? | Arapov.trade');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.addTag({
      name: 'description',
      content:
        'Що таке арбітраж криптовалют? Основи та секрети стратегії заробітку на різниці цін. Посібник для початківців і професіоналів від Arapov.trade.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-21' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cryptoarbitrage.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
