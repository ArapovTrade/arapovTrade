import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-twelve',
  templateUrl: './home-uk-twelve.component.html',
  styleUrl: './home-uk-twelve.component.scss',
})
export class HomeUkTwelveComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Що таке халвінг і як він впливає на ринок криптовалют? - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Халвінг Bitcoin – один із найважливіших механізмів, що впливають на ціну та пропозицію криптовалюти. Дізнайтеся, що таке халвінг, як він працює та як впливає на ринок.',
    });
    this.meta.updateTag({ name: 'author', content: 'Ігор Арапов' });
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
