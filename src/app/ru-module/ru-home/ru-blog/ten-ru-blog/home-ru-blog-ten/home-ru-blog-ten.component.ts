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
  selector: 'app-home-ru-blog-ten',
  templateUrl: './home-ru-blog-ten.component.html',
  styleUrl: './home-ru-blog-ten.component.scss',
})
export class HomeRuBlogTenComponent implements OnInit {
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
      'Почему трейдеры теряют депозит: главные причины и как их избежать | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Разбираем основные причины потери депозита в трейдинге: отсутствие плана, игнорирование риск-менеджмента, эмоциональные ошибки. Практические советы по сохранению капитала.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-09' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/mainreasonforlosses.webp',
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
            'Почему трейдеры теряют депозит: главные причины и как их избежать',
          description:
            'Разбираем основные причины потери депозита в трейдинге: отсутствие плана, игнорирование риск-менеджмента, эмоциональные ошибки. Практические советы по сохранению капитала.',
          image:
            'https://arapov.trade/assets/img/content/reasonfordepositeloose.webp',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/mainreasonforlosses',
          },
          articleSection: 'Обучение трейдингу',
          wordCount: 1550,
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
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Почему большинство трейдеров теряют деньги?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основные причины: отсутствие торгового плана, игнорирование риск-менеджмента, эмоциональные решения, недостаток знаний о рынке и завышенные ожидания. По статистике, около 90% трейдеров теряют депозит из-за этих ошибок.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как избежать слива депозита?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Разработайте торговый план, ограничивайте риск до 1-2% на сделку, всегда используйте стоп-лоссы, контролируйте эмоции и регулярно анализируйте свои результаты. Начинайте с демо-счёта для отработки стратегии.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какой процент трейдеров теряет деньги?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'По различным исследованиям, от 70% до 90% розничных трейдеров теряют свои депозиты. Однако среди тех, кто применяет системный подход и строгий риск-менеджмент, процент успешных значительно выше.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое тильт в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Тильт — это эмоциональное состояние, когда трейдер после убытков начинает принимать импульсивные решения, увеличивает риски и отклоняется от торгового плана в попытке быстро отыграться. Это одна из главных причин полной потери депозита.',
          },
        },
        {
          '@type': 'Question',
          name: 'Сколько времени нужно, чтобы научиться прибыльно торговать?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'В среднем требуется от 1 до 3 лет постоянной практики, обучения и анализа ошибок. Успех зависит от дисциплины, качества обучения и способности контролировать эмоции. Демо-торговля ускоряет процесс без риска потери реальных денег.',
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
      name: 'Как сохранить депозит и избежать типичных ошибок',
      description:
        'Пошаговое руководство по защите торгового капитала от распространённых ошибок трейдеров',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Создайте торговый план',
          text: 'Определите правила входа и выхода, целевую прибыль, допустимый риск и торгуемые инструменты. План должен быть конкретным и измеримым.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Внедрите строгий риск-менеджмент',
          text: 'Ограничьте риск на сделку до 1-2% депозита, всегда устанавливайте стоп-лоссы, рассчитывайте размер позиции до входа в сделку.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Контролируйте эмоции',
          text: 'Ведите торговый дневник, делайте перерывы после убытков, не торгуйте в состоянии стресса или эйфории. Распознавайте признаки тильта.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Постоянно учитесь',
          text: 'Изучайте рынок, анализируйте свои сделки, тестируйте стратегии на демо-счёте. Трейдинг требует непрерывного развития.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Оценивайте математическое ожидание',
          text: 'Рассчитывайте ожидаемую прибыльность стратегии. Положительное математическое ожидание — основа долгосрочного успеха.',
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
      name: 'Термины трейдинга: ошибки и риски',
      description:
        'Ключевые понятия, связанные с потерей депозита и управлением рисками',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Слив депозита',
          description:
            'Полная или значительная потеря торгового капитала из-за убыточных сделок',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тильт',
          description:
            'Эмоциональное состояние, при котором трейдер принимает импульсивные решения после серии убытков',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговый план',
          description:
            'Документ с правилами торговли: критерии входа/выхода, риск на сделку, торгуемые инструменты',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Риск-менеджмент',
          description:
            'Система управления рисками для защиты капитала от значительных потерь',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Защитный ордер для автоматического закрытия убыточной позиции',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кредитное плечо',
          description:
            'Механизм увеличения торгового объёма за счёт заёмных средств брокера',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Математическое ожидание',
          description:
            'Средний результат сделки в долгосрочной перспективе с учётом вероятности и размера прибыли/убытка',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Просадка',
          description:
            'Снижение торгового счёта от максимума до текущего минимума',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Овертрейдинг',
          description:
            'Чрезмерное количество сделок, ведущее к повышенным комиссиям и эмоциональному истощению',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговый дневник',
          description:
            'Журнал для записи сделок, эмоций и выводов с целью анализа и улучшения результатов',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
