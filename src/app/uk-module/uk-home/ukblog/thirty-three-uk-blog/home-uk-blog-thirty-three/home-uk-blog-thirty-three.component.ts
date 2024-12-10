import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';
@Component({
  selector: 'app-home-uk-blog-thirty-three',
  templateUrl: './home-uk-blog-thirty-three.component.html',
  styleUrl: './home-uk-blog-thirty-three.component.scss',
})
export class HomeUkBlogThirtyThreeComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Пін-бар: Грааль Трейдингу');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Детальний посібник про Пін-бари у трейдингу. Дізнайтеся, як правильно використовувати цей патерн для аналізу ринку та ухвалення торгових рішень.',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
