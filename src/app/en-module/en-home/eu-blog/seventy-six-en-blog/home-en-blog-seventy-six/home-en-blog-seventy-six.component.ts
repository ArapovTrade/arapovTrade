import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-en-blog-seventy-six',
  templateUrl: './home-en-blog-seventy-six.component.html',
  styleUrl: './home-en-blog-seventy-six.component.scss',
})
export class HomeEnBlogSeventySixComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'William Gann`s Trading Psychology - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Analyzing William Gann`s psychological trading principles, his approach to self-control, risk management, and trader’s emotional resilience. Learn how to apply his methodology in modern trading.',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-18' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/williamgannpsychology.webp',
    });
    this.meta.updateTag({
      name: 'headline',
      content: 'William Gann`s Trading Psychology',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
