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
  selector: 'app-home-ru-blog-seventeen',
  templateUrl: './home-ru-blog-seventeen.component.html',
  styleUrl: './home-ru-blog-seventeen.component.scss',
})
export class HomeRuBlogSeventeenComponent implements OnInit {
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
      'Мифы о трейдинге: разоблачение популярных заблуждений | ArapovTrade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Разбираем главные мифы о трейдинге: от иллюзии быстрого обогащения до заблуждений о необходимости крупного капитала. Узнайте правду о биржевой торговле.',
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
          '@id': 'https://arapov.trade/ru/freestudying/tradingmyths#article',
          headline: 'Мифы о трейдинге: разоблачение популярных заблуждений',
          description:
            'Разбираем главные мифы о трейдинге: от иллюзии быстрого обогащения до заблуждений о необходимости крупного капитала. Узнайте правду о биржевой торговле.',
          image: 'https://arapov.trade/assets/img/content/tradingmyths1.webp',
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
            '@id': 'https://arapov.trade/ru/freestudying/tradingmyths',
          },
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
      '@id': 'https://arapov.trade/ru/freestudying/tradingmyths#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Можно ли быстро разбогатеть на трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Нет, трейдинг требует месяцев обучения и практики. Большинство новичков теряют капитал в первый год из-за нереалистичных ожиданий. Успех приходит через постепенное развитие навыков анализа и управления рисками.',
          },
        },
        {
          '@type': 'Question',
          name: 'Нужен ли большой капитал для начала торговли?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Нет, современные брокеры позволяют начинать с минимальных сумм. Демо-счета дают возможность практиковаться без вложений. Размер капитала влияет на абсолютную прибыль, но не на процентную доходность стратегии.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему профессиональные трейдеры тоже терпят убытки?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Убыточные сделки — неотъемлемая часть любой торговой системы. Даже стратегии с математическим преимуществом допускают процент неудач. Профессионалы управляют соотношением прибыли к убыткам через грамотный риск-менеджмент.',
          },
        },
        {
          '@type': 'Question',
          name: 'Трейдинг — это азартная игра?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Нет, в отличие от казино, грамотный трейдер создаёт статистическое преимущество через анализ и управление рисками. Финансовые рынки позволяют формировать положительное математическое ожидание при дисциплинированном подходе.',
          },
        },
        {
          '@type': 'Question',
          name: 'Нужно ли постоянно следить за рынком?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Нет, среднесрочные и позиционные стратегии требуют анализа графиков несколько раз в день или неделю. Автоматические ордера защищают позиции без участия трейдера. Избыточное экранное время часто вредит результатам.',
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
      '@id': 'https://arapov.trade/ru/freestudying/tradingmyths#howto',
      name: 'Как избежать распространённых заблуждений в трейдинге',
      description:
        'Пошаговое руководство по формированию реалистичного понимания биржевой торговли',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Сформируйте реалистичные ожидания',
          text: 'Откажитесь от идеи быстрого обогащения. Трейдинг требует месяцев обучения и практики. Планируйте постепенное развитие навыков.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Начните с демо-счёта',
          text: 'Практикуйтесь без риска потери реальных денег. Освойте базовые операции и протестируйте свою стратегию.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Изучите основы анализа',
          text: 'Освойте технический и фундаментальный анализ. Сосредоточьтесь на простых стратегиях, основанных на уровнях поддержки и сопротивления.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Внедрите риск-менеджмент',
          text: 'Ограничьте риск на сделку заранее определённым процентом от капитала. Используйте стоп-лоссы для защиты позиций.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Ведите торговый журнал',
          text: 'Записывайте все сделки и анализируйте результаты. Учитесь на ошибках и совершенствуйте стратегию на основе реальных данных.',
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
      '@id': 'https://arapov.trade/ru/freestudying/tradingmyths#glossary',
      name: 'Глоссарий терминов трейдинга',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Трейдинг',
          description:
            'Покупка и продажа финансовых инструментов с целью получения прибыли от изменения цен',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Риск-менеджмент',
          description:
            'Система управления рисками, определяющая допустимые потери на сделку и общий размер позиций',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Автоматический ордер на закрытие позиции при достижении заданного уровня убытка',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Технический анализ',
          description:
            'Метод прогнозирования цен на основе изучения графиков, паттернов и индикаторов',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фундаментальный анализ',
          description:
            'Оценка стоимости актива на основе экономических, финансовых и других качественных факторов',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Демо-счёт',
          description:
            'Учебный торговый счёт с виртуальными деньгами для практики без финансового риска',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильность',
          description:
            'Степень изменчивости цены актива за определённый период времени',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Математическое ожидание',
          description:
            'Средняя прибыль или убыток на сделку при многократном применении торговой стратегии',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Уровни поддержки и сопротивления',
          description:
            'Ценовые зоны, где исторически наблюдалась повышенная активность покупателей или продавцов',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Просадка',
          description:
            'Снижение торгового капитала от локального максимума до локального минимума',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
