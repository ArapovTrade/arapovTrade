import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-en-blog-seventy-four',
  templateUrl: './home-en-blog-seventy-four.component.html',
  styleUrl: './home-en-blog-seventy-four.component.scss',
})
export class HomeEnBlogSeventyFourComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Fundamental Analysis of Global Currency Markets - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Fundamental analysis of currency markets is a method of assessing currency value based on macroeconomic factors. We will explore key indicators that influence exchange rates and trading strategies based on fundamental analysis.',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-17' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/globalfundamentalanalysis.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
