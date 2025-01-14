import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-twenty-six',
  templateUrl: './home-uk-blog-twenty-six.component.html',
  styleUrl: './home-uk-blog-twenty-six.component.scss',
})
export class HomeUkBlogTwentySixComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Види ордерів на біржі - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Які бувають види ордерів на біржі? Як обрати відповідний тип ордера для трейдингу? Повний посібник з ринкових, лімітних, стоп-ордерів та складних ордерів. Особливості застосування різних ордерів у торгівлі.',
    });
    this.meta.updateTag({ name: 'author', content: 'Ігор Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-14' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/ordertypes.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
