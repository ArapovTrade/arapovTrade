import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-en-blog-fourty-eight',
  templateUrl: './home-en-blog-fourty-eight.component.html',
  styleUrl: './home-en-blog-fourty-eight.component.scss',
})
export class HomeEnBlogFourtyEightComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Guide to Self-Learning Trading');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Self-learning trading: step-by-step guide, tips, and recommendations for beginners. A successful start in financial markets.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-03' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/selfstudying.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
