import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-seventy-eight',
  templateUrl: './home-ru-blog-seventy-eight.component.html',
  styleUrl: './home-ru-blog-seventy-eight.component.scss',
})
export class HomeRuBlogSeventyEightComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Как избежать FOMO в трейдинге? | ArapovTrade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'FOMO в трейдинге: как избежать потерь? Советы от ArapovTrade по осознанной торговле и управлению эмоциями.',
    });
    
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-18' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/fomo.webp',
    });
    this.meta.updateTag({
      name: 'headline',
      content: 'Как избежать FOMO – страха упущенной прибыли?',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
