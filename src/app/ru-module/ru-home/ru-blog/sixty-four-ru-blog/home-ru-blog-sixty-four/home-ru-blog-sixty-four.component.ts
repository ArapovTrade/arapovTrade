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
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home-ru-blog-sixty-four',
  templateUrl: './home-ru-blog-sixty-four.component.html',
  styleUrl: './home-ru-blog-sixty-four.component.scss',
})
export class HomeRuBlogSixtyFourComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
    private artickleServ: ArticlesService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute
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
      'Торговая стратегия в трейдинге — практические примеры для начинающих'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Торговая стратегия в трейдинге — что это такое, из чего состоит и почему важна для новичков. Примеры реальных сделок с разбором точек входа и выхода.',
    });

    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/prakticrus.jpg',
    });

    this.gerRandom();

    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        setTimeout(() => {
          const element = document.getElementById(fragment);
          if (element) {
            // Отступ сверху в пикселях, например 80px (зависит от вашего меню)
            const offset = 80;

            // Позиция элемента относительно страницы
            const elementPosition =
              element.getBoundingClientRect().top + window.pageYOffset;

            // Скроллим с учётом отступа
            window.scrollTo({
              top: elementPosition - offset,
              behavior: 'smooth',
            });
          }
        }, 100);
      }
    });
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
          '@id': 'https://arapov.trade/ru/freestudying/practic#article',
          headline:
            'Торговая стратегия в трейдинге — практические примеры для начинающих',
          description:
            'Торговая стратегия в трейдинге — что это такое, из чего состоит и почему важна для новичков. Примеры реальных сделок с разбором точек входа и выхода.',
          datePublished: '2025-11-15T00:00:00+02:00',
          dateModified: '2025-12-15T00:00:00+02:00',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/practic',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/prakticrus.jpg',
          },
          articleSection: 'Трейдинг',
          keywords: [
            'торговая стратегия',
            'трейдинг',
            'точка входа',
            'стоп-лосс',
            'мани-менеджмент',
            'Price Action',
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
      '@id': 'https://arapov.trade/ru/freestudying/practic#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Что такое торговая стратегия?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Торговая стратегия — это заранее разработанный набор чётких правил, регулирующих действия трейдера на всех этапах: от входа в сделку до выхода. Она устраняет импровизацию, эмоциональные колебания и субъективность.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему трейдинг без стратегии приводит к убыткам?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Без рабочей стратегии трейдинг превращается в азартную игру с отрицательным математическим ожиданием. Это математически подтверждённый факт — хаотичная торговля гарантированно приводит к потере депозита.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое правило 3 к 1 в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Правило 3 к 1 означает, что на каждый доллар риска потенциальная прибыль должна составлять минимум 3 доллара. Расстояние до цели в пунктах должно быть в 3 раза больше, чем расстояние до стоп-лосса.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое ложный пробой уровня?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ложный пробой — это попытка поднять или опустить цену за уровень поддержки/сопротивления, которая не получает продолжения. Часто происходит на повышенных объёмах и используется Smart Money для набора позиций.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какой WinRate считается хорошим для торговой системы?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'При работе с уровнями классическим считается WinRate около 60-65%. Это означает, что из 100 сделок примерно 63 будут прибыльными. В сочетании с правилом 3 к 1 это обеспечивает стабильный рост депозита.',
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
      '@id': 'https://arapov.trade/ru/freestudying/practic#howto',
      name: 'Как применить торговую стратегию на практике',
      description:
        'Пошаговый алгоритм применения торговой стратегии с уровнями и Price Action.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Определите уровень на старшем таймфрейме',
          text: 'На графике 4 часа найдите импульсную волну и отметьте зону сопротивления или поддержки как область интереса.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Дождитесь пин-бара в зоне',
          text: 'В отмеченной зоне ждите появления пин-бара — первого признака проблем у покупателей или продавцов.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Идентифицируйте ложный пробой',
          text: 'Наблюдайте за попыткой пробить уровень на повышенных объёмах. Неудачная попытка с возвратом цены — сигнал ложного пробоя.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Войдите по паттерну поглощения',
          text: 'Дождитесь медвежьего или бычьего поглощения и входите при пробое минимума/максимума бара ложного пробоя.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Установите стоп-лосс и цель',
          text: 'Стоп-лосс ставьте за экстремум ложного пробоя, цель — противоположный импульсный уровень. Проверьте соотношение 3 к 1.',
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
      '@id': 'https://arapov.trade/ru/freestudying/practic#terms',
      name: 'Глоссарий терминов торговой стратегии',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Торговая стратегия',
          description:
            'Набор правил, определяющих условия входа, выхода и управления капиталом в трейдинге.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Защитный ордер, автоматически закрывающий позицию при достижении заданного уровня убытка.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тейк-профит',
          description:
            'Ордер на фиксацию прибыли при достижении ценой заданного целевого уровня.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Price Action',
          description:
            'Метод анализа рынка на основе движения цены и свечных паттернов без использования индикаторов.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ложный пробой',
          description:
            'Движение цены за уровень поддержки или сопротивления с последующим быстрым возвратом.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Пин-бар',
          description:
            'Свечной паттерн с длинной тенью и маленьким телом, указывающий на отвержение цены.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Медвежье поглощение',
          description:
            'Паттерн из двух свечей, где вторая медвежья свеча полностью перекрывает тело первой бычьей.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'WinRate',
          description:
            'Процент прибыльных сделок от общего количества сделок в торговой системе.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Profit Factor',
          description:
            'Отношение суммы прибыльных сделок к сумме убыточных, показатель эффективности системы.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'DrawDown',
          description:
            'Просадка депозита — максимальное снижение баланса счёта от пикового значения.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
