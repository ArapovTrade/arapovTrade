import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-fiveteen',
  templateUrl: './home-uk-blog-fiveteen.component.html',
  styleUrl: './home-uk-blog-fiveteen.component.scss',
})
export class HomeUkBlogFiveteenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle("Вся правда про торгівлю ф'ючерсами");
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        "Дізнайтеся всю правду про торгівлю ф'ючерсами: їх переваги, ризики та секрети успішної торгівлі. Повний посібник для трейдерів.",
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
