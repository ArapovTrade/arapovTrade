import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-fourty-three',
  templateUrl: './home-uk-blog-fourty-three.component.html',
  styleUrl: './home-uk-blog-fourty-three.component.scss',
})
export class HomeUkBlogFourtyThreeComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Аналіз попиту і пропозиції на крипторинку | Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтеся, як аналізувати попит і пропозицію на крипторинку. Поради, інструменти та стратегії для успішної торгівлі.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-25' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cryptomarketanalysis.png',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
