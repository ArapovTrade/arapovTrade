import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-seventy-five',
  templateUrl: './home-uk-blog-seventy-five.component.html',
  styleUrl: './home-uk-blog-seventy-five.component.scss',
})
export class HomeUkBlogSeventyFiveComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Трейдинг: азарт чи бізнес? Психологія');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтесь, чи є трейдинг азартом чи бізнесом: психологічні підходи та стратегії успіху на ринках від ArapovTrade.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-17' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/gamblingorbusiness.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
