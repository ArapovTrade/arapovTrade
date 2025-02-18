import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-seventy-six',
  templateUrl: './home-uk-blog-seventy-six.component.html',
  styleUrl: './home-uk-blog-seventy-six.component.scss',
})
export class HomeUkBlogSeventySixComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Психологія торгівлі Вільяма Ганна - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Розбираємо психологічні принципи торгівлі Вільяма Ганна, його підхід до самоконтролю, управління ризиками та емоційної стійкості трейдера. Дізнайтеся, як застосовувати його методику в сучасному трейдингу.',
    });
    this.meta.updateTag({ name: 'author', content: 'Ігор Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-18' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/williamgannpsychology.webp',
    });
    this.meta.updateTag({
      name: 'headline',
      content: 'Психологія торгівлі Вільяма Ганна',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
