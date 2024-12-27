import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-fourty-two',
  templateUrl: './home-ru-blog-fourty-two.component.html',
  styleUrl: './home-ru-blog-fourty-two.component.scss',
})
export class HomeRuBlogFourtyTwoComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Риски криптовалют для начинающих');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Изучите основные риски криптовалютного рынка для начинающих трейдеров и инвесторов. Узнайте, как управлять рисками и минимизировать потери.',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
