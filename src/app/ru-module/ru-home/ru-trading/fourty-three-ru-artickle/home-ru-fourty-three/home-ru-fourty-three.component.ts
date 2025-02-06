import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-fourty-three',
  templateUrl: './home-ru-fourty-three.component.html',
  styleUrl: './home-ru-fourty-three.component.scss',
})
export class HomeRuFourtyThreeComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Пулы ликвидности: Как крупные игроки ищут ликвидность на рынке? - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Пулы ликвидности играют ключевую роль в трейдинге. Узнайте, как Smart Money находят ликвидность, создают рыночные манипуляции и используют скрытые зоны ликвидности.',
    });
    this.meta.updateTag({ name: 'author', content: 'Игорь Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-06' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/liquiditypools.png',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
