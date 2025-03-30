import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-en-fourty-four',
  templateUrl: './home-en-fourty-four.component.html',
  styleUrl: './home-en-fourty-four.component.scss',
})
export class HomeEnFourtyFourComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Hidden Orders (Iceberg Orders): How Banks Mask Their Positions? - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'What are hidden orders (Iceberg Orders)? How do banks and large players use them to mask their positions? Learn how to detect iceberg orders and how to use them in trading.',
    });
     
    this.meta.updateTag({ name: 'datePublished', content: '2025-03-30' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/icebergorders.png',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
