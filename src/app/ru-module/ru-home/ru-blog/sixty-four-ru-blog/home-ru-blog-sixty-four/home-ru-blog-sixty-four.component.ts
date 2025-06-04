import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home-ru-blog-sixty-four',
  templateUrl: './home-ru-blog-sixty-four.component.html',
  styleUrl: './home-ru-blog-sixty-four.component.scss',
})
export class HomeRuBlogSixtyFourComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Практические рекомендации по трейдингу. Торговая система - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Практические рекомендации по трейдингу, торговая система  с примерами точек входа и выхода, мани-менеджментом и управление рисками. Пошаговое руководство',
    });
    this.meta.updateTag({ name: 'author', content: 'Игорь Арапов' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-05-25' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/prakticrus.jpg',
    });

    this.gerRandom();

    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        setTimeout(() => {
          const element = document.getElementById(fragment);
          if (element) {
            // Отступ сверху в пикселях, например 80px (зависит от вашего меню)
            const offset = 80;

            // Позиция элемента относительно страницы
            const elementPosition =
              element.getBoundingClientRect().top + window.pageYOffset;

            // Скроллим с учётом отступа
            window.scrollTo({
              top: elementPosition - offset,
              behavior: 'smooth',
            });
          }
        }, 100);
      }
    });
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
