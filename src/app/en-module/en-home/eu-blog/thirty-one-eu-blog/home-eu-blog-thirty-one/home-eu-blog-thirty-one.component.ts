import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-eu-blog-thirty-one',
  templateUrl: './home-eu-blog-thirty-one.component.html',
  styleUrl: './home-eu-blog-thirty-one.component.scss',
})
export class HomeEuBlogThirtyOneComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Support and Resistance Levels');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'A detailed guide on support and resistance levels. Learn how to build, identify, and effectively use them in trading.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-16' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/levelofsupport.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
