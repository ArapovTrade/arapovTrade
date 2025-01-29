import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-six',
  templateUrl: './home-ru-six.component.html',
  styleUrl: './home-ru-six.component.scss',
})
export class HomeRuSixComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Алгоритмические стейблкоины  - Arapov.trade');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Разбираем, что такое алгоритмические стейблкоины, как они работают, их преимущества и риски. Узнайте, стоит ли использовать этот вид криптовалюты.',
    });
    this.meta.updateTag({ name: 'author', content: 'Игорь Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-29' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/stablecoins.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
