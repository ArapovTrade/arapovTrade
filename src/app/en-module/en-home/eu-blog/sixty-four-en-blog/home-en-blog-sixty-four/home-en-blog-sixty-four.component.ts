import { Component } from '@angular/core';
import { ArticlesService } from '../../../../../servises/articles.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-blog-sixty-four',
  templateUrl: './home-en-blog-sixty-four.component.html',
  styleUrl: './home-en-blog-sixty-four.component.scss',
})
export class HomeEnBlogSixtyFourComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Practical trading recommendations. Trading system - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Practical trading tips, trading system with examples of entry and exit points, money management and risk management. Step-by-step guide',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-05-25' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/prakticen.jpg',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
