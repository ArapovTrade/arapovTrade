import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-twenty-seven',
  templateUrl: './home-ru-blog-twenty-seven.component.html',
  styleUrl: './home-ru-blog-twenty-seven.component.scss',
})
export class HomeRuBlogTwentySevenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Как читать японские свечи');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        "Детальное руководство по японским свечам: их чтению, формациям и применению в трейдинге. Узнайте больше о 'молоте', 'повешенном' и других ключевых паттернах.",
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
