import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-en-twenty',
  templateUrl: './home-en-twenty.component.html',
  styleUrl: './home-en-twenty.component.scss',
})
export class HomeEnTwentyComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Analysis of Supply and Demand Within the Concept of Peter Steidlmayer - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Learn how to analyze the market using Peter Steidlmayer’s concept. What is Market Profile, how to account for supply and demand in trading, and which tools to use for successful trading.',
    });
     
    this.meta.updateTag({ name: 'datePublished', content: '2025-03-27' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/steidlmayeranalysis.png',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
