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
  selector: 'app-home-ru-blog-fourty-one',
  templateUrl: './home-ru-blog-fourty-one.component.html',
  styleUrl: './home-ru-blog-fourty-one.component.scss',
})
export class HomeRuBlogFourtyOneComponent implements OnInit {
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
      'Правила успешного трейдинга: полное руководство | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Правила успешного трейдинга: торговая стратегия, риск-менеджмент, эмоциональная дисциплина. Полное руководство для прибыльной торговли на финансовых рынках.',
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
          '@id':
            'https://arapov.trade/ru/freestudying/successfultrading#article',
          headline: 'Правила успешного трейдинга: полное руководство',
          description:
            'Комплексное руководство по успешному трейдингу: выбор стратегии, управление рисками, контроль эмоций, выбор брокера.',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          image:
            'https://arapov.trade/assets/img/content/successfultrading1.webp',
          articleSection: 'Обучение трейдингу',
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
      '@id': 'https://arapov.trade/ru/freestudying/successfultrading#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Какую торговую стратегию выбрать новичку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Новичкам рекомендуется начинать со свинг-трейдинга на дневных графиках. Эта стратегия требует меньше времени у экрана, даёт больше времени на анализ и принятие решений.',
          },
        },
        {
          '@type': 'Question',
          name: 'Сколько капитала рисковать на одну сделку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Профессиональное правило: риск не более 1-2% от депозита на сделку. При депозите 10000$ максимальный убыток на сделку — 100-200$.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему важен торговый журнал?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Торговый журнал выявляет паттерны ошибок, помогает анализировать эффективность стратегии и контролировать эмоциональное состояние во время торговли.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как выбрать надёжного брокера?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Проверяйте наличие лицензии регулятора (FCA, CySEC), изучайте отзывы, тестируйте платформу на демо-счёте, сравнивайте спреды и комиссии.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как контролировать эмоции в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Торгуйте строго по плану, используйте фиксированный риск, делайте перерывы после убытков, ведите дневник эмоций. Медитация и физическая активность также помогают.',
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
      '@id': 'https://arapov.trade/ru/freestudying/successfultrading#howto',
      name: 'Как стать успешным трейдером',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Выберите торговую стратегию',
          text: 'Определите стиль торговли: скальпинг, дейтрейдинг, свинг или позиционная торговля. Учитывайте свой темперамент и доступное время.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Внедрите риск-менеджмент',
          text: 'Установите правило 1-2% риска на сделку. Всегда используйте стоп-лоссы. Соблюдайте соотношение риск/прибыль минимум 1:2.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Освойте анализ рынка',
          text: 'Изучите технический и фундаментальный анализ. Комбинируйте методы для подтверждения сигналов.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Развивайте дисциплину',
          text: 'Торгуйте строго по плану. Ведите торговый журнал. Контролируйте эмоции.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Постоянно обучайтесь',
          text: 'Анализируйте сделки, изучайте новые методики, адаптируйтесь к изменениям рынка.',
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
      '@id': 'https://arapov.trade/ru/freestudying/successfultrading#glossary',
      name: 'Глоссарий трейдинга',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Риск-менеджмент',
          description:
            'Система управления торговыми рисками через контроль размера позиций и стоп-лоссов.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Защитный ордер для автоматического закрытия убыточной позиции.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тейк-профит',
          description:
            'Ордер для автоматической фиксации прибыли при достижении целевой цены.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Свинг-трейдинг',
          description:
            'Стиль торговли с удержанием позиций от нескольких дней до недель.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Скальпинг',
          description: 'Краткосрочная торговля с множеством сделок за сессию.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Таймфрейм',
          description:
            'Временной интервал для отображения ценовых данных на графике.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спред',
          description: 'Разница между ценой покупки и продажи актива.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кредитное плечо',
          description:
            'Инструмент для увеличения торгового объёма за счёт заёмных средств.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговый журнал',
          description:
            'Записи о сделках для анализа эффективности торговой системы.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Risk-to-Reward',
          description:
            'Соотношение потенциального убытка к потенциальной прибыли в сделке.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
