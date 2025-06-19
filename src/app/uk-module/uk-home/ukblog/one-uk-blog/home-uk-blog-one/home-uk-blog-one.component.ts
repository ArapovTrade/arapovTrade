import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-one',
  templateUrl: './home-uk-blog-one.component.html',
  styleUrl: './home-uk-blog-one.component.scss',
})
export class HomeUkBlogOneComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
   this.titleService.setTitle('Фази ринку у трейдингу | Arapov.trade');
this.meta.updateTag({ name: 'robots', content: 'index, follow' });
this.meta.addTag({
  name: 'description',
  content:
    'Дізнайтеся про фази ринку в трейдингу: накопичення, зростання, розподіл і зниження. Як визначити фазу та застосувати стратегії для успішної торгівлі.',
});

  
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-13' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/blogmarketphases.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
