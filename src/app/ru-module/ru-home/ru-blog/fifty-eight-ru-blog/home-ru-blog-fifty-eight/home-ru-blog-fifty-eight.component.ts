import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-fifty-eight',
  templateUrl: './home-ru-blog-fifty-eight.component.html',
  styleUrl: './home-ru-blog-fifty-eight.component.scss',
})
export class HomeRuBlogFiftyEightComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Усреднение в трейдинге - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Как правильно использовать стратегию усреднения в трейдинге? Узнайте о методах усреднения, рисках, преимуществах и стратегиях для эффективной торговли.',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
