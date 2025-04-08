import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-thirty-eight',
  templateUrl: './home-uk-thirty-eight.component.html',
  styleUrl: './home-uk-thirty-eight.component.scss',
})
export class HomeUkThirtyEightComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Специфіка управління капіталом у трейдингу - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Повний посібник з управління капіталом у трейдингу. Ризик-менеджмент, мані-менеджмент, контроль збитків та ефективні стратегії управління депозитом.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-08' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/capitalmanagement.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
