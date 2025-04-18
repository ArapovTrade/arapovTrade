import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-eu-blog-fifty-nine',
  templateUrl: './home-eu-blog-fifty-nine.component.html',
  styleUrl: './home-eu-blog-fifty-nine.component.scss',
})
export class HomeEuBlogFiftyNineComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(' How to Trade Level Breakouts in Trading');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        ' A detailed guide on trading level breakouts in trading. Learn how to identify levels, work with pin bars, and use volume.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-18' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/levelbreakoutstrategy.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
