import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-en-blog-seventy-five',
  templateUrl: './home-en-blog-seventy-five.component.html',
  styleUrl: './home-en-blog-seventy-five.component.scss',
})
export class HomeEnBlogSeventyFiveComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Trading – a gambling game or a business? Two psychological approaches - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Let`s examine two psychological approaches to trading: gambling and professional. We`ll analyze the key differences between a game and a business, as well as explore strategies that help achieve success in financial markets.',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-17' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/gamblingorbusiness.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
