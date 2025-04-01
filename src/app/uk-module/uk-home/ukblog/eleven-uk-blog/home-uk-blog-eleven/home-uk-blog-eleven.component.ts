import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-eleven',
  templateUrl: './home-uk-blog-eleven.component.html',
  styleUrl: './home-uk-blog-eleven.component.scss',
})
export class HomeUkBlogElevenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Стартовий депозит трейдера: скільки потрібно для початку?'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтеся, який стартовий депозит потрібен трейдеру, як його правильно розрахувати і управляти капіталом. Корисні поради для початківців і досвідчених трейдерів.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-01' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/starterdeposit.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
