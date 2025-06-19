import { Component } from '@angular/core';
import { ArticlesService } from '../../../../../servises/articles.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-sixty-two',
  templateUrl: './home-uk-blog-sixty-two.component.html',
  styleUrl: './home-uk-blog-sixty-two.component.scss',
})
export class HomeUkBlogSixtyTwoComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Точки входу за Smart Money: стратегії | Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Стратегії Smart Money для точного входу: Order Blocks, ліквідність, FVG та інші ключові концепції для ефективної торгівлі.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-07' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/smartmoneystrategies.png',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
