import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-thirty-four',
  templateUrl: './home-uk-blog-thirty-four.component.html',
  styleUrl: './home-uk-blog-thirty-four.component.scss',
})
export class HomeUkBlogThirtyFourComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Як виставляти стоп-лос? - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Як правильно виставляти стоп-лосс у трейдингу? Розбираємо стратегії, методи розрахунку та помилки під час встановлення Stop-Loss, щоб мінімізувати ризики та захистити капітал.',
    });
    this.meta.updateTag({ name: 'author', content: 'Ігор Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-16' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/stoplossmain.png',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
