import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-eleven',
  templateUrl: './home-ru-blog-eleven.component.html',
  styleUrl: './home-ru-blog-eleven.component.scss',
})
export class HomeRuBlogElevenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Стартовый депозит трейдера: сколько нужно для начала?'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Узнайте, какой стартовый депозит нужен трейдеру, как его правильно рассчитать и управлять капиталом. Полезные советы для начинающих и опытных трейдеров.',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
