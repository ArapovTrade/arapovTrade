import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Inject,
  Renderer2,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ThemeservService } from '../../../../../servises/themeserv.service';
import { artickle } from '../../../../../servises/articles.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-three',
  templateUrl: './home-uk-blog-three.component.html',
  styleUrl: './home-uk-blog-three.component.scss',
})
export class HomeUkBlogThreeComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
    private artickleServ: ArticlesService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
  ) {}
  private routerSubscription!: Subscription;
  private themeSubscription!: Subscription;
  isDark!: boolean;
  ukrGroups: any = [];
  grr!: any;
  checkedGroup!: any;

  readonly panelOpenState = signal(false);

  ngOnInit(): void {
    this.removeSelectedSchemas();
    this.setArticleSchema();
    this.setPersonSchema();
    this.setFaqSchema();
    this.setHowToSchema();
    this.setGlossarySchema();

    this.themeSubscription = this.themeService.getTheme().subscribe((data) => {
      this.isDark = data;
      this.cdr.detectChanges();
    });

    this.ukrGroups = this.artickleServ.getUkrainianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;
    this.titleService.setTitle(
      'Волатильність ринку: вимірювання та торгові стратегії | Arapov.trade',
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({
      name: 'description',
      content:
        'Волатильність ринку: повний посібник з вимірювання цінових коливань за допомогою індикатора ATR та практичного застосування в торгівлі',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-03-31' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/volatility44.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.artickleServ.getRandomUkArticles();
  }

  hoveredIndex: number | null = null;

  projects = [
    { title: 'Швидкий старт', link: 'https://arapov.education/ua/course-ua/' },
    {
      title: 'Вступ до трейдингу',
      link: 'https://arapov.education/ua/reg-workshop-ua/',
    },
    { title: 'Професійні курси', link: 'https://arapov.trade/uk/studying' },
    {
      title: 'Базовий курс',
      link: 'https://arapov.trade/uk/freestudying/freeeducation',
    },
    {
      title: 'Копiтрейдинг',
      link: 'https://arapovcopytrade.com/ua/invest-ua/',
    },
  ];

  onGroupChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    this.router.navigate(['/uk/freestudying'], {
      queryParams: { group: value },
    });

    this.checkedGroup = this.artickleServ.selectedGroups;
  }
  paginatedArticles = []; // Статьи для отображения на текущей странице
  currentPage = 0;
  pageSize = 10;

  ngOnDestroy() {
    // Отписка от подписок
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }
  hovered: string | null = null;
  toggleTheme() {
    this.isDark = !this.isDark;
    this.themeService.setTheme(this.isDark);
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  articleCounts: { [key: string]: number } = {};
  updateArticleCounts() {
    this.articleCounts = {}; // очищаем

    this.artickleServ.ukrArtickles.forEach((article) => {
      // article.groupsUkr — это массив, например ['Програмування', 'Маркетинг']
      article.groupsUkr.forEach((group) => {
        if (!this.articleCounts[group]) {
          this.articleCounts[group] = 1;
        } else {
          this.articleCounts[group]++;
        }
      });
    });
  }
  //popup
  flag1: boolean = false;
  flagTrue1: boolean = true;
  searchtoggle(event: Event) {
    this.flag1 = !this.flag1;
    this.flagTrue1 = !this.flagTrue1;
  }

  isFocused = false;
  displayedArticles: artickle[] = [];
  maxResults = 5;
  searchQuery: string = '';

  onFocus() {
    this.isFocused = true;

    // Показываем 5 случайных статей при фокусе, если инпут пуст
    if (!this.searchQuery) {
      const shuffled = [...this.artickleServ.ukrArtickles].sort(
        () => Math.random() - 0.5,
      );
      this.displayedArticles = shuffled.slice(0, this.maxResults);
    }
  }

  onBlur() {
    setTimeout(() => {
      this.isFocused = false;
    }, 150); // таймаут чтобы клик по статье сработал
  }

  onSearchChange() {
    // Логика асинхронного поиска
    const filtered = this.artickleServ.ukrArtickles.filter((a) =>
      a.titleUkr.toLowerCase().includes(this.searchQuery.toLowerCase()),
    );
    this.displayedArticles = filtered.slice(0, this.maxResults);
  }

  moveToTheTop() {
    const element = document.getElementById('scrollToTop');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  groupsMenuOpen = false;
  toggleGroupsMenu(event: Event) {
    this.groupsMenuOpen = !this.groupsMenuOpen;
  }

  goToNextPage() {
    let nextpage: any;
    const path: string =
      this.router.url.split('/')[this.router.url.split('/').length - 1];
    let index = this.artickleServ.ukrArtickles.findIndex(
      (a) => a.linkUkr == path,
    );

    if (this.artickleServ.ukrArtickles.length - 1 == index) {
      nextpage = this.artickleServ.ukrArtickles[0].linkUkr;
    } else {
      nextpage = this.artickleServ.ukrArtickles[index + 1].linkUkr;
    }

    this.router.navigate(['/uk/freestudying', nextpage]);
  }

  goToPreviousPage() {
    let nextpage: any;
    const path: string =
      this.router.url.split('/')[this.router.url.split('/').length - 1];
    let index = this.artickleServ.ukrArtickles.findIndex(
      (a) => a.linkUkr == path,
    );

    if (index == 1) {
      nextpage =
        this.artickleServ.ukrArtickles[
          this.artickleServ.ukrArtickles.length - 1
        ].linkUkr;
    } else {
      nextpage = this.artickleServ.ukrArtickles[index - 1].linkUkr;
    }

    this.router.navigate(['/uk/freestudying', nextpage]);
  }
  private removeSelectedSchemas(): void {
    const typesToRemove = [
      'Article',
      'FAQPage',
      'HowTo',
      'DefinedTermSet',
      'Person',
    ];

    const scripts = this.document.querySelectorAll(
      'script[type="application/ld+json"]',
    );

    scripts.forEach((script) => {
      try {
        const json = JSON.parse(script.textContent || '{}');

        // Массив, объект-граф или одиночный объект
        const candidates =
          json['@graph'] ?? (Array.isArray(json) ? json : [json]);

        const shouldRemove = candidates.some(
          (entry: any) =>
            entry['@type'] && typesToRemove.includes(entry['@type']),
        );

        if (shouldRemove) {
          script.remove();
        }
      } catch {
        /* ignore invalid */
      }
    });
  }

  private addJsonLdSchema(data: any): void {
    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    this.renderer.appendChild(this.document.head, script);
  }

  // ============================================================
  //  ARTICLE
  // ============================================================
  private setArticleSchema(): void {
    const data = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          headline: 'Волатильність ринку: вимірювання та торгові стратегії',
          description:
            'Повний посібник з волатильності фінансових ринків: типи волатильності, індикатор ATR, практичне застосування для управління ризиками',
          image: 'https://arapov.trade/assets/img/content/volatility1.webp',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/volatility',
          },
        },
      ],
    };

    this.addJsonLdSchema(data);
  }

  // ============================================================
  //  PERSON
  // ============================================================
  private setPersonSchema(): void {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://arapov.trade/uk#person',
      name: 'Ігор Арапов',
      url: 'https://arapov.trade/uk',
      image:
        'https://arapov.trade/assets/redesignArapovTrade/img/imageAuthor-light.png',
      sameAs: [
        'https://www.youtube.com/@ArapovTrade',
        'https://t.me/ArapovTrade',
      ],
      jobTitle: 'Професійний трейдер',
      description:
        'Активно торгую на фінансових ринках з 2013 року. Автор безкоштовного курсу з трейдингу.',
    };

    this.addJsonLdSchema(data);
  }

  // ============================================================
  //  FAQ
  // ============================================================
  private setFaqSchema(): void {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Що таке волатильність у трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Волатильність — це ступінь мінливості ціни активу за визначений період. Висока волатильність означає значні цінові коливання, низька — стабільну поведінку ціни.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як працює індикатор ATR?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'ATR (Average True Range) вимірює середній істинний діапазон цінових коливань, враховуючи гепи. Істинний діапазон — максимум з різниці максиму|ÿму-мініму|ÿму та відхилень від попереднього закриття.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як використовувати ATR для стоп-лосу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Типовий підхід — встановлення стоп-лосу на відстані 1.5-3 значень ATR від точки входу. Це дозволяє врахувати поточну волатильність та уникнути передчасного спрацювання стопу.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чим відрізняється історична волатильність від імпліцитної?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Історична волатильність розраховується за минулими цінами, імпліцитна — витягується з цін опціонів та відображає очікування ринку щодо майбутніх коливань.',
          },
        },
        {
          '@type': 'Question',
          name: 'На якому ринку найвища волатильність?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Криптовалютний ринок відрізняється найвищою волатильністю — денні коливання 10-20% не рідкість. Форекс відносно стабільний, фондовий ринок демонструє секторальну диференціацію.',
          },
        },
      ],
    };

    this.addJsonLdSchema(data);
  }

  // ============================================================
  //  HOWTO
  // ============================================================
  private setHowToSchema(): void {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'Як застосовувати ATR у торгівлі',
      description:
        'Покрокове керівництво з використання індикатора ATR для управління ризиками та визначення торгових параметрів',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Налаштуйте ATR на графіку',
          text: 'Додайте індикатор ATR на графік з періодом 14. Для короткострокової торгівлі використовуйте менший період, для довгострокової — більший.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Визначте поточний рівень волатильності',
          text: 'Порівняйте поточне значення ATR з історичним середнім. Високе значення вказує на активний ринок, низьке — на консолідацію.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Розрахуйте стоп-лос',
          text: 'Встановіть стоп-лос на відстані 1.5-3 ATR від точки входу. Використовуйте більший множник для волатильних інструментів.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Визначте цільовий прибуток',
          text: 'Встановіть тейк-профіт як кратне ATR — зазвичай 2-4 значення від точки входу залежно від стратегії.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Розрахуйте розмір позиції',
          text: 'Нормалізуйте ризик між інструментами: активи з високим ATR отримують менший розмір позиції для підтримання постійного грошового ризику.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }

  // ============================================================
  //  GLOSSARY
  // ============================================================
  private setGlossarySchema(): void {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'DefinedTermSet',
      name: 'Глосарій термінів волатильності',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Волатильність',
          description:
            'Ступінь мінливості ціни активу, що відображає інтенсивність цінових коливань',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ATR',
          description:
            'Average True Range — індикатор середнього істинного діапазону для вимірювання волатильності',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Істинний діапазон',
          description:
            'Максимальне значення з трьох величин: High-Low, |High-Close_prev|, |Low-Close_prev|',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Історична волатильність',
          description:
            'Волатильність, розрахована на основі минулих цінових даних',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Імпліцитна волатильність',
          description:
            'Очікувана волатильність, витягнута з цін опціонних контрактів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'VIX',
          description:
            'Індекс волатильності, що вимірює очікування ринку опціонів на S&P 500',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Смуги Боллінджера',
          description:
            'Індикатор волатильності у вигляді каналу навколо ковзної середньої',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стандартне відхилення',
          description: 'Статистична міра розкиду значень відносно середнього',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Динамічний стоп-лос',
          description:
            'Захисний рівень, що адаптується до поточної волатильності ринку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Режим волатильності',
          description:
            'Поточний стан ринку з точки зору інтенсивності цінових коливань',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
