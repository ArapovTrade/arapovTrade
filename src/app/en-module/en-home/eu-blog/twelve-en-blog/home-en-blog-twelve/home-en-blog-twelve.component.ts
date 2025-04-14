import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-en-blog-twelve',
  templateUrl: './home-en-blog-twelve.component.html',
  styleUrl: './home-en-blog-twelve.component.scss',
})
export class HomeEnBlogTwelveComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Level Trading: A Complete Guide');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'A detailed guide to level trading for beginner traders. Learn how to identify, utilize, and trade key levels.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-14' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/tradingoflevels.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
