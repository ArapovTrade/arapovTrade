import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';
@Component({
  selector: 'app-home-uk-blog-thirty-one',
  templateUrl: './home-uk-blog-thirty-one.component.html',
  styleUrl: './home-uk-blog-thirty-one.component.scss',
})
export class HomeUkBlogThirtyOneComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Рівні підтримки та опору');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Детальний посібник з рівнів підтримки та опору. Дізнайтеся, як їх будувати, визначати та ефективно використовувати у трейдингу.',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
