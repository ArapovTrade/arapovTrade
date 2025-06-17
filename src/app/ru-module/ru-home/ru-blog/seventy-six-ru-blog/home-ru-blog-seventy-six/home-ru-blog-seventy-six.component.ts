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
      'Психология трейдинга по Уильяму Ганну: секреты успеха | ArapovTrade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Психология трейдинга по У. Ганну: самоконтроль, управление рисками, устойчивость. Применяйте принципы Ганна в торговле для успеха!',
    });
   
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-18' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/williamgannpsychology.webp',
    });
    this.meta.updateTag({
      name: 'headline',
      content: 'Психология трейдинга по Уильяму Ганну: секреты успеха | ArapovTrade',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
