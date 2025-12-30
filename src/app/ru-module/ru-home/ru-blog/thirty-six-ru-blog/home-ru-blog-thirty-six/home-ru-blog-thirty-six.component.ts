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
  selector: 'app-home-ru-blog-thirty-six',
  templateUrl: './home-ru-blog-thirty-six.component.html',
  styleUrl: './home-ru-blog-thirty-six.component.scss',
})
export class HomeRuBlogThirtySixComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
    private artickleServ: ArticlesService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
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

    this.ukrGroups = this.artickleServ.getRussianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;
    this.titleService.setTitle(
      'Криптовалютный рынок: полное руководство по анализу и торговле | Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Полное руководство по анализу криптовалютного рынка: технический и фундаментальный анализ, стратегии торговли, управление рисками и выбор платформы.',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.artickleServ.getRandomUkArticles();
  }

  hoveredIndex: number | null = null;

  projects = [
    { title: 'Быстрый старт', link: 'https://arapov.education/course/' },
    {
      title: 'Введение в трейдинг',
      link: 'https://arapov.education/reg-workshop/',
    },
    {
      title: 'Профессиональные курсы',
      link: 'https://arapov.trade/ru/studying',
    },
    {
      title: 'Базовый курс',
      link: 'https://arapov.trade/ru/freestudying/freeeducation',
    },
    { title: 'Копитрейдинг', link: 'https://arapovcopytrade.com' },
  ];

  onGroupChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    this.router.navigate(['/ru/freestudying'], {
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
      article.groupsRus.forEach((group) => {
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
        () => Math.random() - 0.5
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
      a.titleUkr.toLowerCase().includes(this.searchQuery.toLowerCase())
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
      (a) => a.linkUkr == path
    );

    if (this.artickleServ.ukrArtickles.length - 1 == index) {
      nextpage = this.artickleServ.ukrArtickles[0].linkUkr;
    } else {
      nextpage = this.artickleServ.ukrArtickles[index + 1].linkUkr;
    }

    this.router.navigate(['/ru/freestudying', nextpage]);
  }

  goToPreviousPage() {
    let nextpage: any;
    const path: string =
      this.router.url.split('/')[this.router.url.split('/').length - 1];
    let index = this.artickleServ.ukrArtickles.findIndex(
      (a) => a.linkUkr == path
    );

    if (index == 1) {
      nextpage =
        this.artickleServ.ukrArtickles[
          this.artickleServ.ukrArtickles.length - 1
        ].linkUkr;
    } else {
      nextpage = this.artickleServ.ukrArtickles[index - 1].linkUkr;
    }

    this.router.navigate(['/ru/freestudying', nextpage]);
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
      'script[type="application/ld+json"]'
    );

    scripts.forEach((script) => {
      try {
        const json = JSON.parse(script.textContent || '{}');

        // Массив, объект-граф или одиночный объект
        const candidates =
          json['@graph'] ?? (Array.isArray(json) ? json : [json]);

        const shouldRemove = candidates.some(
          (entry: any) =>
            entry['@type'] && typesToRemove.includes(entry['@type'])
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
            '@id': 'https://arapov.trade/ru/freestudying/cryptocurrencytrading',
          },
          headline: 'Криптотрейдинг: полный гайд для начинающих',
          description:
            'Что такое криптовалюты, как отличить Bitcoin от СКАМ монет, риски мем-коинов и как защитить капитал на крипторынке.',
          image:
            'https://arapov.trade/assets/img/content/cryptocurrencytrading.webp',
          datePublished: '2025-01-15T00:00:00+02:00',
          dateModified: '2025-09-15T00:00:00+02:00',
          inLanguage: 'ru',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov.Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          video: {
            '@type': 'VideoObject',
            name: 'Криптовалюты для новичков | Полное руководство',
            description:
              'Полное руководство по криптовалютам для новичков! Объясняю простыми словами что такое крипта, как отличить Bitcoin от СКАМ монет, почему мем-коины опасны и как избежать потери денег.',
            thumbnailUrl: [
              'https://img.youtube.com/vi/T8zWPUOKcqU/maxresdefault.jpg',
              'https://img.youtube.com/vi/T8zWPUOKcqU/hqdefault.jpg',
            ],
            uploadDate: '2025-09-15T00:00:00+02:00',
            duration: 'PT22M8S',
            contentUrl: 'https://www.youtube.com/watch?v=T8zWPUOKcqU',
            embedUrl: 'https://www.youtube.com/embed/T8zWPUOKcqU',
            inLanguage: 'ru',
            keywords:
              'криптовалюты, биткоин, скам монеты, мем коины, риски криптовалют',
            hasPart: [
              {
                '@type': 'Clip',
                name: 'Что такое криптовалюты - определение и основы',
                startOffset: 0,
                endOffset: 292,
                url: 'https://www.youtube.com/watch?v=T8zWPUOKcqU&t=0',
              },
              {
                '@type': 'Clip',
                name: 'Bitcoin - модель эмиссии и преимущества',
                startOffset: 292,
                endOffset: 630,
                url: 'https://www.youtube.com/watch?v=T8zWPUOKcqU&t=292',
              },
              {
                '@type': 'Clip',
                name: 'Что такое СКАМ криптовалюты - признаки мошенничества',
                startOffset: 630,
                endOffset: 786,
                url: 'https://www.youtube.com/watch?v=T8zWPUOKcqU&t=630',
              },
              {
                '@type': 'Clip',
                name: 'Мем-коины и ловушки для трейдеров',
                startOffset: 786,
                endOffset: 976,
                url: 'https://www.youtube.com/watch?v=T8zWPUOKcqU&t=786',
              },
              {
                '@type': 'Clip',
                name: 'Делистинг монет - как биржи выкидывают скам',
                startOffset: 976,
                endOffset: 1089,
                url: 'https://www.youtube.com/watch?v=T8zWPUOKcqU&t=976',
              },
              {
                '@type': 'Clip',
                name: 'Как защитить деньги на крипторынке',
                startOffset: 1089,
                endOffset: 1328,
                url: 'https://www.youtube.com/watch?v=T8zWPUOKcqU&t=1089',
              },
            ],
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
      '@id': 'https://arapov.trade/ru#person',
      name: 'Игорь Арапов',
      url: 'https://arapov.trade/ru',
      image:
        'https://arapov.trade/assets/redesignArapovTrade/img/imageAuthor-light.png',
      sameAs: [
        'https://www.youtube.com/@ArapovTrade',
        'https://t.me/ArapovTrade',
      ],
      jobTitle: 'Профессиональный трейдер',
      description:
        'Активно торгую на финансовых рынках с 2013 года. Автор бесплатного курса по трейдингу.',
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
          name: 'Что такое криптовалютный рынок?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Криптовалютный рынок — это глобальная децентрализованная экосистема цифровых активов на базе блокчейн. Работает круглосуточно, позволяя торговать без посредников.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие методы анализа криптовалют существуют?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основные методы: фундаментальный анализ (технология, команда, токеномика), технический анализ (индикаторы, уровни) и сентимент-анализ (настроения рынка).',
          },
        },
        {
          '@type': 'Question',
          name: 'Как управлять рисками при торговле криптовалютами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ключевые принципы: стоп-лоссы, риск на сделку до 1-2% капитала, диверсификация портфеля и эмоциональная дисциплина.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какую стратегию выбрать начинающему трейдеру?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Рекомендуется стратегия долгосрочного инвестирования с усреднением стоимости (DCA), снижающая влияние волатильности.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как выбрать криптовалютную биржу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Учитывайте: безопасность (2FA, холодное хранение), ликвидность, комиссии и удобство интерфейса.',
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
      name: 'Как начать торговать криптовалютами',
      description: 'Пошаговое руководство для начинающих трейдеров',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Изучите основы',
          text: 'Освойте принципы блокчейна, основные криптовалюты и терминологию рынка.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Выберите биржу',
          text: 'Зарегистрируйтесь на проверенной платформе с 2FA и высокой ликвидностью.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Разработайте стратегию',
          text: 'Определите цели, уровень риска и стиль торговли.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Настройте риск-менеджмент',
          text: 'Установите стоп-лоссы и диверсифицируйте портфель.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Практикуйтесь',
          text: 'Начните с небольших сумм и ведите торговый журнал.',
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
      name: 'Глоссарий криптотрейдинга',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Блокчейн',
          description: 'Распределённый реестр транзакций криптовалюты',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильность',
          description: 'Степень изменчивости цены актива',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description: 'Ордер на закрытие позиции при убытке',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ликвидность',
          description:
            'Способность актива быстро продаваться без влияния на цену',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Холодный кошелёк',
          description: 'Хранение криптовалют офлайн для безопасности',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Халвинг',
          description: 'Сокращение вознаграждения майнеров вдвое',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Альтсезон',
          description: 'Период опережающего роста альткоинов',
        },
        {
          '@type': 'DefinedTerm',
          name: 'DeFi',
          description: 'Децентрализованные финансы на блокчейне',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стейблкоин',
          description: 'Криптовалюта с привязкой к доллару',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Смарт-контракт',
          description: 'Самоисполняющийся код на блокчейне',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
