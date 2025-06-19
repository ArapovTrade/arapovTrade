import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-fifty',
  templateUrl: './home-uk-blog-fifty.component.html',
  styleUrl: './home-uk-blog-fifty.component.scss',
})
export class HomeUkBlogFiftyComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Алгоритмічні ордери: як працюють');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтесь про алгоритмічні ордери на біржі: типи, переваги, ризики та їх використання в трейдингу від ArapovTrade.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-03-26' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/algorithmicorders.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
