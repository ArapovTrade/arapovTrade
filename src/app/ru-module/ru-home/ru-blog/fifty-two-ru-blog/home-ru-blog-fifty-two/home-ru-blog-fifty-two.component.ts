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
  selector: 'app-home-ru-blog-fifty-two',
  templateUrl: './home-ru-blog-fifty-two.component.html',
  styleUrl: './home-ru-blog-fifty-two.component.scss',
})
export class HomeRuBlogFiftyTwoComponent implements OnInit {
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
      'Анатомия рыночных трендов: полное руководство для трейдера | ArapovTrade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Узнайте, как формируются тренды на финансовых рынках. Фазы тренда, индикаторы анализа, типичные ошибки трейдеров и практические стратегии торговли по тренду.',
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
            'https://arapov.trade/ru/freestudying/anatomyofmarkettrends#article',
          headline:
            'Анатомия рыночных трендов: полное руководство для трейдера',
          description:
            'Узнайте, как формируются тренды на финансовых рынках. Фазы тренда, индикаторы анализа, типичные ошибки трейдеров и практические стратегии торговли по тренду.',
          image: 'https://arapov.trade/assets/img/content/trends1.png',
          datePublished: '2026-03-25T00:00:00Z',
          dateModified: '2026-03-31T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'ArapovTrade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
            url: 'https://arapov.trade',
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/anatomyofmarkettrends',
          },
          articleSection: 'Трейдинг',
          keywords: [
            'тренды рынка',
            'анализ трендов',
            'технический анализ',
            'индикаторы',
            'Smart Money',
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
      '@id': 'https://arapov.trade/ru/freestudying/anatomyofmarkettrends#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Что такое тренд в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Тренд — это устойчивое направленное движение цены актива в течение определённого времени. Восходящий тренд характеризуется повышающимися минимумами и максимумами, нисходящий — понижающимися. Тренд формируется под влиянием баланса спроса и предложения на рынке.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие существуют фазы тренда?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Тренд проходит четыре фазы: накопление (крупные игроки формируют позиции), ускорение (активный рост с участием розничных трейдеров), распределение (фиксация прибыли крупными участниками), разворот (смена направления движения).',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие индикаторы лучше всего определяют тренд?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основные индикаторы тренда: скользящие средние (MA50, MA200), MACD для определения моментов смены направления, RSI для оценки силы движения, ADX для измерения силы тренда. Рекомендуется использовать 2-3 индикатора в комбинации.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему опасно торговать против тренда?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Торговля против тренда без подтверждающих сигналов увеличивает риск убытков, так как тренд может продолжаться значительно дольше ожиданий. Перед входом против тренда необходимо дождаться дивергенции на индикаторах, пробоя ключевого уровня или снижения ADX ниже 25.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как объёмы помогают в анализе тренда?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Объёмы подтверждают силу тренда: рост объёмов при движении цены в направлении тренда подтверждает его силу. Снижение объёмов может сигнализировать об ослаблении движения. Дивергенция между ценой и объёмом часто предшествует развороту.',
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
      '@id': 'https://arapov.trade/ru/freestudying/anatomyofmarkettrends#howto',
      name: 'Как определить и торговать по тренду',
      description:
        'Пошаговое руководство по определению тренда и построению торговой стратегии',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Определите направление тренда',
          text: 'Используйте скользящие средние MA50 и MA200. Если цена выше обеих линий — тренд восходящий, ниже — нисходящий. Проверьте, формирует ли цена повышающиеся или понижающиеся экстремумы.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Определите текущую фазу тренда',
          text: 'Проанализируйте объёмы и волатильность. Низкие объёмы без движения — фаза накопления. Высокие объёмы с сильным движением — фаза ускорения. Снижение объёмов на максимумах — фаза распределения.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Найдите точку входа',
          text: 'Входите на откатах к уровням поддержки или к скользящим средним. Используйте уровни Фибоначчи 38.2%-61.8% для поиска зон коррекции. Дождитесь подтверждающего сигнала от RSI или свечного паттерна.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Установите стоп-лосс и тейк-профит',
          text: 'Размещайте стоп-лосс за ключевым уровнем поддержки с учётом ATR. Соотношение риск/прибыль должно быть минимум 1:2. Не рискуйте более 1-2% депозита в одной сделке.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Управляйте позицией и фиксируйте результат',
          text: 'Переносите стоп-лосс в безубыток при движении цены в вашу сторону. Частично фиксируйте прибыль на ключевых уровнях. Записывайте каждую сделку в торговый дневник для анализа.',
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
      '@id':
        'https://arapov.trade/ru/freestudying/anatomyofmarkettrends#glossary',
      name: 'Глоссарий трейдинговых терминов',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Тренд',
          description:
            'Устойчивое направленное движение цены актива в течение определённого периода времени.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Восходящий тренд',
          description:
            'Бычий рынок, характеризующийся последовательным повышением минимумов и максимумов цены.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Нисходящий тренд',
          description:
            'Медвежий рынок с последовательным понижением максимумов и минимумов цены.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Флэт',
          description:
            'Боковое движение цены в горизонтальном коридоре без выраженного направления.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Скользящая средняя',
          description:
            'Индикатор, сглаживающий ценовые колебания и показывающий среднюю цену за выбранный период.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'MACD',
          description:
            'Индикатор схождения-расхождения скользящих средних, определяющий силу и направление тренда.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'RSI',
          description:
            'Индекс относительной силы, показывающий перекупленность или перепроданность актива.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фаза накопления',
          description:
            'Начальный этап тренда, когда крупные игроки формируют позиции при низкой волатильности.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Защитный ордер для автоматического закрытия позиции при достижении определённого уровня убытка.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Объёмный анализ',
          description:
            'Метод анализа рынка на основе торговых объёмов для подтверждения силы ценового движения.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
