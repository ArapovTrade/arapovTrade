import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-seventy-three',
  templateUrl: './home-uk-blog-seventy-three.component.html',
  styleUrl: './home-uk-blog-seventy-three.component.scss',
})
export class HomeUkBlogSeventyThreeComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Як аналізувати макроекономіку ринку?');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтесь, як ВВП, інфляція та ставки ФРС впливають на ринок через макроекономічні показники від ArapovTrade.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-16' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/macroeconomicindicators.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
