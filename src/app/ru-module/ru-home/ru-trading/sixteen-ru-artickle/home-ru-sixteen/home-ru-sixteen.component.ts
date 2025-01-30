import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-sixteen',
  templateUrl: './home-ru-sixteen.component.html',
  styleUrl: './home-ru-sixteen.component.scss',
})
export class HomeRuSixteenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Криптовалюта Ethereum – что это такое и как она работает? - Arapov.trade'
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Ethereum – вторая по капитализации криптовалюта, предлагающая умные контракты и децентрализованные приложения. Узнайте, как работает Ethereum и какие у него перспективы.',
    });
    this.meta.updateTag({ name: 'author', content: 'Игорь Арапов' });
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
