import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-en-blog-sixteen',
  templateUrl: './home-en-blog-sixteen.component.html',
  styleUrl: './home-en-blog-sixteen.component.scss',
})
export class HomeEnBlogSixteenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Trend Channels: A Complete Guide');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Everything you need to know about trend channels in trading: definition, construction, strategies, and tips.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/trandingchannels.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
