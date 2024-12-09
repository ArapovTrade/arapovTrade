import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-fifty-nine',
  templateUrl: './home-uk-blog-fifty-nine.component.html',
  styleUrl: './home-uk-blog-fifty-nine.component.scss',
})
export class HomeUkBlogFiftyNineComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Як торгувати Пробій рівня у трейдингу');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Детальний посібник із торгівлі на пробій рівня у трейдингу. Дізнайтеся, як визначати рівні, працювати з пін-баром та обсягами.',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
