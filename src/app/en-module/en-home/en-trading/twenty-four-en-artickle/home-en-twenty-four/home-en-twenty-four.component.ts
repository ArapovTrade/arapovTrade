import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-en-twenty-four',
  templateUrl: './home-en-twenty-four.component.html',
  styleUrl: './home-en-twenty-four.component.scss',
})
export class HomeEnTwentyFourComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Fibonacci Levels: Principles and Application - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'A detailed analysis of Fibonacci levels: what they are, how they work, and their role in technical analysis.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-18' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/economicstate.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
