import { Component, OnInit, Inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-home-uk-fourty-five',
  templateUrl: './home-uk-fourty-five.component.html',
  styleUrl: './home-uk-fourty-five.component.scss',
})
export class HomeUkFourtyFiveComponent implements OnInit {
  readonly panelOpenState = signal(false);
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document
  ) {}
  ngOnInit(): void {
    this.removeExistingWebPageSchema()

    this.titleService.setTitle(
      'Безкоштовний курс з трейдингу від Ігоря Арапова'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Безкоштовний курс з трейдингу: 130+ статей та 70 відеоуроків. Вивчіть основи, аналіз, психологію торгівлі та перевірені стратегії',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-05-30' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/freeeducationnew.webp',
    });
    this.addJsonLdScript();
    this.addCourseSchema()
     
    this.gerRandom();

    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        setTimeout(() => {
          const element = this.document.getElementById(fragment);
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

  private addJsonLdScript(): void {
    const jsonLdScript = this.document.createElement('script');
    jsonLdScript.type = 'application/ld+json';
    jsonLdScript.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'Як пройти безкоштовний курс із трейдингу від Ігоря Арапова',
      description:
        'Покрокова інструкція для самостійного проходження безкоштовного онлайн-курсу трейдингу.',
      author: { '@type': 'Person', name: 'Ігор Арапов' },
      publisher: {
        '@type': 'Organization',
        name: 'Ігор Арапов',
        logo: {
          '@type': 'ImageObject',
          url: 'https://arapov.trade/favicon.ico',
        },
      },
      license: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
      
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://arapov.trade/uk/freestudying/freeeducation'
      },
      step: [
        {
          '@type': 'HowToStep',
          name: 'Ознайомтеся з програмою курсу',
          text: 'Перейдіть до розділу «Програма курсу» та вивчіть, з чого складається навчання.',
          url: 'https://arapov.trade/uk/freestudying/freeeducation#section1',
        },
        {
          '@type': 'HowToStep',
          name: 'Пройдіть модуль «Трейдинг для початківців»',
          text: 'Розберіться з базовими поняттями та основами біржової торгівлі.',
          url: 'https://arapov.trade/uk/freestudying/freeeducation#section2',
        },
        {
          '@type': 'HowToStep',
          name: 'Вивчіть технічний аналіз',
          text: 'Опанувати базові патерни поведінки ціни, фігури розвороту, рівні.',
          url: 'https://arapov.trade/uk/freestudying/freeeducation#section3',
        },
        {
          '@type': 'HowToStep',
          name: 'Поглибіться в об’ємний аналіз',
          text: 'Навчіться читати біржові обсяги та познайомтеся з концепцією Річарда Вайкоффа.',
          url: 'https://arapov.trade/uk/freestudying/freeeducation#section4',
        },
        {
          '@type': 'HowToStep',
          name: 'Опанувати стратегію Smart Money',
          text: 'Дізнайтесь, як працюють великі учасники ринку та як слідувати за ними.',
          url: 'https://arapov.trade/uk/freestudying/freeeducation#section5',
        },
        {
          '@type': 'HowToStep',
          name: 'Вивчіть психологію трейдингу',
          text: 'Розберіться, як контролювати емоції та мислити як професіонал.',
          url: 'https://arapov.trade/uk/freestudying/freeeducation#section6',
        },
        {
          '@type': 'HowToStep',
          name: 'Проаналізуйте торгові приклади',
          text: 'Розбір угод допоможе зрозуміти, як застосовувати теорію на практиці.',
          url: 'https://arapov.trade/uk/freestudying/freeeducation#section9',
        },
        {
          '@type': 'HowToStep',
          name: 'Ознайомтеся з часто заданими питаннями',
          text: 'Відповіді на поширені питання щодо курсу та трейдингу.',
          url: 'https://arapov.trade/uk/freestudying/freeeducation#section11',
        },
        {
          '@type': 'HowToStep',
          name: 'Підведіть підсумки курсу',
          text: 'Зробіть для себе ключові висновки та підготуйтеся до самостійної торгівлі.',
          url: 'https://arapov.trade/uk/freestudying/freeeducation#section10',
        },
      ],
    });
    this.document.head.appendChild(jsonLdScript);
  }

  private addCourseSchema(): void {
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': 'https://arapov.trade/uk/freestudying/freeeducation#section1',
      url: 'https://arapov.trade/uk/freestudying/freeeducation',
      name: 'Безкоштовний курс із трейдингу від Ігоря Арапова',
      description:
        'Безкоштовний курс із трейдингу: 130+ статей та 70 відеоуроків. Вивчіть основи, аналіз, психологію торгівлі та перевірені стратегії',
      inLanguage: 'uk',
      mainEntity: { '@id': 'https://arapov.trade/uk/studying' },
    });
    this.document.head.appendChild(script);
  }
   

  private removeExistingWebPageSchema(): void {
    const scripts = this.document.querySelectorAll(
      'script[type="application/ld+json"]'
    );

    scripts.forEach((script) => {
      try {
        const content = JSON.parse(script.textContent || '{}');
        if (content['@type'] === 'WebPage') {
          script.remove();
        }
        if (content['@type'] === 'HowTo') {
          script.remove();
        }
         
      } catch (e) {
        // Игнорируем некорректные JSON (например, из других источников)
      }
    });
  }

  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
