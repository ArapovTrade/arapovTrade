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
  selector: 'app-home-ru-blog-nine',
  templateUrl: './home-ru-blog-nine.component.html',
  styleUrl: './home-ru-blog-nine.component.scss',
})
export class HomeRuBlogNineComponent implements OnInit {
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
      'Как прогнозировать цену в трейдинге | ArapovTrade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Полное руководство по прогнозированию цены на финансовых рынках. Технический и фундаментальный анализ, индикаторы, объемный анализ и стратегии предсказания движения цены.',
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
          headline: 'Как прогнозировать цену в трейдинге: полное руководство',
          description:
            'Полное руководство по прогнозированию цены на финансовых рынках. Технический и фундаментальный анализ, индикаторы, объемный анализ и стратегии предсказания движения цены.',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2026-03-15T00:00:00Z',
          dateModified: '2026-03-22T00:00:00Z',

          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/predictmarketprice',
          },
          image:
            'https://arapov.trade/assets/img/content/predictmarketprice1.webp',
          articleSection: 'Трейдинг',
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
          name: 'Какой метод прогнозирования цены самый эффективный?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Наиболее эффективный подход — комбинирование технического и фундаментального анализа с объемным анализом. Технический анализ определяет точки входа, фундаментальный — общее направление, объемный — подтверждает достоверность сигналов.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие индикаторы лучше всего подходят для прогнозирования цены?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Наиболее популярные индикаторы: скользящие средние (MA, EMA) для определения тренда, RSI для перекупленности/перепроданности, MACD для импульса и разворотов, полосы Боллинджера для волатильности, Ichimoku для комплексного анализа.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как объемный анализ помогает в прогнозировании?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Объем подтверждает силу ценового движения. Рост цены на высоких объемах подтверждает тренд. Дивергенция объема и цены предупреждает о возможном развороте. Аномальные объемы сигнализируют о действиях крупных игроков.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему важно комбинировать разные таймфреймы?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Мультитаймфреймовый анализ позволяет видеть общую картину на старшем таймфрейме и находить точные входы на младшем. Это повышает вероятность успешных сделок и улучшает соотношение риск/прибыль.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какая главная ошибка при прогнозировании цены?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Главная ошибка — торговля против тренда без веских оснований и игнорирование управления рисками. Даже точный прогноз не гарантирует прибыли, если трейдер рискует слишком большой частью капитала.',
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
      name: 'Как прогнозировать цену на финансовых рынках',
      description:
        'Пошаговый процесс прогнозирования ценовых движений для принятия торговых решений',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Определите общий тренд',
          text: 'Используйте скользящие средние и анализ максимумов/минимумов на старшем таймфрейме для определения направления основного тренда.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Найдите ключевые уровни',
          text: 'Определите уровни поддержки и сопротивления, уровни Фибоначчи и зоны концентрации объема, где цена может остановиться или развернуться.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Проанализируйте индикаторы',
          text: 'Примените технические индикаторы (RSI, MACD, Bollinger Bands) для подтверждения сигналов и определения импульса рынка.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Проверьте объемы',
          text: 'Убедитесь, что объем подтверждает ценовое движение. Высокий объем на пробое подтверждает его достоверность.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Учтите фундаментальные факторы',
          text: 'Проверьте экономический календарь и новостной фон. Избегайте входа перед важными новостями или учитывайте их потенциальное влияние.',
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
      name: 'Термины прогнозирования цены в трейдинге',
      description:
        'Глоссарий ключевых терминов для прогнозирования цен на финансовых рынках',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Технический анализ',
          description:
            'Метод прогнозирования цены на основе изучения исторических ценовых данных, графических паттернов и технических индикаторов',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фундаментальный анализ',
          description:
            'Метод анализа, основанный на экономических, политических и финансовых факторах, влияющих на стоимость актива',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Скользящая средняя',
          description:
            'Индикатор, рассчитывающий среднюю цену за определенный период для сглаживания колебаний и определения тренда',
        },
        {
          '@type': 'DefinedTerm',
          name: 'RSI',
          description:
            'Relative Strength Index — индикатор относительной силы, измеряющий скорость и величину ценовых изменений для определения перекупленности или перепроданности',
        },
        {
          '@type': 'DefinedTerm',
          name: 'MACD',
          description:
            'Moving Average Convergence Divergence — индикатор, показывающий взаимосвязь между двумя скользящими средними для определения импульса и разворотов',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Уровень поддержки',
          description:
            'Ценовой уровень, на котором спрос достаточно силен, чтобы остановить падение цены и вызвать отскок вверх',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Уровень сопротивления',
          description:
            'Ценовой уровень, на котором предложение достаточно сильно, чтобы остановить рост цены и вызвать откат вниз',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Объемный анализ',
          description:
            'Метод анализа, изучающий объем торгов для подтверждения ценовых движений и выявления активности крупных игроков',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Дивергенция',
          description:
            'Расхождение между движением цены и показаниями индикатора, часто сигнализирующее о возможном развороте тренда',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Полосы Боллинджера',
          description:
            'Индикатор волатильности, состоящий из скользящей средней и двух линий стандартного отклонения для определения экстремальных ценовых уровней',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
