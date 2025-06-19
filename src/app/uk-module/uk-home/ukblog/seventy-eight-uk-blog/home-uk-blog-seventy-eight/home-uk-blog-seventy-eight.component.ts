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
    this.titleService.setTitle('FOMO в трейдингу: як уникнути страху');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтесь, що таке FOMO в трейдингу, як уникнути страху втраченої вигоди та торгувати усвідомлено. Поради від ArapovTrade.',
    });

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
