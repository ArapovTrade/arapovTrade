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
      'Практичні рекомендації з трейдингу. Торгова система - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Практичні рекомендації з трейдингу, торгова система з прикладами точок входу та виходу, мані-менеджментом та управління ризиками. Покрокове керівництво',
    });
    this.meta.updateTag({ name: 'author', content: 'Ігор Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-05-25' });
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
