import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-seventy',
  templateUrl: './home-uk-blog-seventy.component.html',
  styleUrl: './home-uk-blog-seventy.component.scss',
})
export class HomeUkBlogSeventyComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Вайкофф: об’ємний аналіз ринку');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтесь про концепцію Вайкоффа: як об’ємний аналіз виявляє дії великих гравців і ключові рівні ринку від ArapovTrade.',
    });

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
