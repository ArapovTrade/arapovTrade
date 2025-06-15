import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-seventeen',
  templateUrl: './home-ru-blog-seventeen.component.html',
  styleUrl: './home-ru-blog-seventeen.component.scss',
})
export class HomeRuBlogSeventeenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Мифы о трейдинге: топ заблуждений | ArapovTrade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Топ мифов о трейдинге: разоблачение заблуждений. Советы от ArapovTrade для новичков и опытных трейдеров.',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
