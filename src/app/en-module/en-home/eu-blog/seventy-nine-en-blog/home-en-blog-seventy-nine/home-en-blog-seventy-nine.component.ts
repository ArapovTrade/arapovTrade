import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-en-blog-seventy-nine',
  templateUrl: './home-en-blog-seventy-nine.component.html',
  styleUrl: './home-en-blog-seventy-nine.component.scss',
})
export class HomeEnBlogSeventyNineComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'The Psychology of Averaging: Why Beginners Lose Their Deposits? - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Analyzing the psychological traps of averaging, why traders continue adding positions to losing trades, and what alternative strategies can help avoid account liquidation.',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-10' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/psychologyofaveraging.webp',
    });
    this.meta.updateTag({
      name: 'headline',
      content:
        'The Psychology of Averaging: Why Beginners Lose Their Deposits?',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
