import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-thirty-six',
  templateUrl: './home-uk-blog-thirty-six.component.html',
  styleUrl: './home-uk-blog-thirty-six.component.scss',
})
export class HomeUkBlogThirtySixComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Особливості ринку криптовалют');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтеся, чим ринок криптовалют відрізняється від інших ринків, його ключові особливості та стратегії торгівлі, які допоможуть вам заробити.',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
