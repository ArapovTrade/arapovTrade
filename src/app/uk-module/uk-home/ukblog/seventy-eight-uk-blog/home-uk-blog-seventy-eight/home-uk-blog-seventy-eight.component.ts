import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-seventy-eight',
  templateUrl: './home-uk-blog-seventy-eight.component.html',
  styleUrl: './home-uk-blog-seventy-eight.component.scss',
})
export class HomeUkBlogSeventyEightComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Як уникнути FOMO – страху втраченої вигоди? - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтеся, що таке FOMO у трейдингу, як страх втраченої вигоди заважає ухвалювати обґрунтовані рішення і які стратегії допоможуть уникнути емоційних угод і торгувати усвідомлено.',
    });
    this.meta.updateTag({ name: 'author', content: 'Ігор Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-18' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/fomo.webp',
    });
    this.meta.updateTag({
      name: 'headline',
      content: 'Як уникнути FOMO – страху втраченої вигоди?',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
