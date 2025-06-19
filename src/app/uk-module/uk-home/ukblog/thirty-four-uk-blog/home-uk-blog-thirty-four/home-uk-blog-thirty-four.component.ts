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
    this.titleService.setTitle('Як виставляти стоп-лос? | Arapov.trade');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтесь, як виставляти стоп-лосс у трейдингу: стратегії, помилки та методи розрахунку для зниження ризиків і захисту капіталу.',
    });

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
