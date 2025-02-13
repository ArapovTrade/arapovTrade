import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-en-blog-seventy',
  templateUrl: './home-en-blog-seventy.component.html',
  styleUrl: './home-en-blog-seventy.component.scss',
})
export class HomeEnBlogSeventyComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Richard Wyckoff`s Concept in Understanding Volume - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'A complete guide to Richard Wyckoff`s concept. We analyze how volume analysis helps determine the intentions of large players and identify key market levels.',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-13' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/wyckoffsvolumeconcept.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
