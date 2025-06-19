import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-eighty-six',
  templateUrl: './home-uk-blog-eighty-six.component.html',
  styleUrl: './home-uk-blog-eighty-six.component.scss',
})
export class HomeUkBlogEightySixComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Патерн 1-2-3: розворот тренду | Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтесь про патерн 1-2-3: як визначити розворот тренду та використовувати в трейдингу на ринках. Посібник від ArapovTrade.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-23' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/pattern-1-2-3.png',
    });
    this.meta.updateTag({
      name: 'headline',
      content: 'Патерн 1-2-3: Як використовувати його для розвороту тренду?',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
