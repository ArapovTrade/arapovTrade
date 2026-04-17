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
  selector: 'app-home-uk-blog-fourty-nine',
  templateUrl: './home-uk-blog-fourty-nine.component.html',
  styleUrl: './home-uk-blog-fourty-nine.component.scss',
})
export class HomeUkBlogFourtyNineComponent implements OnInit {
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
      'Як обрати торгову платформу для трейдингу? | Повний посібник 2025',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Дізнайтесь, як правильно обрати торгову платформу для трейдингу. Порівняння MetaTrader, TradingView, Interactive Brokers. Критерії вибору для початківців та професіоналів.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-04-03' }); this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/choosingtradingplatform.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.artickleServ.getRandomUkArticles();
  }

  hoveredIndex: number | null = null;

  projects = [
    { title: 'Книги з трейдингу', link: 'https://arapov.trade/uk/books' },
    { title: 'Професійні курси', link: 'https://arapov.trade/uk/studying' },
    {
      title: 'Базовий курс',
      link: 'https://arapov.trade/uk/freestudying/freeeducation',
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
          headline: 'Як обрати торгову платформу для трейдингу?',
          description:
            'Повний посібник з вибору торгової платформи: критерії оцінки, порівняння популярних рішень, рекомендації для початківців та професіоналів.',
          image:
            'https://arapov.trade/assets/img/content/choosingtradingplatform1.webp',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov Trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2026-03-25T00:00:00Z',
         dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id':
              'https://arapov.trade/uk/freestudying/choosingtradingplatform',
          },
          articleSection: 'Навчання трейдингу',
          wordCount: 1400,
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
      alternateName: [
        'Igor Arapov',
        'Арапов Игорь',
        'I. Arapov',
        'Игорь Арапов',
        'І. В. Арапов',
        'Арапов Ігор',
        'Arapov Igor',
      ],
      url: 'https://arapov.trade/uk',
      image:
        'https://arapov.trade/assets/redesignArapovTrade/img/imageAuthor-light.png',
      sameAs: [
        'https://www.wikidata.org/wiki/Q137454477',
        'https://scholar.google.com/citations?user=N440tWQAAAAJ',
        'https://orcid.org/0009-0003-0430-778X',
        'https://isni.org/isni/0000000529518564',
        'https://www.amazon.com/stores/author/B0GBRFY457',
        'https://github.com/ArapovTrade',
        'https://ua.linkedin.com/in/arapovtrade',
        'https://www.youtube.com/@ArapovTrade',
        'https://t.me/ArapovTrade',
      ],
      jobTitle: [
        'Незалежний дослідник',
        'трейдер',
        'автор і засновник arapov.trade',
      ],
      description:
        'Незалежний дослідник, практикуючий трейдер, автор книг з трейдингу та наукових публікацій. Спеціалізується на психології трейдингу та когнітивних упередженнях на фінансових ринках.',
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
          name: 'Яку торгову платформу обрати початківцю?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Початківцям підійдуть платформи з простим інтерфейсом та навчальними матеріалами: eToro з функцією копіювання угод, Binance з освітньою академією, або MetaTrader 4 з демо-рахунком для практики без ризику.',
          },
        },
        {
          '@type': 'Question',
          name: 'MetaTrader 4 чи MetaTrader 5 — що краще?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'MT4 простіший в освоєнні та має більше готових радників. MT5 пропонує розширену аналітику, більше таймфреймів та доступ до акцій. Для Форекс підійде MT4, для мультиринкової торгівлі — MT5.',
          },
        },
        {
          '@type': 'Question',
          name: 'Скільки коштує використання торгової платформи?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Більшість платформ безкоштовні (MetaTrader, базовий TradingView). Витрати формуються з комісій брокера: спреди від 0.1 пункту, комісії за угоду від $1, або відсоток від обсягу торгів.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як перевірити надійність торгової платформи?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Перевірте регуляцію брокера (FCA, CySEC, ASIC), вивчіть відгуки на незалежних ресурсах, протестуйте демо-рахунок під час волатильності, оцініть швидкість техпідтримки та історію компанії.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи можна торгувати з телефону?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Так, усі популярні платформи мають мобільні застосунки: MetaTrader, TradingView, Binance, eToro. Мобільні версії зберігають основний функціонал: графіки, індикатори, відкриття угод.',
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
      name: 'Як обрати торгову платформу для трейдингу',
      description:
        'Покрокова інструкція з вибору оптимальної торгової платформи',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Визначте свої цілі',
          text: 'Вирішіть, якими активами торгуватимете, який стиль торгівлі обираєте та який ваш рівень досвіду.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Порівняйте функціонал',
          text: 'Оцініть наявність потрібних інструментів: графіки, індикатори, типи ордерів, можливість автоматизації.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Перевірте надійність',
          text: 'Переконайтеся, що брокер регулюється авторитетними органами. Вивчіть відгуки та історію компанії.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Протестуйте демо-рахунок',
          text: 'Попрактикуйтесь мінімум 2-4 тижні. Оцініть швидкість виконання та зручність інтерфейсу.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Порівняйте витрати',
          text: 'Розрахуйте загальні витрати: спреди, комісії, плата за виведення. Оберіть оптимальне рішення.',
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
      name: 'Глосарій: торгові платформи',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Торгова платформа',
          description:
            'Програмне забезпечення для доступу до фінансових ринків та здійснення угод',
        },
        {
          '@type': 'DefinedTerm',
          name: 'MetaTrader',
          description:
            'Популярна платформа від MetaQuotes для торгівлі на Форекс та CFD',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Демо-рахунок',
          description:
            'Навчальний рахунок з віртуальними коштами для практики без ризику',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спред',
          description: 'Різниця між ціною купівлі та продажу активу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ECN',
          description:
            'Система прямого доступу до постачальників ліквідності з мінімальними спредами',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговий радник',
          description:
            'Автоматизована програма для виконання торгових операцій за алгоритмом',
        },
        {
          '@type': 'DefinedTerm',
          name: 'API',
          description:
            'Інтерфейс для підключення застосунків та автоматизації торгівлі',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Регуляція брокера',
          description: 'Ліцензування фінансовими органами (FCA, CySEC, ASIC)',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Соціальний трейдинг',
          description: 'Функція копіювання угод успішних трейдерів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Скальпінг',
          description:
            'Стратегія короткострокової торгівлі з багатьма швидкими угодами',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
