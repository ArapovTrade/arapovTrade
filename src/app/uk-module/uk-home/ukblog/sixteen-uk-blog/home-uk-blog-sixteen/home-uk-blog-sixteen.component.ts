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
  selector: 'app-home-uk-blog-sixteen',
  templateUrl: './home-uk-blog-sixteen.component.html',
  styleUrl: './home-uk-blog-sixteen.component.scss',
})
export class HomeUkBlogSixteenComponent implements OnInit {
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
      'Трендові канали у трейдингу: побудова та торгові стратегії | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Трендові канали у трейдингу: детальний посібник з побудови, типів та торгових стратегій. Дізнайтеся, як застосовувати цінові канали для прибуткової торгівлі на Форекс, акціях та криптовалютах.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/trandingchannels.webp',
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
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/trandingchannels',
          },
          headline:
            'Трендові канали у трейдингу: детальний посібник з побудови та торгових стратегій',
          description:
            'Повний посібник з трендових каналів: різновиди каналів, методи побудови, торгові стратегії та практичні поради для трейдерів усіх рівнів підготовки.',
          image:
            'https://arapov.trade/assets/img/content/trandingchannels.webp',

          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
            url: 'https://arapov.trade',
            description:
              "Безкоштовне навчання трейдингу: Smart Money, об'ємний аналіз, метод Вайкоффа",
          },
          articleSection: 'Технічний аналіз',
          keywords: [
            'трендові канали',
            'ціновий канал',
            'технічний аналіз',
            'лінія підтримки',
            'лінія опору',
            'торгова стратегія',
          ],
          wordCount: 1680,
          inLanguage: 'uk',
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
          name: 'Що являє собою трендовий канал у трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Трендовий канал — це аналітичний інструмент технічного аналізу, утворений двома паралельними лініями, що обмежують рух ціни. Нижня межа (підтримка) з'єднує локальні мінімуми, верхня (опір) — максимуми. Канали допомагають визначити напрямок тренду та знайти оптимальні точки входу.",
          },
        },
        {
          '@type': 'Question',
          name: 'Які різновиди трендових каналів існують?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Розрізняють три базові типи: висхідний канал (бичачий тренд із зростаючими максимумами та мінімумами), низхідний канал (ведмежий тренд зі спадними екстремумами) та бічний канал (флет — горизонтальний рух ціни в обмеженому діапазоні).',
          },
        },
        {
          '@type': 'Question',
          name: 'Як коректно побудувати трендовий канал?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Для висхідного каналу: визначте два послідовні мінімуми (другий вище першого), з'єднайте їх лінією підтримки, потім проведіть паралельну лінію опору через максимум між ними. Для низхідного — аналогічно, але починайте з максимумів.",
          },
        },
        {
          '@type': 'Question',
          name: 'Які стратегії торгівлі застосовують із трендовими каналами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Дві основні стратегії: торгівля всередині каналу (купівля біля підтримки, продаж біля опору) та торгівля на пробій (вхід після закриття свічки за межею каналу з підтвердженням об'ємом). Досвідчені трейдери комбінують обидва підходи.",
          },
        },
        {
          '@type': 'Question',
          name: 'На яких таймфреймах трендові канали працюють найкраще?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Найнадійніші сигнали дають старші таймфрейми: денний (D1), тижневий (W1) та місячний (MN). Вони фільтрують ринковий шум і показують значущі рухи. Молодші таймфрейми (M5, H1) підходять для скальпінгу, але потребують додаткового підтвердження.',
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
      name: 'Як побудувати та використовувати трендовий канал',
      description:
        'Покрокова інструкція з побудови трендового каналу та його застосування у торгівлі',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Визначте напрямок тренду',
          text: 'Проаналізуйте графік і визначте, чи формує ціна зростаючі максимуми та мінімуми (висхідний тренд), спадні (низхідний) чи рухається горизонтально (бічний).',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Знайдіть ключові точки',
          text: 'Для висхідного тренду знайдіть мінімум два послідовні мінімуми, де другий вище першого. Для низхідного — два максимуми, де другий нижче першого.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Побудуйте основну лінію',
          text: "З'єднайте знайдені точки прямою лінією. У висхідному каналі це лінія підтримки (по мінімумах), у низхідному — лінія опору (по максимумах).",
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Проведіть паралельну лінію',
          text: 'Знайдіть екстремум між опорними точками і проведіть через нього лінію, паралельну основній. Переконайтеся, що лінії утворюють чіткий канал.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Застосовуйте канал у торгівлі',
          text: "Використовуйте межі каналу для входів: купуйте біля підтримки у висхідному тренді, продавайте біля опору у низхідному. При пробої межі з об'ємом входьте за напрямком пробою.",
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
      name: 'Глосарій термінів трендових каналів',
      description:
        "Ключові терміни, пов'язані з трендовими каналами в технічному аналізі",
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Трендовий канал',
          description:
            'Інструмент технічного аналізу з двох паралельних ліній, що обмежують рух ціни в межах тренду',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Лінія підтримки',
          description:
            "Нижня межа каналу, що з'єднує локальні мінімуми ціни, де покупці активізуються",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Лінія опору',
          description:
            "Верхня межа каналу, що з'єднує локальні максимуми, де продавці починають домінувати",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Висхідний канал',
          description:
            'Ціновий канал із нахилом вгору, що характеризує бичачий тренд зі зростаючими максимумами та мінімумами',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Низхідний канал',
          description:
            'Ціновий канал із нахилом вниз, що характеризує ведмежий тренд зі спадними екстремумами',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Бічний канал',
          description:
            'Горизонтальний ціновий діапазон без вираженого тренду, також називається флетом або консолідацією',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Пробій каналу',
          description:
            'Вихід ціни за межу каналу із закриттям свічки за лінією, що сигналізує про можливу зміну тренду',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ретест рівня',
          description:
            'Повернення ціни до пробитої лінії каналу для її тестування перед продовженням руху',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Точка дотику',
          description:
            'Момент, коли ціна досягає межі каналу та відскакує, підтверджуючи її значущість',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Хибний пробій',
          description:
            'Короткочасний вихід ціни за межу каналу з подальшим поверненням усередину діапазону',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
