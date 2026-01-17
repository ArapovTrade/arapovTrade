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
  selector: 'app-home-ru-blog-twenty-seven',
  templateUrl: './home-ru-blog-twenty-seven.component.html',
  styleUrl: './home-ru-blog-twenty-seven.component.scss',
})
export class HomeRuBlogTwentySevenComponent implements OnInit {
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
      'Японские свечи в трейдинге: как читать графики и находить точки входа'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Научитесь читать японские свечи: молот, поглощение, доджи, утренняя звезда. Практическое руководство по свечному анализу для трейдеров с примерами.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-04-16' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/japanesecandle.jpg',
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
          headline:
            'Японские свечи в трейдинге: как читать графики и находить точки входа',
          description:
            'Научитесь читать японские свечи: молот, поглощение, доджи, утренняя звезда. Практическое руководство по свечному анализу.',
          image: 'https://arapov.trade/assets/img/content/japanessecandle1.jpg',

          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-12T00:00:00Z',
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
            '@id': 'https://arapov.trade/ru/freestudying/japanesecandle',
          },
          articleSection: 'Технический анализ',
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
          name: 'Что такое японские свечи?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Японские свечи — графический метод отображения ценовых движений, показывающий цены открытия, закрытия, максимум и минимум за период.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие основные свечные паттерны существуют?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основные паттерны: молот, повешенный, поглощение, доджи, утренняя звезда, вечерняя звезда, марубозу.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как определить разворот по свечам?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Разворотные паттерны (молот, поглощение) формируются на ключевых уровнях и подтверждаются объёмом и индикаторами.',
          },
        },
        {
          '@type': 'Question',
          name: 'На каких таймфреймах работают свечные паттерны?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Свечи работают на всех таймфреймах, но сигналы на H4 и выше надёжнее из-за меньшего рыночного шума.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как подтвердить свечной сигнал?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Используйте объём, RSI, MACD, уровни поддержки/сопротивления и Фибоначчи для подтверждения.',
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
      name: 'Как анализировать японские свечи',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Определите тренд',
          text: 'Используйте скользящие средние для понимания направления рынка.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Найдите ключевые уровни',
          text: 'Отметьте зоны поддержки и сопротивления на графике.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Идентифицируйте паттерн',
          text: 'Найдите свечную формацию: молот, поглощение, доджи.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Подтвердите сигнал',
          text: 'Проверьте объём и показания RSI или MACD.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Войдите в сделку',
          text: 'Установите стоп-лосс и тейк-профит с соотношением 1:2.',
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
      name: 'Глоссарий японских свечей',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Японская свеча',
          description:
            'Графический элемент, показывающий открытие, закрытие, максимум и минимум цены',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тело свечи',
          description: 'Прямоугольник между ценой открытия и закрытия',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тень свечи',
          description: 'Линии выше и ниже тела, показывающие экстремумы',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Молот',
          description:
            'Разворотная свеча с маленьким телом и длинной нижней тенью',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Поглощение',
          description:
            'Двухсвечная формация, где вторая свеча полностью перекрывает первую',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Доджи',
          description: 'Свеча с почти равными ценами открытия и закрытия',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Марубозу',
          description: 'Свеча с большим телом и минимальными тенями',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Утренняя звезда',
          description: 'Трёхсвечная разворотная формация вверх',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Вечерняя звезда',
          description: 'Трёхсвечная разворотная формация вниз',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Повешенный',
          description: 'Медвежья версия молота на вершине тренда',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
