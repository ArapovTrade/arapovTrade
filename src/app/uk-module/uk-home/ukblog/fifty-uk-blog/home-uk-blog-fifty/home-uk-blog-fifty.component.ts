import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-fifty',
  templateUrl: './home-uk-blog-fifty.component.html',
  styleUrl: './home-uk-blog-fifty.component.scss',
})
export class HomeUkBlogFiftyComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Алгоритмічні Ордери на Біржі - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Що таке алгоритмічні ордери? Вивчіть їх типи, переваги, ризики та майбутнє використання у трейдингу. Повний посібник для трейдерів.',
    });
    this.meta.updateTag({ name: 'author', content: 'Ігор Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-17' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/algorithmicorders.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
