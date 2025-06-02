import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home-ru-fourty-five',
  templateUrl: './home-ru-fourty-five.component.html',
  styleUrl: './home-ru-fourty-five.component.scss',
})
export class HomeRuFourtyFiveComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Бесплатный курс по  трейдингу от Игоря Арапова');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Бесплатный курс по трейдингу: 130+ статей и 70 видеоуроков. Изучите основы, анализ, психологию торговли и проверенные стратегии',
    });
   
    this.meta.updateTag({ name: 'datePublished', content: '2025-05-30' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/freeeducationnew.webp',
    });
  
    this.gerRandom();


    this.route.fragment.subscribe(fragment => {
  if (fragment) {
    setTimeout(() => {
      const element = document.getElementById(fragment);
      if (element) {
        // Отступ сверху в пикселях, например 80px (зависит от вашего меню)
        const offset = 80;

        // Позиция элемента относительно страницы
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;

        // Скроллим с учётом отступа
        window.scrollTo({
          top: elementPosition - offset,
          behavior: 'smooth'
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
