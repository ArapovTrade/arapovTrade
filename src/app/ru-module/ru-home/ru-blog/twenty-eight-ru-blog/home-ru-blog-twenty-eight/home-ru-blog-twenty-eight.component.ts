import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-twenty-eight',
  templateUrl: './home-ru-blog-twenty-eight.component.html',
  styleUrl: './home-ru-blog-twenty-eight.component.scss',
})
export class HomeRuBlogTwentyEightComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
   this.titleService.setTitle(
  'Альтернативные блокчейны: обзор и отличия | Arapov.trade'
);
this.meta.updateTag({ name: 'robots', content: 'index, follow' });
this.meta.addTag({
  name: 'description',
  content:
    'Что такое альтернативные блокчейны: как они работают, их преимущества и отличия от Bitcoin и Ethereum. Обзор перспективных сетей нового поколения.',
});


    
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-22' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/altblockchains.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
