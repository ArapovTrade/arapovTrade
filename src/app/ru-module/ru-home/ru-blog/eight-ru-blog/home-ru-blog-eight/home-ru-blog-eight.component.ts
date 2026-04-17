import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Inject,
  Renderer2,
  signal,
} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {ThemeservService} from '../../../../../servises/themeserv.service';
import {artickle} from '../../../../../servises/articles.service';
import {Subscription} from 'rxjs';
import {NavigationEnd, Router} from '@angular/router';
import {Meta, Title} from '@angular/platform-browser';
import {ArticlesService} from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-eight',
  templateUrl: './home-ru-blog-eight.component.html',
  styleUrl: './home-ru-blog-eight.component.scss',
})
export class HomeRuBlogEightComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
    private artickleServ: ArticlesService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
  ) {
  }

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
      'Имбаланс в Трейдинге: Полное Руководство | Arapov.trade',
    );
    this.meta.updateTag({name: 'robots', content: 'index, follow'});
    this.meta.updateTag({name: 'datePublished', content: '2025-01-30'});
    this.meta.updateTag({name: 'dateModified', content: '2026-04-15'});
    this.meta.updateTag({
      name: 'description',
      content:
        'Имбаланс в трейдинге — полное руководство по дисбалансу спроса и предложения. Методы определения зон имбаланса, объёмный анализ, стратегии торговли.',
    });

    this.gerRandom();
  }

  randomArticleRus: any = [];

  gerRandom() {
    this.randomArticleRus = this.artickleServ.getRandomUkArticles();
  }

  hoveredIndex: number | null = null;

  projects = [
    {title: 'Книги по трейдингу', link: 'https://arapov.trade/ru/books'},
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
      queryParams: {group: value},
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
      element.scrollIntoView({behavior: 'smooth', block: 'start'});
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
            'https://arapov.trade/ru/freestudying/imbalanceintrading#article',
          headline:
            'Имбаланс в Трейдинге: Полное Руководство по Дисбалансу Спроса и Предложения',
          description:
            'Комплексное руководство по имбалансу: виды дисбаланса, методы определения зон, объёмный анализ, стратегии торговли и управление рисками.',
          image:
            'https://arapov.trade/assets/img/content/imbalanceintrading3.png',
          author: {'@id': 'https://arapov.trade/ru#person'},
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
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
            '@id': 'https://arapov.trade/ru/freestudying/imbalanceintrading',
          },
          articleSection: 'Трейдинг',
          keywords: [
            'имбаланс',
            'дисбаланс',
            'ликвидность',
            'Volume Profile',
            'объёмный анализ',
          ],
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
      '@id': 'https://arapov.trade/ru/freestudying/imbalanceintrading#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Что такое имбаланс в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Имбаланс — это диспропорция между рыночным спросом и предложением, вызывающая неравномерное распределение ликвидности и значительное ценовое движение в одном направлении. Он формируется как разница между объёмами покупок и продаж на конкретном уровне.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие виды имбаланса существуют?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Выделяют три основных вида: локальный имбаланс (краткосрочный дисбаланс), структурный имбаланс (долгосрочное преобладание одной стороны) и имбаланс ликвидности (манипуляции крупных игроков для сбора стоп-ордеров).',
          },
        },
        {
          '@type': 'Question',
          name: 'Как определить зоны имбаланса?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Зоны имбаланса определяются через Market Profile, Delta Volume, Footprint Charts и Order Flow. Эти инструменты показывают распределение объёмов, разницу между покупателями и продавцами, а также потоки заявок.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему цена возвращается в зону имбаланса?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'После сильного импульсного движения в зоне дисбаланса остаётся незаполненная ликвидность. Рынок стремится к балансу, поэтому цена часто возвращается для ретеста этих уровней перед продолжением движения.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как торговать по зонам имбаланса?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Определите зону резкого движения без откатов, дождитесь возврата цены в эту область, найдите подтверждающие сигналы (объёмы, свечные паттерны) и откройте позицию в направлении основного тренда с стоп-лоссом за зоной.',
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
      '@id': 'https://arapov.trade/ru/freestudying/imbalanceintrading#howto',
      name: 'Как торговать по имбалансу',
      description:
        'Пошаговое руководство по торговле на основе рыночного дисбаланса',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Определение зоны дисбаланса',
          text: 'Найдите на графике область резкого импульсного движения без значительных коррекций. Используйте Volume Profile или Footprint Charts для подтверждения.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Анализ объёмов',
          text: 'Проанализируйте Delta Volume для определения преобладания покупателей или продавцов. Высокие объёмы подтверждают значимость зоны.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Ожидание ретеста',
          text: 'Дождитесь возврата цены в зону имбаланса. Не входите на первом касании — ищите подтверждающие сигналы разворота.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Подтверждение входа',
          text: 'Используйте свечные паттерны, увеличение объёма или реакцию цены на уровень для подтверждения точки входа в позицию.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Управление рисками',
          text: 'Разместите стоп-лосс за пределами зоны имбаланса. Целевая прибыль — следующий значимый уровень. Соотношение риска к прибыли минимум 1:2.',
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
      '@id': 'https://arapov.trade/ru/freestudying/imbalanceintrading#glossary',
      name: 'Глоссарий терминов имбаланса',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Имбаланс',
          description:
            'Диспропорция между спросом и предложением, вызывающая неравномерное распределение ликвидности',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volume Profile',
          description:
            'Инструмент показывающий распределение объёма торгов по ценовым уровням',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Delta Volume',
          description:
            'Разница между объёмами покупок и продаж на ценовом уровне',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Footprint Charts',
          description:
            'График визуализирующий сделки внутри свечи с детализацией по объёмам',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Order Flow',
          description:
            'Анализ потоков заявок показывающий активность участников рынка',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Market Profile',
          description:
            'Метод анализа распределения объёма и времени по ценовым уровням',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Локальный имбаланс',
          description:
            'Краткосрочное нарушение баланса между спросом и предложением',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Структурный имбаланс',
          description:
            'Долгосрочное преобладание одной стороны рынка формирующее тренд',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ретест',
          description: 'Возврат цены к уровню для проверки его значимости',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кластерный анализ',
          description:
            'Метод анализа распределения объёма по кластерам внутри свечи',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
