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
  selector: 'app-home-ru-blog-thirty-five',
  templateUrl: './home-ru-blog-thirty-five.component.html',
  styleUrl: './home-ru-blog-thirty-five.component.scss',
})
export class HomeRuBlogThirtyFiveComponent implements OnInit {
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
      'Основы трейдинга для начинающих | Полное руководство 2025',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Основы трейдинга для начинающих: принципы биржевой торговли, виды рынков, стратегии, управление рисками и психология трейдера. Полное руководство от Игоря Арапова.',
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
          headline:
            'Основы трейдинга для начинающих: полное руководство по биржевой торговле',
          description:
            'Подробное руководство по основам трейдинга: принципы работы финансовых рынков, виды торговли, стратегии, инструменты анализа и управление рисками для начинающих трейдеров.',
          image: 'https://arapov.trade/assets/img/content/tradingbasics1.webp',
          datePublished: '2026-03-15T00:00:00Z',
          dateModified: '2026-03-22T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/tradingbasics',
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
        'https://t.me/ArapovTrade'
      ],
      jobTitle: ['Независимый исследователь', 'трейдер', 'автор и основатель arapov.trade'],
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
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Что такое трейдинг простыми словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Трейдинг — это деятельность по покупке и продаже финансовых инструментов (акций, валют, криптовалют, товаров) с целью получения прибыли от изменения их стоимости. Трейдер анализирует рынок и принимает решения о моменте входа и выхода из сделок.',
          },
        },
        {
          '@type': 'Question',
          name: 'С какой суммы можно начать торговать на бирже?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Минимальная сумма зависит от выбранного рынка и брокера. На валютном рынке можно начать от 100-500 долларов, на фондовом — от 1000 долларов. Однако рекомендуется начинать с демо-счёта для отработки навыков без риска потери средств.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какой стиль торговли лучше для новичка?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Начинающим трейдерам рекомендуется свинг-трейдинг или позиционная торговля. Эти стили менее интенсивны, дают время на анализ и принятие решений, не требуют постоянного присутствия у монитора.',
          },
        },
        {
          '@type': 'Question',
          name: 'Сколько времени нужно на обучение трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Базовые концепции можно освоить за 2-3 месяца систематического обучения. Однако формирование устойчивых навыков и стабильных результатов обычно занимает от 1 до 3 лет практики на реальном счёте.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какой процент от депозита можно рисковать в одной сделке?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Профессиональные трейдеры рекомендуют рисковать не более 1-2% от депозита в одной сделке. Такой консервативный подход позволяет пережить серию убыточных сделок и сохранить капитал для продолжения торговли.',
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
      name: 'Как начать торговать на бирже: пошаговое руководство',
      description:
        'Практическое руководство для начинающих трейдеров по старту биржевой торговли',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Изучите основы',
          text: 'Освойте базовые понятия: типы рынков, виды ордеров, принципы ценообразования. Изучите технический и фундаментальный анализ на базовом уровне.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Выберите рынок и брокера',
          text: 'Определитесь с торговой площадкой (форекс, акции, криптовалюты) и выберите надёжного брокера с лицензией регулятора.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Практикуйтесь на демо-счёте',
          text: 'Откройте демонстрационный счёт и отрабатывайте торговые стратегии без риска потери реальных денег минимум 2-3 месяца.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Разработайте торговый план',
          text: 'Создайте чёткий план с правилами входа, выхода, управления рисками и размером позиции. Следуйте плану без отклонений.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Начните с небольшого капитала',
          text: 'После стабильных результатов на демо переходите на реальный счёт с минимальной суммой. Постепенно увеличивайте капитал по мере роста опыта.',
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
      name: 'Глоссарий трейдинга',
      description: 'Основные термины биржевой торговли',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Трейдинг',
          description:
            'Деятельность по покупке и продаже финансовых инструментов с целью получения прибыли от изменения их стоимости',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Защитный ордер, автоматически закрывающий позицию при достижении заданного уровня убытка',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Технический анализ',
          description:
            'Метод прогнозирования цен на основе изучения графиков и исторических данных о движении котировок',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фундаментальный анализ',
          description:
            'Метод оценки стоимости активов на основе экономических показателей, новостей и финансовых отчётов',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильность',
          description:
            'Мера изменчивости цены актива, показывающая амплитуду колебаний котировок за определённый период',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ликвидность',
          description:
            'Способность актива быстро продаваться или покупаться без существенного влияния на его цену',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спред',
          description:
            'Разница между ценой покупки (ask) и ценой продажи (bid) финансового инструмента',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Скальпинг',
          description:
            'Стиль торговли с множеством краткосрочных сделок, направленный на получение небольшой прибыли с каждой операции',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Свинг-трейдинг',
          description:
            'Стиль торговли с удержанием позиций от нескольких дней до недель для захвата среднесрочных ценовых движений',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Диверсификация',
          description:
            'Распределение капитала между различными активами для снижения общего риска инвестиционного портфеля',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
