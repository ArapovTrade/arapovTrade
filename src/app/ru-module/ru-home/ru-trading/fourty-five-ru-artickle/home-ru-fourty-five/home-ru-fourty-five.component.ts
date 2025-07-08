import {
  Component,
  OnInit,
  Inject,
  signal,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  AfterViewInit,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-home-ru-fourty-five',
  templateUrl: './home-ru-fourty-five.component.html',
  styleUrl: './home-ru-fourty-five.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeRuFourtyFiveComponent implements OnInit, AfterViewInit {
  readonly panelOpenState = signal(false);
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Бесплатный курс по  трейдингу от Игоря Арапова'
    );
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
    this.addJsonLdScript();

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
      name: 'Как пройти бесплатный курс по трейдингу от Игоря Арапова',
      description:
        'Пошаговая инструкция для самостоятельного прохождения бесплатного онлайн-курса трейдинга.',
      author: { '@type': 'Person', name: 'Игорь Арапов' },
      publisher: {
        '@type': 'Organization',
        name: 'Игорь Арапов',
        logo: { '@type': 'ImageObject', url: 'https://example.com/logo.png' },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://arapov.trade/ru/freestudying/freeeducation',
      },
      step: [
        {
          '@type': 'HowToStep',
          name: 'Ознакомьтесь с программой курса',
          text: 'Перейдите к разделу «Программа курса» и изучите, из чего состоит обучение.',
          url: 'https://arapov.trade/ru/freestudying/freeeducation#programma-kursa',
        },
        {
          '@type': 'HowToStep',
          name: 'Пройдите модуль «Трейдинг для начинающих»',
          text: 'Разберитесь с базовыми понятиями и основами биржевой торговли.',
          url: 'https://arapov.trade/ru/freestudying/freeeducation#treyding-dlya-nachinayuschih',
        },
        {
          '@type': 'HowToStep',
          name: 'Изучите технический анализ',
          text: 'Освойте базовые паттерны поведения цены, фигуры разворота , уровни.',
          url: 'https://arapov.trade/ru/freestudying/freeeducation#tehnicheskiy-analiz',
        },
        {
          '@type': 'HowToStep',
          name: 'Погрузитесь в объёмный анализ',
          text: 'Научитесь читать биржевые объемы и познакомьтесь с концепцией Ричарда Вайкоффа.',
          url: 'https://arapov.trade/ru/freestudying/freeeducation#obyomnyy-analiz',
        },
        {
          '@type': 'HowToStep',
          name: 'Освойте стратегию Smart Money',
          text: 'Узнайте, как работают крупные участники рынка и как следовать за ними.',
          url: 'https://arapov.trade/ru/freestudying/freeeducation#smart-money-strategiya',
        },
        {
          '@type': 'HowToStep',
          name: 'Изучите психологию трейдинга',
          text: 'Разберитесь, как контролировать эмоции и мыслить как профи.',
          url: 'https://arapov.trade/ru/freestudying/freeeducation#psihologiya-treydinga',
        },
        {
          '@type': 'HowToStep',
          name: 'Проанализируйте торговые примеры',
          text: 'Разбор сделок поможет понять, как применять теорию на практике.',
          url: 'https://arapov.trade/ru/freestudying/freeeducation#primery-sdelok',
        },
        {
          '@type': 'HowToStep',
          name: 'Ознакомьтесь с часто задаваемыми вопросами',
          text: 'Ответы на распространенные вопросы по курсу и трейдингу.',
          url: 'https://arapov.trade/ru/freestudying/freeeducation#faq',
        },
        {
          '@type': 'HowToStep',
          name: 'Подведите итоги курса',
          text: 'Сделайте для себя ключевые выводы и подготовьтесь к самостоятельной торговле.',
          url: 'https://arapov.trade/ru/freestudying/freeeducation#zaklyuchenie',
        },
      ],
    });
    this.document.head.appendChild(jsonLdScript);
  }

  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
  ngAfterViewInit() {
    // Затримка для забезпечення ініціалізації Angular Material
    setTimeout(() => {
      this.cdr.detectChanges();
      this.cdr.markForCheck();
      // Запускаємо перевірку після рендерингу
    }, 100);
  }
}
