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
  selector: 'app-home-ru-blog-sixty',
  templateUrl: './home-ru-blog-sixty.component.html',
  styleUrl: './home-ru-blog-sixty.component.scss',
})
export class HomeRuBlogSixtyComponent implements OnInit {
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
      'Трейдинг vs опционы: что выбрать трейдеру | ArapovTrade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Трейдинг vs опционы: сравнение двух подходов к торговле на финансовых рынках. Узнайте ключевые различия, преимущества и недостатки каждого инструмента для начинающих и опытных трейдеров.',
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
            'https://arapov.trade/ru/freestudying/tradingvsoptions#article',
          headline: 'Трейдинг vs опционы: что выбрать трейдеру',
          description:
            'Сравнение трейдинга и опционов: ключевые различия, преимущества и недостатки каждого инструмента для начинающих и опытных трейдеров.',
          image:
            'https://arapov.trade/assets/img/content/tradingvsoptions1.webp',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
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
            '@id': 'https://arapov.trade/ru/freestudying/tradingvsoptions',
          },
          articleSection: 'Трейдинг',
          keywords: [
            'трейдинг',
            'опционы',
            'сравнение инструментов',
            'инвестиции',
            'торговые стратегии',
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
      '@id': 'https://arapov.trade/ru/freestudying/tradingvsoptions#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Что лучше для новичка: трейдинг или опционы?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для новичков рекомендуется начинать с классического трейдинга акциями или валютами. Это позволяет освоить базовые принципы анализа рынка и управления рисками. Опционы требуют понимания сложных концепций, таких как греки и временной распад.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какой капитал нужен для трейдинга и опционов?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Трейдинг можно начать с минимального депозита от 100-500 долларов на Forex или криптобиржах. Для опционов на американском рынке обычно требуется от 2000 долларов, хотя некоторые брокеры позволяют начать с меньших сумм.',
          },
        },
        {
          '@type': 'Question',
          name: 'Где выше риски: в трейдинге или опционах?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'При покупке опционов риск ограничен уплаченной премией. В трейдинге убытки могут превысить первоначальный депозит при использовании кредитного плеча. Однако продажа опционов несёт неограниченные риски.',
          },
        },
        {
          '@type': 'Question',
          name: 'Можно ли совмещать трейдинг и опционы?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Да, многие опытные трейдеры используют оба инструмента. Например, можно торговать акциями и одновременно хеджировать позиции пут-опционами. Это позволяет защитить портфель от неожиданных падений рынка.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое греки в опционах?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Греки — это показатели, измеряющие чувствительность цены опциона к различным факторам: дельта (изменение цены актива), тета (временной распад), вега (волатильность), гамма (скорость изменения дельты). Понимание греков критично для успешной торговли опционами.',
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
      '@id': 'https://arapov.trade/ru/freestudying/tradingvsoptions#howto',
      name: 'Как выбрать между трейдингом и опционами',
      description:
        'Пошаговое руководство по выбору подходящего торгового инструмента в зависимости от ваших целей и опыта.',
      totalTime: 'P7D',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Определите свои цели',
          text: 'Решите, чего вы хотите достичь: регулярного дохода от краткосрочной торговли, долгосрочных инвестиций или хеджирования существующего портфеля.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Оцените свой опыт',
          text: 'Если вы новичок, начните с трейдинга для освоения базовых навыков. Опционы требуют понимания сложных концепций и подходят опытным участникам рынка.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Определите толерантность к риску',
          text: 'Трейдинг с плечом несёт высокие риски, но и потенциально высокую доходность. Покупка опционов ограничивает убытки размером премии.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Изучите доступные инструменты',
          text: 'Откройте демо-счёт у брокера и попробуйте оба инструмента в безрисковой среде. Это поможет понять, какой подход вам ближе.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Начните с малого',
          text: 'Независимо от выбора, начинайте с минимальных сумм. По мере накопления опыта и уверенности постепенно увеличивайте объёмы торговли.',
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
      '@id': 'https://arapov.trade/ru/freestudying/tradingvsoptions#glossary',
      name: 'Глоссарий терминов трейдинга и опционов',
      description:
        'Основные термины, используемые в трейдинге и опционной торговле',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Опцион',
          description:
            'Производный финансовый инструмент, дающий право (но не обязательство) купить или продать актив по заранее определённой цене в определённый срок.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Колл-опцион',
          description:
            'Контракт, дающий покупателю право приобрести базовый актив по фиксированной цене (страйк) до даты экспирации.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Пут-опцион',
          description:
            'Контракт, дающий покупателю право продать базовый актив по фиксированной цене до даты экспирации.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Премия',
          description:
            'Цена, которую покупатель платит продавцу опциона за право исполнения контракта.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Страйк',
          description:
            'Цена исполнения опциона — фиксированная цена, по которой держатель опциона может купить или продать базовый актив.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Экспирация',
          description:
            'Дата истечения срока действия опционного контракта, после которой опцион теряет силу.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Дельта',
          description:
            'Показатель чувствительности цены опциона к изменению цены базового актива на один пункт.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тета',
          description:
            'Показатель временного распада опциона — скорость потери стоимости с приближением даты экспирации.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Хеджирование',
          description:
            'Стратегия защиты инвестиционного портфеля от неблагоприятных рыночных движений с помощью производных инструментов.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильность',
          description:
            'Степень изменчивости цены актива. Высокая волатильность увеличивает стоимость опционов.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
