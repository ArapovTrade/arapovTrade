import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-fourty-eight',
  templateUrl: './home-ru-blog-fourty-eight.component.html',
  styleUrl: './home-ru-blog-fourty-eight.component.scss',
})
export class HomeRuBlogFourtyEightComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    // this.titleService.setTitle(
    //   'Самостоятельное обучение трейдингу | Игорь Арапов'
    // );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
//     this.meta.updateTag({
//       name: 'description',
//       content:
//        'Самостоятельное обучение трейдингу от Игоря Арапова: пошаговый курс с нуля, реальные стратегии и советы для уверенного старта в трейдинге.'
// ,
//     });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-03' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/selfstudying.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
