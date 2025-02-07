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
      'Як знаходити точки входу за Smart Money? Найкращі стратегії - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Розбираємо стратегії Smart Money, що дозволяють знаходити точні точки входу. Як використовувати Order Blocks, ліквідність, FVG та інші концепції для точного входу в ринок.',
    });
    this.meta.updateTag({ name: 'author', content: 'Ігор Арапов' });
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
