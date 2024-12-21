import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-thirty-two',
  templateUrl: './home-uk-blog-thirty-two.component.html',
  styleUrl: './home-uk-blog-thirty-two.component.scss',
})
export class HomeUkBlogThirtyTwoComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Чи варто купувати навчання трейдингу?');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        "Розглянемо переваги платного навчання трейдингу. Дізнайтеся, чому інвестування в навчання може стати першим кроком до успішної кар'єри трейдера.",
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
