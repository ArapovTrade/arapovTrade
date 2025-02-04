import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-thirty',
  templateUrl: './home-uk-thirty.component.html',
  styleUrl: './home-uk-thirty.component.scss',
})
export class HomeUkThirtyComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Imbalance і FVG (Fair Value Gaps): Як знаходити сильні зони ліквідності? - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Розбираємо, що таке Imbalance і FVG (Fair Value Gaps), як їх знаходити на графіку та використовувати у торгівлі. Дізнайтеся, чому ці зони важливі для визначення ліквідності та як застосовувати їх у стратегіях.',
    });

    this.meta.updateTag({ name: 'author', content: 'Ігор Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-04' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/imbalanceandfvg.png',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
