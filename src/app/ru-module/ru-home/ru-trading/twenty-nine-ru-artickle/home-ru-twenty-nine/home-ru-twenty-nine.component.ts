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
      'Почему 90% трейдеров теряют деньги? Ловушки, созданные Смарт Мани - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Узнайте, почему 90% трейдеров теряют деньги и какие ловушки расставляют Смарт Мани. Разбираем главные ошибки, манипуляции и способы избежать финансовых потерь на рынке.',
    });
    this.meta.updateTag({ name: 'author', content: 'Игорь Арапов' });
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
