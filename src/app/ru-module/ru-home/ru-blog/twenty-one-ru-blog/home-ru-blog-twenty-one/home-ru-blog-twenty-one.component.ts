import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-twenty-one',
  templateUrl: './home-ru-blog-twenty-one.component.html',
  styleUrl: './home-ru-blog-twenty-one.component.scss',
})
export class HomeRuBlogTwentyOneComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Как определить маркет мейкера - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Разбираем, кто такие маркет-мейкеры, как их определить на рынке, какие стратегии они используют и как их действия влияют на цену. Полное руководство по анализу крупных игроков.',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
