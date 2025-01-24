import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-en-blog-four',
  templateUrl: './home-en-blog-four.component.html',
  styleUrl: './home-en-blog-four.component.scss',
})
export class HomeEnBlogFourComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'How Not to Lose All Your Money in Margin Trading?  - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Learn how to avoid losses in margin trading, minimize risks, and improve your capital management strategy. Useful tips for beginners and experienced traders.',
    });
    this.meta.updateTag({ name: 'author', content: 'Ihor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-24' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/reasonfordepositeloose.png',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
