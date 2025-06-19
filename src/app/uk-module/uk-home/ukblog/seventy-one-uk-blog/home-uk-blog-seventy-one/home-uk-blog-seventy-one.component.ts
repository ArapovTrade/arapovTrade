import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-seventy-one',
  templateUrl: './home-uk-blog-seventy-one.component.html',
  styleUrl: './home-uk-blog-seventy-one.component.scss',
})
export class HomeUkBlogSeventyOneComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Торгівля на новинах: стратегії трейдера');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтесь, як торгувати на новинах: вплив економічних подій, стратегії трейдингу та мінімізація ризиків від ArapovTrade.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-14' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/newstrading.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
