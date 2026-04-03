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
  selector: 'app-home-ru-blog-fifty-eight',
  templateUrl: './home-ru-blog-fifty-eight.component.html',
  styleUrl: './home-ru-blog-fifty-eight.component.scss',
})
export class HomeRuBlogFiftyEightComponent implements OnInit {
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

    this.ukrGroups = this.artickleServ.getRussianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;

    this.titleService.setTitle(
      'Усреднение в трейдинге: стратегии, риски и практическое применение | ArapovTrade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Полное руководство по усреднению позиций в трейдинге. Разбираем стратегии DCA, классическое усреднение, антимартингейл. Как избежать ошибок и когда метод работает.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-04' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/averagingintrading.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.artickleServ.getRandomUkArticles();
  }

  hoveredIndex: number | null = null;

  projects = [
    { title: 'Книги по трейдингу', link: 'https://arapov.trade/ru/books' },
    {
      title: 'Профессиональные курсы',
      link: 'https://arapov.trade/ru/studying',
    },
    {
      title: 'Базовый курс',
      link: 'https://arapov.trade/ru/freestudying/freeeducation',
    },
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

    this.router.navigate(['/ru/freestudying', nextpage]);
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
          '@id':
            'https://arapov.trade/ru/freestudying/averagingintrading#article',
          headline:
            'Усреднение в трейдинге: стратегии, риски и практическое применение',
          description:
            'Полное руководство по усреднению позиций в трейдинге. Разбираем стратегии DCA, классическое усреднение, антимартингейл.',
          image:
            'https://arapov.trade/assets/img/content/averagingintrading1.webp',
          datePublished: '2026-03-25T00:00:00Z',
          dateModified: '2026-03-31T00:00:00Z',

          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'ArapovTrade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/averagingintrading',
          },
          articleSection: 'Трейдинг для начинающих',
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
      '@id': 'https://arapov.trade/ru#person',
      name: 'Игорь Арапов',
      alternateName: [
        'Igor Arapov',
        'Арапов Игорь',
        'I. Arapov',
        'Ігор Арапов',
        'І. В. Арапов',
        'Арапов Ігор',
        'Arapov Igor',
      ],
      url: 'https://arapov.trade/ru',
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
        'Независимый исследователь',
        'трейдер',
        'автор и основатель arapov.trade',
      ],
      description:
        'Независимый исследователь, практикующий трейдер, автор книг по трейдингу и научных публикаций. Специализируется на психологии трейдинга и когнитивных искажениях на финансовых рынках.',
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
      '@id': 'https://arapov.trade/ru/freestudying/averagingintrading#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Что такое усреднение в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Усреднение — это метод управления позицией, при котором трейдер добавляет объём к существующей сделке по мере движения цены. Цель — снизить среднюю цену входа и улучшить точку безубыточности.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем отличается DCA от классического усреднения?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'DCA (Dollar Cost Averaging) предполагает регулярные покупки на фиксированную сумму независимо от цены. Классическое усреднение — добавление к позиции при движении против трейдера. DCA снижает эмоциональную нагрузку и подходит для долгосрочных инвестиций.',
          },
        },
        {
          '@type': 'Question',
          name: 'Когда усреднение опасно?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Усреднение особенно рискованно в сильных трендах, при торговле с высоким плечом и без чёткого плана выхода. Если актив продолжает падать без признаков разворота, каждое усреднение увеличивает убытки.',
          },
        },
        {
          '@type': 'Question',
          name: 'Сколько раз можно усреднять позицию?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Профессиональные трейдеры ограничивают усреднение 2-3 добавлениями. Каждое усреднение должно быть запланировано заранее с учётом уровней поддержки и общего размера риска на сделку.',
          },
        },
        {
          '@type': 'Question',
          name: 'Подходит ли усреднение для криптовалют?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'DCA хорошо работает для долгосрочного накопления биткоина и эфириума. Классическое усреднение на крипторынке рискованно из-за высокой волатильности — коррекции на 30-50% не редкость.',
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
      '@id': 'https://arapov.trade/ru/freestudying/averagingintrading#howto',
      name: 'Как безопасно применять усреднение в трейдинге',
      description:
        'Пошаговое руководство по грамотному использованию усреднения позиций',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Определите тип рынка',
          text: 'Проанализируйте, находится ли актив в тренде или боковике. Усреднение эффективнее в боковом рынке и на откатах в тренде.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Рассчитайте уровни входа',
          text: 'Определите 2-3 уровня для потенциального усреднения на основе поддержек, Фибоначчи или зон спроса.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Распределите капитал',
          text: 'Разделите выделенный на сделку капитал на части. Типичное распределение: 40% на первый вход, 35% и 25% на усреднения.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Установите стоп-лосс',
          text: 'Определите максимальный убыток для всей позиции. Стоп должен находиться за последним уровнем усреднения.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Зафиксируйте план выхода',
          text: 'Заранее определите цели по прибыли и условия закрытия позиции. Следуйте плану независимо от эмоций.',
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
      '@id': 'https://arapov.trade/ru/freestudying/averagingintrading#terms',
      name: 'Глоссарий терминов усреднения',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Усреднение',
          description:
            'Метод добавления к существующей позиции для улучшения средней цены входа',
        },
        {
          '@type': 'DefinedTerm',
          name: 'DCA (Dollar Cost Averaging)',
          description:
            'Стратегия регулярных покупок на фиксированную сумму независимо от текущей цены актива',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Антимартингейл',
          description:
            'Увеличение позиции после прибыльных сделок, противоположность классическому усреднению',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маржин-колл',
          description:
            'Требование брокера внести дополнительное обеспечение при падении маржи ниже минимума',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кредитное плечо',
          description: 'Соотношение собственных и заёмных средств в торговле',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Уровень поддержки',
          description:
            'Ценовая зона, где спрос превышает предложение и цена склонна отскакивать вверх',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильность',
          description: 'Степень колебания цены актива за определённый период',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Риск-менеджмент',
          description:
            'Система управления рисками для защиты торгового капитала',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Ордер на автоматическое закрытие позиции при достижении заданного уровня убытка',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Точка безубыточности',
          description:
            'Цена, при которой позиция не приносит ни прибыли, ни убытка',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
