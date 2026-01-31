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
  selector: 'app-home-ru-blog-fourty-eight',
  templateUrl: './home-ru-blog-fourty-eight.component.html',
  styleUrl: './home-ru-blog-fourty-eight.component.scss',
})
export class HomeRuBlogFourtyEightComponent implements OnInit {
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
      'Самостоятельное обучение трейдингу: полное руководство для начинающих | Игорь Арапов',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Полное руководство по самостоятельному обучению трейдингу: от базовых понятий до профессиональных стратегий. Практические советы для начинающих трейдеров.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-03' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/selfstudying.webp',
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
          '@id': 'https://arapov.trade/ru/freestudying/selfstudying#article',
          headline:
            'Самостоятельное обучение трейдингу: полное руководство для начинающих',
          description:
            'Полное руководство по самостоятельному обучению трейдингу: от базовых понятий до профессиональных стратегий. Практические советы для начинающих трейдеров.',
          image: 'https://arapov.trade/assets/img/content/selfstudying1.webp',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov Trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/selfstudying',
          },
          articleSection: 'Обучение трейдингу',
          keywords: [
            'самостоятельное обучение',
            'трейдинг для начинающих',
            'как начать торговать',
            'обучение торговле',
            'демо-счёт',
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
      '@id': 'https://arapov.trade/ru/freestudying/selfstudying#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Можно ли научиться трейдингу самостоятельно без курсов?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Да, самостоятельное обучение трейдингу вполне возможно. Многие успешные трейдеры начинали именно так. Главное — систематический подход: изучение терминологии, освоение технического и фундаментального анализа, практика на демо-счёте и постепенный переход к реальной торговле с минимальными суммами.',
          },
        },
        {
          '@type': 'Question',
          name: 'Сколько времени нужно для освоения трейдинга?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Базовые навыки можно освоить за 3-6 месяцев интенсивного обучения. Однако для стабильной прибыльной торговли требуется 1-2 года практики. Скорость обучения зависит от количества времени, которое вы готовы посвящать изучению рынка и анализу своих сделок.',
          },
        },
        {
          '@type': 'Question',
          name: 'С какой суммы лучше начинать торговать?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Рекомендуется начинать с суммы, потерю которой вы можете себе позволить — обычно это $100-500. Сначала отработайте стратегию на демо-счёте минимум 1-2 месяца, затем переходите на реальный счёт с минимальным депозитом, рискуя не более 1-2% капитала на сделку.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какой рынок лучше выбрать для начала?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для начинающих оптимален рынок Форекс благодаря высокой ликвидности, низким спредам и обилию обучающих материалов. Популярные валютные пары вроде EUR/USD имеют предсказуемые движения. После освоения Форекса можно переходить к фондовому рынку или криптовалютам.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как контролировать эмоции в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Контроль эмоций достигается через строгое следование торговому плану, использование стоп-лоссов, ограничение дневных убытков и регулярные перерывы. Важно вести дневник сделок для анализа ошибок и не торговать в состоянии стресса или после серии убытков.',
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
      '@id': 'https://arapov.trade/ru/freestudying/selfstudying#howto',
      name: 'Как самостоятельно научиться трейдингу',
      description:
        'Пошаговое руководство по освоению трейдинга без платных курсов',
      totalTime: 'P6M',
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'USD',
        value: '100-500',
      },
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Изучите базовую терминологию',
          text: 'Освойте ключевые понятия: лонг, шорт, спред, ликвидность, волатильность, маржа, леверидж. Используйте глоссарии авторитетных ресурсов и создайте собственный словарь терминов.',
          url: 'https://arapov.trade/ru/freestudying/selfstudying#terminology',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Освойте методы анализа рынка',
          text: 'Изучите технический анализ (графики, индикаторы, уровни поддержки и сопротивления) и фундаментальный анализ (экономические показатели, новости, отчёты компаний).',
          url: 'https://arapov.trade/ru/freestudying/selfstudying#analysis',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Выберите рынок и инструменты',
          text: 'Определитесь с рынком (Форекс, акции, криптовалюты) и конкретными инструментами для торговли. Начните с одного рынка и наиболее ликвидных активов.',
          url: 'https://arapov.trade/ru/freestudying/selfstudying#markets',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Практикуйтесь на демо-счёте',
          text: 'Откройте демо-счёт у надёжного брокера и отрабатывайте стратегии без риска потери реальных денег минимум 1-2 месяца до достижения стабильных результатов.',
          url: 'https://arapov.trade/ru/freestudying/selfstudying#demo',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Перейдите к реальной торговле',
          text: 'Начните торговать с минимальным депозитом, строго соблюдая риск-менеджмент (1-2% на сделку). Ведите дневник сделок и регулярно анализируйте результаты.',
          url: 'https://arapov.trade/ru/freestudying/selfstudying#real-trading',
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
      '@id': 'https://arapov.trade/ru/freestudying/selfstudying#terms',
      name: 'Термины трейдинга',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Лонг',
          description:
            'Открытие позиции на покупку актива с расчётом на рост его цены',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Шорт',
          description:
            'Открытие позиции на продажу актива с расчётом на падение его цены',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ликвидность',
          description:
            'Способность актива быстро продаваться или покупаться без существенного изменения цены',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спред',
          description:
            'Разница между ценой покупки (Ask) и ценой продажи (Bid) актива',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильность',
          description:
            'Показатель изменчивости цены актива за определённый период времени',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Защитный ордер для автоматического закрытия убыточной позиции при достижении заданного уровня',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тейк-профит',
          description:
            'Ордер для автоматической фиксации прибыли при достижении целевой цены',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Демо-счёт',
          description:
            'Учебный торговый счёт с виртуальными деньгами для отработки навыков без риска',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Риск-менеджмент',
          description:
            'Система управления рисками в торговле для защиты капитала от крупных потерь',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговый план',
          description:
            'Документ с правилами торговли, включающий стратегию, управление капиталом и критерии входа/выхода',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
