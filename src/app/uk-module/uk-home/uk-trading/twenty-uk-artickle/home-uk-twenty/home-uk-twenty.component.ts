import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-twenty',
  templateUrl: './home-uk-twenty.component.html',
  styleUrl: './home-uk-twenty.component.scss',
})
export class HomeUkTwentyComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Аналіз попиту і пропозиції у трейдингу | Arapov.trade');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
  name: 'description',
  content:
    'Як використовувати концепцію Пітера Стеделмайєра для аналізу попиту і пропозиції. Основи Market Profile для ефективної торгівлі на ринку.',
});

     
    this.meta.updateTag({ name: 'datePublished', content: '2025-03-27' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/steidlmayeranalysis.png',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
