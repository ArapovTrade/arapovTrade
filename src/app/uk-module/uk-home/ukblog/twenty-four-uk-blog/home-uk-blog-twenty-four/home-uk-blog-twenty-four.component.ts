import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-twenty-four',
  templateUrl: './home-uk-blog-twenty-four.component.html',
  styleUrl: './home-uk-blog-twenty-four.component.scss',
})
export class HomeUkBlogTwentyFourComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle("Фігура 'Прапор' у трейдингу: Повний посібник");
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        "Все, що потрібно знати про фігуру 'Прапор' у трейдингу: як її розпізнати, торгувати та уникнути помилок.",
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
