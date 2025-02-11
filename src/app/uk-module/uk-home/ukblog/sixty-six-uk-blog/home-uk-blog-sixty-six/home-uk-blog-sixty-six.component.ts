import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-sixty-six',
  templateUrl: './home-uk-blog-sixty-six.component.html',
  styleUrl: './home-uk-blog-sixty-six.component.scss',
})
export class HomeUkBlogSixtySixComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Як аналізувати рівні максимального скупчення обсягів - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Повний посібник з аналізу рівнів максимального обсягу. Розбираємо, як знаходити зони великого інтересу, визначати ключові рівні підтримки та опору та торгувати з урахуванням об’ємного аналізу.',
    });
    this.meta.updateTag({ name: 'author', content: 'Ігор Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-11' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/peakvolumelevels.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
