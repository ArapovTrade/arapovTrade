import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-twenty-five',
  templateUrl: './home-uk-twenty-five.component.html',
  styleUrl: './home-uk-twenty-five.component.scss',
})
export class HomeUkTwentyFiveComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Економічні показники зростання');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтесь про ключові економічні показники зростання та їх вплив на фінансові ринки. Посібник для трейдерів від ArapovTrade.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-20' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/keyeconomicgrowth.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
