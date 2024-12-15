import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-ten',
  templateUrl: './home-uk-blog-ten.component.html',
  styleUrl: './home-uk-blog-ten.component.scss',
})
export class HomeUkBlogTenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Причини втрати депозиту');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтеся основні причини втрати депозиту трейдерами, включаючи помилки у стратегії, відсутність дисципліни та переоцінку можливостей. Поради щодо запобігання втратам.',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
