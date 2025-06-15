import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-nineteen',
  templateUrl: './home-ru-blog-nineteen.component.html',
  styleUrl: './home-ru-blog-nineteen.component.scss',
})
export class HomeRuBlogNineteenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Метод Вайкоффа в трейдинге | ArapovTrade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Метод Вайкоффа: как анализировать рынок? Гид от ArapovTrade по Wyckoff Method, трендам и точкам входа.',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
