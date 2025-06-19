import { Component } from '@angular/core';
import { ArticlesService } from '../../../../../servises/articles.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-sixty-three',
  templateUrl: './home-uk-blog-sixty-three.component.html',
  styleUrl: './home-uk-blog-sixty-three.component.scss',
})
export class HomeUkBlogSixtyThreeComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Як Smart Money маніпулюють ринком | Arapov.trade'
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Як Smart Money керують настроєм і новинами, щоб впливати на ринок і заманювати роздрібних трейдерів у пастки.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-08' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/smartmoneycontrol.png',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
