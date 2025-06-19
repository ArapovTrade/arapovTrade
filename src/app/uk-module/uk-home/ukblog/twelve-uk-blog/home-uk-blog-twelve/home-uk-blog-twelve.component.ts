import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-twelve',
  templateUrl: './home-uk-blog-twelve.component.html',
  styleUrl: './home-uk-blog-twelve.component.scss',
})
export class HomeUkBlogTwelveComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Торгівля рівнями: повний посібник | Arapov.trade'
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.addTag({
      name: 'description',
      content:
        'Детальний посібник для початківців з торгівлі рівнями: як визначати, використовувати та ефективно торгувати ключові рівні від Arapov.trade.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-04-14' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/tradingoflevels.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
