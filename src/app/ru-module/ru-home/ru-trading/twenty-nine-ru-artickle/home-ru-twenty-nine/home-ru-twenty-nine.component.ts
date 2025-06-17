import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-twenty-nine',
  templateUrl: './home-ru-twenty-nine.component.html',
  styleUrl: './home-ru-twenty-nine.component.scss',
})
export class HomeRuTwentyNineComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Почему трейдеры теряют деньги | Ловушки Смарт Мани'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Главные ошибки трейдеров, ловушки Смарт Мани и как избежать потерь. Полезное руководство для начинающих на Arapov.trade.',
    });
    
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-04' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/smartmoneytraps.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
