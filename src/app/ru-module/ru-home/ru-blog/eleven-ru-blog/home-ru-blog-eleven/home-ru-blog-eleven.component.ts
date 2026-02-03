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
  selector: 'app-home-ru-blog-eleven',
  templateUrl: './home-ru-blog-eleven.component.html',
  styleUrl: './home-ru-blog-eleven.component.scss',
})
export class HomeRuBlogElevenComponent implements OnInit {
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
      'Стартовый депозит трейдера: какой капитал нужен для начала торговли',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Узнайте, какой стартовый депозит нужен для начала торговли на Форекс, фондовом рынке и криптовалютах. Практическое руководство по выбору оптимального размера капитала для трейдинга.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-01' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/starterdeposit.webp',
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
          headline:
            'Стартовый депозит трейдера: какой капитал нужен для начала торговли',
          description:
            'Практическое руководство по определению оптимального размера стартового депозита для торговли на финансовых рынках',
          image: 'https://arapov.trade/assets/img/content/starterdeposit1.webp',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Pair Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/starterdeposit',
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
          name: 'Какой минимальный депозит нужен для начала торговли на Форекс?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для начала торговли на Форекс рекомендуется иметь минимум 300-500 долларов. Это позволяет соблюдать правила риск-менеджмента и рисковать не более 1-2% от депозита в каждой сделке.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему нельзя начинать торговлю с 10-50 долларов?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'С минимальным депозитом в 10-50 долларов невозможно соблюдать базовые правила управления рисками. Комиссии, спреды и минимальные размеры лотов делают торговлю с таким капиталом нерентабельной.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как рассчитать оптимальный размер стартового депозита?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Оптимальный депозит рассчитывается исходя из правила: риск на сделку не более 1-2% от капитала. Если ваш средний стоп-лосс составляет 20 пунктов, а стоимость пункта 1 доллар, вам понадобится минимум 500-1000 долларов.',
          },
        },
        {
          '@type': 'Question',
          name: 'Стоит ли использовать заёмные средства для формирования депозита?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Категорически не рекомендуется использовать заёмные средства для трейдинга. Это создаёт дополнительное психологическое давление и может привести к принятию необдуманных решений под страхом потери чужих денег.',
          },
        },
        {
          '@type': 'Question',
          name: 'Когда можно увеличивать размер торгового депозита?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Увеличивать депозит рекомендуется только после достижения стабильной прибыльности на протяжении минимум 3-6 месяцев. Прежде чем добавлять средства, убедитесь, что ваша стратегия работает и вы соблюдаете дисциплину.',
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
      name: 'Как определить оптимальный размер стартового депозита',
      description:
        'Пошаговое руководство по расчёту необходимого капитала для начала торговли на финансовых рынках',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Определите комфортную сумму потерь',
          text: 'Установите максимальную сумму, которую вы готовы потерять без ущерба для финансового положения. Эта сумма станет верхней границей вашего стартового депозита.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Выберите торговую стратегию',
          text: 'Определите стиль торговли: скальпинг требует больше капитала из-за комиссий, среднесрочная торговля — меньше, но требует запаса для просадок.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Рассчитайте минимальный депозит по правилу риска',
          text: 'Разделите средний стоп-лосс в денежном выражении на 0.01-0.02 (1-2% риска). Результат — минимально необходимый депозит для соблюдения риск-менеджмента.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Протестируйте на демо-счёте',
          text: 'Проведите минимум 2-3 недели торговли на демо-счёте с виртуальным капиталом, равным планируемому депозиту. Оцените комфортность работы.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Начните с минимальной суммы',
          text: 'При переходе на реальный счёт начните с суммы в нижней границе рассчитанного диапазона. Увеличивайте депозит только после подтверждения стабильных результатов.',
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
      name: 'Глоссарий терминов: стартовый депозит трейдера',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Стартовый депозит',
          description:
            'Начальная сумма денежных средств, размещаемая на брокерском счёте для совершения торговых операций на финансовых рынках.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Риск-менеджмент',
          description:
            'Система управления рисками в трейдинге, включающая определение максимально допустимых потерь на сделку и общий контроль просадки капитала.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кредитное плечо',
          description:
            'Механизм маржинальной торговли, позволяющий контролировать позиции, превышающие размер собственного капитала трейдера.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спред',
          description:
            'Разница между ценой покупки и продажи торгового инструмента, представляющая комиссию брокера за исполнение сделки.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Просадка',
          description:
            'Временное снижение торгового капитала от максимального значения, выраженное в процентах или денежном эквиваленте.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маржа',
          description:
            'Залоговые средства, блокируемые брокером на счёте трейдера при открытии позиции с использованием кредитного плеча.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Демо-счёт',
          description:
            'Учебный торговый счёт с виртуальными средствами для практики торговли без финансового риска.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильность',
          description:
            'Степень изменчивости цены финансового инструмента за определённый период времени.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Диверсификация',
          description:
            'Распределение капитала между различными торговыми инструментами для снижения концентрационных рисков.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ликвидность',
          description:
            'Способность актива быть быстро проданным или купленным по рыночной цене без существенного влияния на котировки.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
