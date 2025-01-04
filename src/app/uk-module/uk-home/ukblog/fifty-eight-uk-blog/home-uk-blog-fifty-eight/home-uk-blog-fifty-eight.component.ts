import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-fifty-eight',
  templateUrl: './home-uk-blog-fifty-eight.component.html',
  styleUrl: './home-uk-blog-fifty-eight.component.scss',
})
export class HomeUkBlogFiftyEightComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Усереднення у трейдингу- Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        ' Як правильно використовувати стратегію усереднення в трейдингу? Дізнайтеся про методи усереднення, ризики, переваги та стратегії для ефективної торгівлі.',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
