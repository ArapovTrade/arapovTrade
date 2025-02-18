import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-seventy-six',
  templateUrl: './home-ru-blog-seventy-six.component.html',
  styleUrl: './home-ru-blog-seventy-six.component.scss',
})
export class HomeRuBlogSeventySixComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Психология торговли Уильяма Ганна - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Разбираем психологические принципы торговли Уильяма Ганна, его подход к самоконтролю, управлению рисками и эмоциональной устойчивости трейдера. Узнайте, как применять его методику в современном трейдинге.',
    });
    this.meta.updateTag({ name: 'author', content: 'Игорь Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-18' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/williamgannpsychology.webp',
    });
    this.meta.updateTag({
      name: 'headline',
      content: 'Психология торговли Уильяма Ганна',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
