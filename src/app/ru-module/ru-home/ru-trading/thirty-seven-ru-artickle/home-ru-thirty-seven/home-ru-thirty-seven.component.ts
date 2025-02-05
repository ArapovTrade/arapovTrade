import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-thirty-seven',
  templateUrl: './home-ru-thirty-seven.component.html',
  styleUrl: './home-ru-thirty-seven.component.scss',
})
export class HomeRuThirtySevenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Что такое `Stop Hunting` и как Smart Money выбивают стопы трейдеров? - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Разбираем, как работает Stop Hunting, почему Smart Money выбивают стопы трейдеров и как защитить свой капитал от манипуляций крупных игроков.',
    });
    this.meta.updateTag({ name: 'author', content: 'Игорь Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-05' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/stophunting.png',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
