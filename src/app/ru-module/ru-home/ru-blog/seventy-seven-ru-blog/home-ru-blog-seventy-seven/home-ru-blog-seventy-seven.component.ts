import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-seventy-seven',
  templateUrl: './home-ru-blog-seventy-seven.component.html',
  styleUrl: './home-ru-blog-seventy-seven.component.scss',
})
export class HomeRuBlogSeventySevenComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Психология трейдинга: Как эмоции влияют на сделки? - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Разбираем, как эмоции влияют на трейдинг, почему страх и жадность мешают зарабатывать, а также какие психологические техники помогут контролировать эмоции и повысить эффективность торговли.',
    });
    this.meta.updateTag({ name: 'author', content: 'Игорь Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-18' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/emotionsaffect.webp',
    });
    this.meta.updateTag({
      name: 'headline',
      content: 'Психология трейдинга: Как эмоции влияют на сделки?',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
