import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-thirty-six',
  templateUrl: './home-uk-thirty-six.component.html',
  styleUrl: './home-uk-thirty-six.component.scss',
})
export class HomeUkThirtySixComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Хибні пробої: як Smart Money збирають ліквідність'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтесь, як Smart Money використовують хибні пробої для збору ліквідності та як уникнути їх пасток у трейдингу. Посібник від ArapovTrade.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-05' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/falsebreakouts.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
