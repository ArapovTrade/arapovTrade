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
  selector: 'app-home-ru-blog-nineteen',
  templateUrl: './home-ru-blog-nineteen.component.html',
  styleUrl: './home-ru-blog-nineteen.component.scss',
})
export class HomeRuBlogNineteenComponent implements OnInit {
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
      'Метод Вайкоффа в трейдинге | Полное руководство 2025'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Метод Вайкоффа в трейдинге: полное руководство по анализу фаз накопления и распределения, объёмному анализу и стратегиям торговли по Smart Money.',
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
            '@id': 'https://arapov.trade/ru/freestudying/wyckoffmethod',
          },
          headline: 'Метод Вайкоффа в трейдинге: полный гайд',
          description:
            'Детальный разбор метода Вайкоффа. Фазы накопления и распределения, объемный анализ, как следовать за крупными деньгами.',
          image: 'https://arapov.trade/assets/img/content/wyckoffmethod.webp',
          datePublished: '2025-03-15T00:00:00+02:00',
          dateModified: '2025-12-15T00:00:00+02:00',
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
            name: 'Метод Вайкоффа для начинающих трейдеров: полное руководство по объемному анализу',
            description:
              'Метод Вайкоффа для начинающих трейдеров: полное руководство по объемному анализу рынка. Узнайте, как следовать за крупными деньгами и использовать фазы накопления и распределения.',
            thumbnailUrl: [
              'https://img.youtube.com/vi/-oEWnPGRVqs/maxresdefault.jpg',
              'https://img.youtube.com/vi/-oEWnPGRVqs/hqdefault.jpg',
            ],
            uploadDate: '2024-06-15T00:00:00+02:00',
            duration: 'PT7M41S',
            contentUrl: 'https://www.youtube.com/watch?v=-oEWnPGRVqs',
            embedUrl: 'https://www.youtube.com/embed/-oEWnPGRVqs',
            inLanguage: 'ru',
            keywords:
              'метод Вайкоффа, Wyckoff, объемный анализ, VSA, фазы рынка, накопление, распределение',
            hasPart: [
              {
                '@type': 'Clip',
                name: 'Введение в метод Вайкоффа для начинающих',
                startOffset: 0,
                endOffset: 45,
                url: 'https://www.youtube.com/watch?v=-oEWnPGRVqs&t=0',
              },
              {
                '@type': 'Clip',
                name: 'История метода Вайкоффа - почему работает с 1905 года',
                startOffset: 45,
                endOffset: 195,
                url: 'https://www.youtube.com/watch?v=-oEWnPGRVqs&t=45',
              },
              {
                '@type': 'Clip',
                name: 'Суть концепции Вайкоффа - следуйте за профессионалами',
                startOffset: 195,
                endOffset: 280,
                url: 'https://www.youtube.com/watch?v=-oEWnPGRVqs&t=195',
              },
              {
                '@type': 'Clip',
                name: 'Фазы рынка: накопление и распределение',
                startOffset: 280,
                endOffset: 380,
                url: 'https://www.youtube.com/watch?v=-oEWnPGRVqs&t=280',
              },
              {
                '@type': 'Clip',
                name: 'Как крупный капитал собирает и распределяет позиции',
                startOffset: 380,
                endOffset: 461,
                url: 'https://www.youtube.com/watch?v=-oEWnPGRVqs&t=380',
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
      '@id': 'https://arapov.trade/ru/freestudying/wyckoffmethod#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Что такое метод Вайкоффа простыми словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Метод Вайкоффа — это система анализа рынка, позволяющая определять действия крупных институциональных игроков через изучение ценовых графиков и объёмов торгов. Методология помогает распознавать фазы накопления и распределения активов, что даёт трейдеру возможность торговать в направлении движения крупного капитала.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие основные фазы рынка выделяет метод Вайкоффа?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Метод Вайкоффа выделяет четыре основные фазы рыночного цикла: аккумуляция (накопление позиций институционалами), восходящий тренд (markup), дистрибуция (распределение позиций среди розничных участников) и нисходящий тренд (markdown). Каждая фаза имеет характерные признаки в структуре цены и объёмах торгов.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое спринг в методе Вайкоффа?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Спринг — это ключевой паттерн завершения фазы аккумуляции. Цена кратковременно опускается ниже зоны поддержки, активируя стоп-ордера розничных покупателей. Институционалы используют образовавшуюся ликвидность для завершения накопления позиций. Возврат цены внутрь диапазона с ростом объёмов подтверждает готовность к восходящему движению.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как использовать объёмный анализ в методе Вайкоффа?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Объёмный анализ подтверждает истинность ценовых движений. Рост объёмов при движении цены указывает на силу тренда, снижение активности — на вероятный разворот. Используйте профиль объёма для определения зон баланса, дельту объёма для выявления доминирующей стороны, кластерный анализ для обнаружения институционального интереса.',
          },
        },
        {
          '@type': 'Question',
          name: 'Работает ли метод Вайкоффа на криптовалютном рынке?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Метод Вайкоффа эффективно работает на криптовалютном рынке благодаря высокой концентрации капитала у ограниченного числа участников. Крупные держатели цифровых активов создают выраженные зоны накопления перед памп-движениями. Методология помогает отличить органическое накопление от манипулятивной активности.',
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
      '@id': 'https://arapov.trade/ru/freestudying/wyckoffmethod#howto',
      name: 'Как торговать по методу Вайкоффа',
      description:
        'Пошаговое руководство по применению метода Вайкоффа для анализа рынка и поиска торговых возможностей',
      totalTime: 'PT30M',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Определите текущую фазу рынка',
          text: 'Проанализируйте график на старшем таймфрейме. Определите, находится ли рынок в фазе аккумуляции, восходящего тренда, дистрибуции или нисходящего тренда.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Идентифицируйте ключевые паттерны',
          text: 'Найдите характерные паттерны Вайкоффа: спринг в фазе накопления или аптраст в фазе распределения.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Подтвердите сигнал объёмами',
          text: 'Используйте объёмный анализ для подтверждения торгового сигнала. Истинный пробой сопровождается ростом объёмов.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Определите точку входа и стоп-лосс',
          text: 'Откройте позицию после подтверждения паттерна. Стоп-лосс размещайте за экстремумом паттерна.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Управляйте позицией',
          text: 'Перенесите стоп-лосс в безубыток после достижения промежуточной цели. Фиксируйте прибыль частями.',
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
      '@id': 'https://arapov.trade/ru/freestudying/wyckoffmethod#glossary',
      name: 'Глоссарий метода Вайкоффа',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Аккумуляция',
          description:
            'Фаза скрытного накопления позиций институционалами в горизонтальном диапазоне',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Дистрибуция',
          description:
            'Фаза постепенного закрытия позиций крупными игроками перед нисходящим трендом',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спринг',
          description:
            'Ложный пробой нижней границы диапазона накопления для сбора ликвидности',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Аптраст',
          description: 'Ложный пробой верхней границы диапазона распределения',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Markup',
          description: 'Фаза восходящего тренда после завершения аккумуляции',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Markdown',
          description: 'Фаза нисходящего тренда после завершения дистрибуции',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Дельта объёма',
          description: 'Разница между объёмом рыночных покупок и продаж',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Профиль объёма',
          description: 'Распределение торговой активности по ценовым уровням',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Вторичный тест',
          description: 'Повторная проверка зоны спринга меньшими объёмами',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Признак слабости',
          description:
            'Импульсное снижение после аптраста, подтверждающее дистрибуцию',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
