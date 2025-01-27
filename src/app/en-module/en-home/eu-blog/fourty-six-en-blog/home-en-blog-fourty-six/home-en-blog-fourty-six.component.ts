import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-en-blog-fourty-six',
  templateUrl: './home-en-blog-fourty-six.component.html',
  styleUrl: './home-en-blog-fourty-six.component.scss',
})
export class HomeEnBlogFourtySixComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Bitcoin Pizza Day: History, Significance, and Traditions - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Learn about Bitcoin Pizza Day: how the first purchase with bitcoins was made, why this day became historic, and how it is celebrated in the cryptocurrency world.',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-27' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/pizzaday.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
