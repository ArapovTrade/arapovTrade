import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-thirty-two',
  templateUrl: './home-uk-blog-thirty-two.component.html',
  styleUrl: './home-uk-blog-thirty-two.component.scss',
})
export class HomeUkBlogThirtyTwoComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Чи варто купувати навчання трейдингу? | Arapov.trade'
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.addTag({
      name: 'description',
      content:
        'Чи варто інвестувати в платне навчання трейдингу? Огляд переваг, підводних каменів та поради для початківців від Arapov.trade.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-04-02' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/purchasingcourses.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
