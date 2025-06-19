import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-seventy-nine',
  templateUrl: './home-uk-blog-seventy-nine.component.html',
  styleUrl: './home-uk-blog-seventy-nine.component.scss',
})
export class HomeUkBlogSeventyNineComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Психологія усереднення: втрата депозиту');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дізнайтесь про психологічні пастки усереднення, чому новачки втрачають депозити та як уникнути збитків у трейдингу від ArapovTrade.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-04-10' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/psychologyofaveraging.webp',
    });
    this.meta.updateTag({
      name: 'headline',
      content: 'Психологія усереднення: чому новачки втрачають депозити?',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
