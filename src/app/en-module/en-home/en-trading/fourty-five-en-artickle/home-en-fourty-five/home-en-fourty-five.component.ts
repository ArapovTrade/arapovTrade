import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-en-fourty-five',
  templateUrl: './home-en-fourty-five.component.html',
  styleUrl: './home-en-fourty-five.component.scss',
})
export class HomeEnFourtyFiveComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Free trading course from Igor Arapov');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Free Trading Course: 130+ Articles and 70 Video Lessons. Learn the Basics, Analysis, Trading Psychology, and Proven Strategies',
    });
     
    this.meta.updateTag({ name: 'datePublished', content: '2025-05-30' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/freeeducationnew.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
