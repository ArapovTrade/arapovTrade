import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-twelve',
  templateUrl: './home-ru-twelve.component.html',
  styleUrl: './home-ru-twelve.component.scss',
})
export class HomeRuTwelveComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Что такое халвинг и как он влияет на рынок криптовалют? - Arapov.trade'
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Халвинг Bitcoin – это один из важнейших механизмов, влияющих на цену и предложение криптовалюты. Узнайте, что такое халвинг, как он работает и как влияет на рынок.',
    });
    this.meta.updateTag({ name: 'author', content: 'Игорь Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/halving.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
