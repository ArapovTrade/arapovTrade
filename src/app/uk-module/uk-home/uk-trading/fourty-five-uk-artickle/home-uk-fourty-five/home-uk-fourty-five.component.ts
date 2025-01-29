import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-fourty-five',
  templateUrl: './home-uk-fourty-five.component.html',
  styleUrl: './home-uk-fourty-five.component.scss',
})
export class HomeUkFourtyFiveComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Безкоштовне навчання трейдингу - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        "Безкоштовне навчання трейдингу. Вступ до технічного, фундаментального та об'ємного аналізу. Основні принципи торгівлі та психологія трейдера.",
    });

    this.meta.updateTag({ name: 'author', content: 'Ігор Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-29' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/freeeducationnew.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
