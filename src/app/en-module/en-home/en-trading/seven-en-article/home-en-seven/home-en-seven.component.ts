import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-en-seven',
  templateUrl: './home-en-seven.component.html',
  styleUrl: './home-en-seven.component.scss',
})
export class HomeEnSevenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('The FOREX Market');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'A comprehensive guide to the FOREX market. Learn about its features, participants, trading sessions, and key strategies for beginners and professionals.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-11' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/ForexMarket.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
