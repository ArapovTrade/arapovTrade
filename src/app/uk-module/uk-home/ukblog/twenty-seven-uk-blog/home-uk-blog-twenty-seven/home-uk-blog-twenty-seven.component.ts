import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-twenty-seven',
  templateUrl: './home-uk-blog-twenty-seven.component.html',
  styleUrl: './home-uk-blog-twenty-seven.component.scss',
})
export class HomeUkBlogTwentySevenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Як читати японські свічки');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        "Детальний посібник з японських свічок: їх читання, формації та застосування у трейдингу. Дізнайтеся більше про 'молот', 'повішеного' та інші ключові патерни.",
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-16' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/japanesecandle.jpg',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
