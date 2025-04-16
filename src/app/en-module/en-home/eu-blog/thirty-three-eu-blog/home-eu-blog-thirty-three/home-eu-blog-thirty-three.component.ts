import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-eu-blog-thirty-three',
  templateUrl: './home-eu-blog-thirty-three.component.html',
  styleUrl: './home-eu-blog-thirty-three.component.scss',
})
export class HomeEuBlogThirtyThreeComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Pin Bar: The Holy Grail of Trading');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'A detailed guide on Pin Bars in trading. Learn how to use this pattern effectively for market analysis and making trading decisions.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-16' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/pinbar.jpg',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
