import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-fourty-six',
  templateUrl: './home-ru-fourty-six.component.html',
  styleUrl: './home-ru-fourty-six.component.scss',
})
export class HomeRuFourtySixComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Криптовалюта Tether (USDT): что это такое и как использовать - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Узнайте все о криптовалюте Tether (USDT): что это, как работает и почему она важна для крипторынка. Особенности, преимущества и риски.',
    });
    this.meta.updateTag({ name: 'author', content: 'Игорь Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-28' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cryptotether.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
