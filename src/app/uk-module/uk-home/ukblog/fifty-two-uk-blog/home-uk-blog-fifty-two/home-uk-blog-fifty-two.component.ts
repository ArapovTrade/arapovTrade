import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-fifty-two',
  templateUrl: './home-uk-blog-fifty-two.component.html',
  styleUrl: './home-uk-blog-fifty-two.component.scss',
})
export class HomeUkBlogFiftyTwoComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Тренди на ринку: аналіз і стратегії');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтесь, що таке тренди на ринку, їх фази, типи, методи аналізу та стратегії трейдингу від ArapovTrade.',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
