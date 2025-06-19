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
    this.titleService.setTitle('Особливості ринку криптовалют | Arapov.trade');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.addTag({
      name: 'description',
      content:
        'У чому особливості крипторинку? Дізнайтесь ключові відмінності, фактори впливу та ефективні стратегії торгівлі від Arapov.trade.',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
