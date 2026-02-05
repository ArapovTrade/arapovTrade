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
  selector: 'app-home-uk-blog-thirty-four',
  templateUrl: './home-uk-blog-thirty-four.component.html',
  styleUrl: './home-uk-blog-thirty-four.component.scss',
})
export class HomeUkBlogThirtyFourComponent implements OnInit {
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
      'Що таке стоп-лосс і як його виставляти | ArapovTrade',
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({
      name: 'description',
      content:
        'Повний посібник зі стоп-лосса в трейдингу. Як правильно розрахувати та виставити стоп-лосс, типові помилки, стратегії для різних стилів торгівлі.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-16' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/stoplossmain.png',
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

          headline: 'Що таке стоп-лосс і як його правильно виставляти',
          description:
            'Повний посібник зі стоп-лоссу в трейдингу. Як правильно розрахувати та виставити стоп-лосс, типові помилки, стратегії для різних стилів торгівлі.',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/stoploss',
          },
          image: 'https://arapov.trade/assets/img/content/stoploss1.png',
          inLanguage: 'ru',
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
          name: 'Що таке стоп-лосс?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Стоп-лосс — це автоматичний ордер, який закриває позицію при досягненні ціною встановленого рівня збитку для захисту капіталу.',
          },
        },
        {
          '@type': 'Question',
          name: 'Який відсоток ризику оптимальний?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Оптимальний ризик становить 1-2% від депозиту на одну угоду.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як розрахувати стоп-лосс з ATR?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Стоп-лосс встановлюється на відстані 1.5-2 ATR від точки входу.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке трейлінг-стоп?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Трейлінг-стоп — динамічний стоп-лосс, що рухається за ціною в прибутковому напрямку.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому не можна переносити стоп-лосс?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Перенос стоп-лосса в збиткову сторону порушує торговий план і може призвести до катастрофічних втрат.',
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
      name: 'Як правильно виставити стоп-лосс',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Визначте ризик',
          text: 'Встановіть максимальний відсоток ризику 1-2% від депозиту.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Знайдіть технічний рівень',
          text: 'Визначте найближчий рівень підтримки або опору.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Врахуйте волатильність',
          text: 'Використовуйте ATR для оптимальної відстані.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Розрахуйте позицію',
          text: 'Вирахуйте обсяг так, щоб збиток не перевищував допустимий ризик.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Перевірте Risk/Reward',
          text: 'Потенційний прибуток має бути мінімум вдвічі більший за ризик.',
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
      name: 'Терміни стоп-лосса',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Захисний ордер для автоматичного закриття позиції при збитку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тейк-профіт',
          description: 'Ордер для автоматичної фіксації прибутку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ATR',
          description: 'Індикатор середньої волатильності активу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Трейлінг-стоп',
          description: 'Динамічний стоп-лосс, що слідує за ціною',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Risk/Reward',
          description: 'Співвідношення ризику до потенційного прибутку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Прослизання',
          description: 'Різниця між очікуваною та фактичною ціною виконання',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Рівень підтримки',
          description: 'Рівень, де очікується зупинка падіння ціни',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Рівень опору',
          description: 'Рівень, де очікується зупинка зростання ціни',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильність',
          description: 'Ступінь мінливості ціни активу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ризик-менеджмент',
          description: 'Система управління ризиками для захисту капіталу',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
