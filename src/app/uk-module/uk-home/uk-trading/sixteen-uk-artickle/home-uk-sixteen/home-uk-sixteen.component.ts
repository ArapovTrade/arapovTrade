import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-sixteen',
  templateUrl: './home-uk-sixteen.component.html',
  styleUrl: './home-uk-sixteen.component.scss',
})
export class HomeUkSixteenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Ethereum: що це та як працює | Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтесь про Ethereum: смарт-контракти, децентралізовані додатки, принцип роботи та перспективи. Посібник для трейдерів від ArapovTrade.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/ethereum.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
