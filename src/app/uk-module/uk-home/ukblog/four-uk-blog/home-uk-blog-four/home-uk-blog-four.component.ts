import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-four',
  templateUrl: './home-uk-blog-four.component.html',
  styleUrl: './home-uk-blog-four.component.scss',
})
export class HomeUkBlogFourComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
   this.titleService.setTitle('Як не втратити гроші на маржинальній торгівлі');



    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Поради, як мінімізувати ризики та уникнути втрат у маржинальній торгівлі. Ключові стратегії управління капіталом для трейдерів.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-24' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/reasonfordepositeloose.png',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
