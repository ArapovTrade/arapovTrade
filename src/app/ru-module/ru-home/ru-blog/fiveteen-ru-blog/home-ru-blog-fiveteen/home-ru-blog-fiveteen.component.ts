import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-fiveteen',
  templateUrl: './home-ru-blog-fiveteen.component.html',
  styleUrl: './home-ru-blog-fiveteen.component.scss',
})
export class HomeRuBlogFiveteenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Вся правда о торговле фьючерсами');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Узнайте всю правду о торговле фьючерсами: их преимущества, риски и секреты успешной торговли. Полное руководство для трейдеров.',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
