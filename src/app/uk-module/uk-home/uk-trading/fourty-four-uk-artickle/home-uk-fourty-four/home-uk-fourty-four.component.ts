import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-fourty-four',
  templateUrl: './home-uk-fourty-four.component.html',
  styleUrl: './home-uk-fourty-four.component.scss',
})
export class HomeUkFourtyFourComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Приховані ордери (Iceberg Orders): Як банки маскують свої позиції? - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Що таке приховані ордери (Iceberg Orders)? Як банки та великі гравці використовують їх для маскування своїх позицій? Дізнайтесь, як виявити айсберг-ордера та як їх використовувати в торгівлі.',
    });
    this.meta.updateTag({ name: 'author', content: 'Ігор Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-06' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/icebergorders.png',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
