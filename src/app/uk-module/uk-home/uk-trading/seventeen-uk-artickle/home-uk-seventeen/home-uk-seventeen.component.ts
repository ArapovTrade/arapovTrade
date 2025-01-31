import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-seventeen',
  templateUrl: './home-uk-seventeen.component.html',
  styleUrl: './home-uk-seventeen.component.scss',
})
export class HomeUkSeventeenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Що таке Біткоїн (Bitcoin) і як це працює? - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтеся, що таке Біткоїн, як він працює, які у нього переваги та ризики, а також як використовувати криптовалюту для інвестицій і торгівлі.',
    });
    this.meta.updateTag({ name: 'author', content: 'Ігор Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-31' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/bitcoin.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
