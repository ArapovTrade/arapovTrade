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
  selector: 'app-home-uk-blog-eleven',
  templateUrl: './home-uk-blog-eleven.component.html',
  styleUrl: './home-uk-blog-eleven.component.scss',
})
export class HomeUkBlogElevenComponent implements OnInit {
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
      'Стартовий депозит трейдера: який капітал потрібен для початку торгівлі',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Дізнайтеся, який стартовий депозит потрібен для початку торгівлі на Форекс, фондовому ринку та криптовалютах. Практичний посібник з вибору оптимального розміру капіталу для трейдингу.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-01' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/starterdeposit.webp',
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
            'Стартовий депозит трейдера: який капітал потрібен для початку торгівлі',
          description:
            'Практичний посібник з визначення оптимального розміру стартового депозиту для торгівлі на фінансових ринках',
          image: 'https://arapov.trade/assets/img/content/starterdeposit1.webp',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Pair Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
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
          name: 'Який мінімальний депозит потрібен для початку торгівлі на Форекс?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для початку торгівлі на Форекс рекомендується мати мінімум 300-500 доларів. Це дозволяє дотримуватися правил ризик-менеджменту та ризикувати не більше 1-2% від депозиту в кожній угоді.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому не можна починати торгівлю з 10-50 доларів?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'З мінімальним депозитом у 10-50 доларів неможливо дотримуватися базових правил управління ризиками. Комісії, спреди та мінімальні розміри лотів роблять торгівлю з таким капіталом нерентабельною.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як розрахувати оптимальний розмір стартового депозиту?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Оптимальний депозит розраховується виходячи з правила: ризик на угоду не більше 1-2% від капіталу.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи варто використовувати позикові кошти для формування депозиту?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Категорично не рекомендується використовувати позикові кошти для трейдингу. Це створює додатковий психологічний тиск.',
          },
        },
        {
          '@type': 'Question',
          name: 'Коли можна збільшувати розмір торгового депозиту?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Збільшувати депозит рекомендується лише після досягнення стабільної прибутковості протягом мінімум 3-6 місяців.',
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
      name: 'Як визначити оптимальний розмір стартового депозиту',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Визначте комфортну суму втрат',
          text: 'Встановіть максимальну суму, яку ви готові втратити без шкоди для фінансового становища.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Оберіть торгову стратегію',
          text: 'Визначте стиль торгівлі: скальпінг потребує більше капіталу через комісії.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Розрахуйте мінімальний депозит',
          text: 'Поділіть середній стоп-лос на 0.01-0.02 (1-2% ризику).',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Протестуйте на демо-рахунку',
          text: 'Проведіть 2-3 тижні торгівлі на демо-рахунку.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Почніть з мінімальної суми',
          text: 'При переході на реальний рахунок почніть із мінімальної суми.',
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
      name: 'Глосарій термінів',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Стартовий депозит',
          description: 'Початкова сума грошових коштів для торгових операцій.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ризик-менеджмент',
          description: 'Система управління ризиками в трейдингу.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кредитне плече',
          description: 'Механізм маржинальної торгівлі.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спред',
          description: 'Різниця між ціною купівлі та продажу.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Просадка',
          description: 'Тимчасове зниження торгового капіталу.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маржа',
          description: 'Заставні кошти брокера.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Демо-рахунок',
          description: 'Навчальний торговий рахунок.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильність',
          description: 'Ступінь мінливості ціни.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
