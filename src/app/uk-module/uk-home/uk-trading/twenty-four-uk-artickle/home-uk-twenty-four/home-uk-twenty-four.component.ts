import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-twenty-four',
  templateUrl: './home-uk-twenty-four.component.html',
  styleUrl: './home-uk-twenty-four.component.scss',
})
export class HomeUkTwentyFourComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Рівні Фібоначчі в трейдингу | Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтесь про рівні Фібоначчі: принципи, застосування в технічному аналізі та стратегії трейдингу. Посібник від ArapovTrade.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-18' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/economicstate.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
