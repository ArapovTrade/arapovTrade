import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-eighteen',
  templateUrl: './home-uk-eighteen.component.html',
  styleUrl: './home-uk-eighteen.component.scss',
})
export class HomeUkEighteenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Психологічні ризики FOREX');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтеся про психологічні ризики, пов’язані з торгівлею на FOREX, та як їх мінімізувати. Повний посібник для трейдерів із прикладами та порадами.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-09' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/psychorisks.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
