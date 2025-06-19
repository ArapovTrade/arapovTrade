import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-thirty-seven',
  templateUrl: './home-uk-thirty-seven.component.html',
  styleUrl: './home-uk-thirty-seven.component.scss',
})
export class HomeUkThirtySevenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Stop Hunting: як Smart Money вибивають стопи');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтесь, що таке Stop Hunting, як Smart Money вибивають стопи трейдерів та як захистити капітал від маніпуляцій. Посібник від ArapovTrade.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-03-31' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/stophunting.png',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
