import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-en-thirty-seven',
  templateUrl: './home-en-thirty-seven.component.html',
  styleUrl: './home-en-thirty-seven.component.scss',
})
export class HomeEnThirtySevenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'What is  Stop Hunting  and how do Smart Money trigger traders`  stop losses?'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Exploring how Stop Hunting works, why Smart Money trigger traders` stop losses, and how to protect your capital from manipulations by large players.',
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
