import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-fourty-three',
  templateUrl: './home-uk-fourty-three.component.html',
  styleUrl: './home-uk-fourty-three.component.scss',
})
export class HomeUkFourtyThreeComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Пули ліквідності: як шукають Smart Money');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтесь, як Smart Money знаходять пули ліквідності, маніпулюють ринком та використовують приховані зони. Посібник від ArapovTrade.',
    });

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
