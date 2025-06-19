import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-three',
  templateUrl: './home-uk-blog-three.component.html',
  styleUrl: './home-uk-blog-three.component.scss',
})
export class HomeUkBlogThreeComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Волатильність у трейдінгу | Arapov.trade');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтеся, що таке волатильність, як вона впливає на трейдинг і які стратегії ефективні на високо-волатильних ринках.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-03-31' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/volatility44.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
