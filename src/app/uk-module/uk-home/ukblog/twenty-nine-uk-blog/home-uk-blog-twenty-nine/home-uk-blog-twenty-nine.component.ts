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
  selector: 'app-home-uk-blog-twenty-nine',
  templateUrl: './home-uk-blog-twenty-nine.component.html',
  styleUrl: './home-uk-blog-twenty-nine.component.scss',
})
export class HomeUkBlogTwentyNineComponent implements OnInit {
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
      'Трейдинг для початківців: повний посібник 2025 | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Повний посібник з трейдингу для початківців 2025. Дізнайтеся як обрати ринок, опанувати технічний аналіз, створити стратегію та почати торгувати з нуля.',
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
          headline:
            'Трейдинг для початківців: повний посібник як почати торгувати у 2025',
          description:
            'Повний посібник з трейдингу для початківців. Дізнайтеся як обрати ринок, опанувати технічний аналіз, створити стратегію та почати торгувати з нуля.',
          image:
            'https://arapov.trade/assets/img/content/tradingquickstart1.webp',
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
            '@id': 'https://arapov.trade/uk/freestudying/tradingquickstart',
          },
          articleSection: 'Навчання трейдингу',
          keywords: [
            'трейдинг для початківців',
            'як почати торгувати',
            'технічний аналіз',
            'торгові стратегії',
          ],
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
          name: 'Скільки грошей потрібно для початку трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Розпочати трейдинг можна з мінімальної суми від 10-50 доларів на криптовалютних біржах або від 100-200 доларів на Форекс. Проте для комфортної торгівлі рекомендується стартовий капітал від 500-1000 доларів.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи можна заробити на трейдингу без досвіду?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Трейдинг без підготовки майже гарантовано призведе до втрат. Необхідно спочатку вивчити основи технічного аналізу, протестувати стратегії на демо-рахунку та опанувати управління ризиками.',
          },
        },
        {
          '@type': 'Question',
          name: 'Який ринок краще обрати новачку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для новачків оптимальний фондовий ринок завдяки його стабільності. Криптовалютний ринок підходить тим, хто готовий до високої волатильності. Форекс приваблює низьким порогом входу та високою ліквідністю.',
          },
        },
        {
          '@type': 'Question',
          name: 'Скільки часу займає навчання трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Базове розуміння ринку можна отримати за 2-3 місяці активного навчання. Для формування стійких навичок потрібно від 6 місяців до 2 років практики. Професійний рівень досягається через 3-5 років.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке демо-рахунок і навіщо він потрібен?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Демо-рахунок — це тренувальний рахунок з віртуальними грошима, який повністю імітує реальну торгівлю. Він дозволяє вивчити платформу та протестувати стратегії без ризику втрати реальних коштів.',
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
      name: 'Як почати торгувати на фінансових ринках',
      description: 'Покроковий посібник для трейдерів-початківців',
      totalTime: 'P3M',
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'USD',
        value: '100-500',
      },
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Оберіть відповідний ринок',
          text: 'Визначте, який ринок відповідає вашим цілям: фондовий для стабільності, криптовалюти для волатильності або Форекс для цілодобової торгівлі.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Вивчіть базову термінологію',
          text: 'Опануйте ключові поняття: ліквідність, волатильність, спред, леверидж. Вивчіть основи технічного аналізу.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Відкрийте демо-рахунок',
          text: 'Зареєструйтесь у надійного брокера та тестуйте стратегії без ризику мінімум 2-3 місяці.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Розробіть торгову стратегію',
          text: 'Створіть торговий план з чіткими правилами входу та виходу. Визначте розмір ризику на угоду.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Переходьте до реальної торгівлі',
          text: 'Після стабільних результатів на демо відкрийте реальний рахунок з мінімальним депозитом.',
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
      name: 'Глосарій трейдингу для початківців',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Трейдинг',
          description:
            'Процес активної торгівлі на фінансових ринках з метою отримання прибутку від змін цін на активи.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ліквідність',
          description:
            'Здатність активу швидко продаватися за ринковою ціною без суттєвого впливу на вартість.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильність',
          description: 'Ступінь мінливості ціни активу за певний період часу.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спред',
          description: 'Різниця між ціною купівлі та ціною продажу активу.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Леверидж',
          description:
            'Кредитне плече, що дозволяє торгувати сумами більшими за власний капітал.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лос',
          description:
            'Захисний ордер, що автоматично закриває позицію при досягненні заданого рівня збитку.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Технічний аналіз',
          description:
            'Метод прогнозування руху цін на основі вивчення графіків та індикаторів.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Свінг-трейдинг',
          description:
            'Стиль торгівлі з утриманням позицій від декількох днів до тижнів.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Скальпінг',
          description:
            'Стратегія короткострокової торгівлі з безліччю швидких угод.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Демо-рахунок',
          description: 'Навчальний торговий рахунок з віртуальними коштами.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
