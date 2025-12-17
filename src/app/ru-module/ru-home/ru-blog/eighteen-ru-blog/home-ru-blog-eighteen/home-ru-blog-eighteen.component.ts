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
  selector: 'app-home-ru-blog-eighteen',
  templateUrl: './home-ru-blog-eighteen.component.html',
  styleUrl: './home-ru-blog-eighteen.component.scss',
})
export class HomeRuBlogEighteenComponent implements OnInit {
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
      'Объемный анализ рынка в трейдинге | ArapovTrade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Полное руководство по объемному анализу рынка. Volume Profile, Delta Volume, Footprint Charts и практические стратегии анализа объемов для трейдеров.',
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
            '@id': 'https://arapov.trade/ru/freestudying/volmarketanalisys',
          },
          headline: 'Объемный анализ рынка в трейдинге | ArapovTrade',
          description:
            'Полное руководство по объемному анализу рынка. Volume Profile, Delta Volume, Footprint Charts и практические стратегии анализа объемов для трейдеров.',
          image:
            'https://arapov.trade/assets/img/content/volmarketanalisys.webp',
          datePublished: '2025-06-25T00:00:00+03:00',
          dateModified: '2025-12-24T00:00:00+02:00',
          inLanguage: 'ru',
          author: {
            '@type': 'Person',
            '@id': 'https://arapov.trade/ru#person',
            name: 'Игорь Арапов',
            url: 'https://arapov.trade/ru',
            sameAs: [
              'https://www.youtube.com/@ArapovTrade',
              'https://www.mql5.com/ru/signals/2246716',
            ],
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
            name: 'Индикатор объема - ключевой инструмент технического анализа',
            description:
              'Индикатор объема - ключевой инструмент технического анализа для трейдера. Разбираю основы объемного анализа: как читать объемы, определять дисбаланс спроса и предложения, находить Smart Money на рынке.',
            thumbnailUrl: [
              'https://img.youtube.com/vi/0pXHZRfVW9E/maxresdefault.jpg',
              'https://img.youtube.com/vi/0pXHZRfVW9E/hqdefault.jpg',
            ],
            uploadDate: '2025-11-24T00:00:00+02:00',
            duration: 'PT6M54S',
            contentUrl: 'https://www.youtube.com/watch?v=0pXHZRfVW9E',
            embedUrl: 'https://www.youtube.com/embed/0pXHZRfVW9E',
            inLanguage: 'ru',
            keywords:
              'объемы в трейдинге, индикатор объема, анализ объемов, Smart Money, биржевой стакан',
            hasPart: [
              {
                '@type': 'Clip',
                name: 'Откуда берется объем на бирже',
                startOffset: 39,
                endOffset: 56,
                url: 'https://www.youtube.com/watch?v=0pXHZRfVW9E&t=39',
              },
              {
                '@type': 'Clip',
                name: 'Биржевой стакан - что это и как работает',
                startOffset: 56,
                endOffset: 80,
                url: 'https://www.youtube.com/watch?v=0pXHZRfVW9E&t=56',
              },
              {
                '@type': 'Clip',
                name: 'Механика движения цены на рынке',
                startOffset: 80,
                endOffset: 90,
                url: 'https://www.youtube.com/watch?v=0pXHZRfVW9E&t=80',
              },
              {
                '@type': 'Clip',
                name: 'Как увидеть дисбаланс спроса и предложения',
                startOffset: 90,
                endOffset: 150,
                url: 'https://www.youtube.com/watch?v=0pXHZRfVW9E&t=90',
              },
              {
                '@type': 'Clip',
                name: 'Анализ больших объемов профессионалов',
                startOffset: 150,
                endOffset: 160,
                url: 'https://www.youtube.com/watch?v=0pXHZRfVW9E&t=150',
              },
              {
                '@type': 'Clip',
                name: 'Как правильно анализировать объемы',
                startOffset: 160,
                endOffset: 260,
                url: 'https://www.youtube.com/watch?v=0pXHZRfVW9E&t=160',
              },
              {
                '@type': 'Clip',
                name: 'Логика Smart Money в трейдинге',
                startOffset: 260,
                endOffset: 316,
                url: 'https://www.youtube.com/watch?v=0pXHZRfVW9E&t=260',
              },
              {
                '@type': 'Clip',
                name: 'Медвежий объем - объем продаж',
                startOffset: 316,
                endOffset: 327,
                url: 'https://www.youtube.com/watch?v=0pXHZRfVW9E&t=316',
              },
              {
                '@type': 'Clip',
                name: 'Бычий объем - объем покупок',
                startOffset: 327,
                endOffset: 356,
                url: 'https://www.youtube.com/watch?v=0pXHZRfVW9E&t=327',
              },
              {
                '@type': 'Clip',
                name: 'Захват ликвидности профессионалами',
                startOffset: 356,
                endOffset: 414,
                url: 'https://www.youtube.com/watch?v=0pXHZRfVW9E&t=356',
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
          name: 'Что такое объемный анализ рынка?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Объемный анализ — это метод технического анализа, основанный на изучении объемов торгов. Он помогает выявить истинные намерения крупных игроков и определить, куда они направляют ликвидность, анализируя количество сделок на разных ценовых уровнях.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие основные инструменты объемного анализа?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основные инструменты: Volume Profile (распределение объемов по ценам), Delta Volume (разница между покупками и продажами), Footprint Charts (детальный анализ ордеров), Open Interest (открытый интерес на фьючерсах).',
          },
        },
        {
          '@type': 'Question',
          name: 'Как объем подтверждает тренд?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Растущий тренд с увеличением объема подтверждает силу движения. Снижение объема на росте цены сигнализирует об ослаблении тренда. Высокие объемы на пробое уровня подтверждают его истинность.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как отличить истинный пробой от ложного?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Истинный пробой сопровождается резким увеличением объема и продолжением движения. Ложный пробой характеризуется низким объемом или его падением после пробоя, что часто приводит к возврату цены в диапазон.',
          },
        },
        {
          '@type': 'Question',
          name: 'На каких платформах лучше проводить объемный анализ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Лучшие платформы для объемного анализа: TradingView (базовые индикаторы), ATAS (профессиональный анализ потока ордеров), Bookmap (тепловые карты ликвидности). Выбор зависит от рынка и стиля торговли.',
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
      name: 'Как проводить объемный анализ рынка',
      description:
        'Пошаговый процесс анализа рыночных объемов для принятия торговых решений',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Определите рыночный контекст',
          text: 'Оцените текущую фазу рынка: тренд, флет или консолидация. Объемные уровни работают по-разному в зависимости от рыночных условий.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Используйте мульти-таймфреймовый анализ',
          text: 'Анализируйте объемы на старших таймфреймах для определения глобальных уровней ликвидности, на младших — для поиска точек входа.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Найдите ключевые объемные уровни',
          text: 'Используйте Volume Profile для определения POC (Point of Control) и зон накопления объема, где концентрируется ликвидность.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Анализируйте Delta Volume',
          text: 'Оцените соотношение покупок и продаж. Положительная дельта указывает на преобладание покупателей, отрицательная — продавцов.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Подтвердите сигналы Price Action',
          text: 'Комбинируйте объемный анализ со свечными паттернами и уровнями поддержки/сопротивления для повышения точности входов.',
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
      name: 'Термины объемного анализа в трейдинге',
      description: 'Глоссарий ключевых терминов объемного анализа рынка',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Объемный анализ',
          description:
            'Метод технического анализа, изучающий объемы торгов для определения активности участников рынка и намерений крупных игроков',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volume Profile',
          description:
            'Индикатор, показывающий распределение торговых объемов по различным ценовым уровням за определенный период',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Delta Volume',
          description:
            'Разница между объемом рыночных покупок и продаж, показывающая реальное давление покупателей или продавцов',
        },
        {
          '@type': 'DefinedTerm',
          name: 'POC',
          description:
            'Point of Control — ценовой уровень с максимальным объемом торгов, часто выступающий как зона притяжения цены',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Footprint Charts',
          description:
            'Графики, показывающие детальное распределение объемов внутри каждой свечи с разбивкой на покупки и продажи',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Открытый интерес',
          description:
            'Количество открытых позиций на фьючерсном рынке, показывающее вовлеченность участников в текущий тренд',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Зона накопления',
          description:
            'Ценовой диапазон, где крупные игроки постепенно набирают позиции перед значительным движением цены',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Зона распределения',
          description:
            'Ценовой диапазон, где крупные игроки постепенно закрывают позиции, готовясь к развороту тренда',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тиковый объем',
          description:
            'Количество изменений цены за период времени, используемое на рынках без централизованного учета реального объема',
        },
        {
          '@type': 'DefinedTerm',
          name: 'VWAP',
          description:
            'Volume Weighted Average Price — средневзвешенная по объему цена, показывающая справедливую стоимость актива',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
