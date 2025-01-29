import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-en-six',
  templateUrl: './home-en-six.component.html',
  styleUrl: './home-en-six.component.scss',
})
export class HomeEnSixComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Algorithmic Stablecoins - Arapov.trade');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Learn what algorithmic stablecoins are, how they work, their advantages and risks. Find out whether this type of cryptocurrency is worth using.',
    });

    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
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
