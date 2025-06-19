import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-thirty-nine',
  templateUrl: './home-uk-thirty-nine.component.html',
  styleUrl: './home-uk-thirty-nine.component.scss',
})
export class HomeUkThirtyNineComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Прибуток та збитки: R/R у трейдингу');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтесь, як розрахувати співвідношення прибутку та збитків (R/R) у трейдингу, управляти ризиками та підвищувати ефективність. Посібник від ArapovTrade.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-08' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/profitandlossratio.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
