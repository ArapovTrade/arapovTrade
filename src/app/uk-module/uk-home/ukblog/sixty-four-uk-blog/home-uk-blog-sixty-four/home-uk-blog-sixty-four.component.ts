import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-sixty-four',
  templateUrl: './home-uk-blog-sixty-four.component.html',
  styleUrl: './home-uk-blog-sixty-four.component.scss',
})
export class HomeUkBlogSixtyFourComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Практичні рекомендації з трейдингу - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Практичні рекомендації з трейдингу, розбір графіків з прикладами точок входу, мані-менеджмент і управління ризиками.',
    });
    this.meta.updateTag({ name: 'author', content: 'Ігор Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-10' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/prakticuk.jpg',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
