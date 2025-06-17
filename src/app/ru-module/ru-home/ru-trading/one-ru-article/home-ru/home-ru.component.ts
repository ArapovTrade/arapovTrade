import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru',
  templateUrl: './home-ru.component.html',
  styleUrl: './home-ru.component.scss',
})
export class HomeRuComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(
      '10 советов начинающим трейдерам | Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Узнайте 10 ключевых советов для начинающих трейдеров: управление рисками, разработка стратегии и избегание ошибок. Советы от Arapov.trade.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-04-07' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/traderStarterw.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
