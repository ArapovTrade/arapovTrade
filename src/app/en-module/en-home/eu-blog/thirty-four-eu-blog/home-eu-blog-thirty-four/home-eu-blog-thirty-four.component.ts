import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-eu-blog-thirty-four',
  templateUrl: './home-eu-blog-thirty-four.component.html',
  styleUrl: './home-eu-blog-thirty-four.component.scss',
})
export class HomeEuBlogThirtyFourComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('How to set a stop loss? - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'How to properly set a stop-loss in trading? We explain strategies, calculation methods, and mistakes to avoid when setting Stop-Loss to minimize risks and protect your capital.',
    });
    this.meta.updateTag({ name: 'author', content: 'Ihor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-16' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/stoplossmain.png',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
