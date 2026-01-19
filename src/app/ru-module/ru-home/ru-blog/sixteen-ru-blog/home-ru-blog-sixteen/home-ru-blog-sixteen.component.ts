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
  selector: 'app-home-ru-blog-sixteen',
  templateUrl: './home-ru-blog-sixteen.component.html',
  styleUrl: './home-ru-blog-sixteen.component.scss',
})
export class HomeRuBlogSixteenComponent implements OnInit {
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
      'Трендовые каналы в трейдинге: как строить и торговать | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Трендовые каналы в трейдинге: полное руководство по построению, типам и стратегиям торговли. Узнайте, как использовать ценовые каналы для прибыльной торговли на Форекс, акциях и криптовалютах.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/trandingchannels.webp',
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
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/trandingchannels',
          },
          headline:
            'Трендовые каналы в трейдинге: полное руководство по построению и стратегиям',
          description:
            'Исчерпывающее руководство по трендовым каналам: типы каналов, методы построения, торговые стратегии и практические рекомендации для трейдеров всех уровней.',
          image:
            'https://arapov.trade/assets/img/content/trandingchannels.webp',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
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
            url: 'https://arapov.trade',
            description:
              'Бесплатное обучение трейдингу: Smart Money, объёмный анализ, метод Вайкоффа',
          },
          articleSection: 'Технический анализ',
          keywords: [
            'трендовые каналы',
            'ценовой канал',
            'технический анализ',
            'линия поддержки',
            'линия сопротивления',
            'торговая стратегия',
          ],
          wordCount: 1650,
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
          name: 'Что такое трендовый канал в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Трендовый канал — это инструмент технического анализа, состоящий из двух параллельных линий, которые ограничивают движение цены. Нижняя линия (поддержка) соединяет локальные минимумы, верхняя (сопротивление) — максимумы. Каналы помогают определить направление тренда и найти точки входа.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие типы трендовых каналов существуют?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Выделяют три основных типа: восходящий канал (бычий тренд с повышающимися максимумами и минимумами), нисходящий канал (медвежий тренд с понижающимися экстремумами) и боковой канал (флет — горизонтальное движение цены в узком диапазоне).',
          },
        },
        {
          '@type': 'Question',
          name: 'Как правильно построить трендовый канал?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для восходящего канала: найдите два последовательных минимума (второй выше первого), соедините их линией поддержки, затем проведите параллельную линию сопротивления через максимум между ними. Для нисходящего — аналогично, но начинайте с максимумов.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие стратегии торговли используют с трендовыми каналами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Две основные стратегии: торговля внутри канала (покупка у поддержки, продажа у сопротивления) и торговля на пробой (вход после закрытия свечи за границей канала с подтверждением объёмом). Опытные трейдеры комбинируют оба подхода.',
          },
        },
        {
          '@type': 'Question',
          name: 'На каких таймфреймах лучше работают трендовые каналы?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Наиболее надёжные сигналы дают старшие таймфреймы: дневной (D1), недельный (W1) и месячный (MN). Они фильтруют рыночный шум и показывают значимые движения. Младшие таймфреймы (M5, H1) подходят для скальпинга, но требуют дополнительного подтверждения.',
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
      name: 'Как построить и использовать трендовый канал',
      description:
        'Пошаговая инструкция по построению трендового канала и применению его в торговле',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Определите направление тренда',
          text: 'Проанализируйте график и определите, формирует ли цена повышающиеся максимумы и минимумы (восходящий тренд), понижающиеся (нисходящий) или движется горизонтально (боковой).',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Найдите ключевые точки',
          text: 'Для восходящего тренда найдите минимум два последовательных минимума, где второй выше первого. Для нисходящего — два максимума, где второй ниже первого.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Постройте основную линию',
          text: 'Соедините найденные точки прямой линией. В восходящем канале это линия поддержки (по минимумам), в нисходящем — линия сопротивления (по максимумам).',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Проведите параллельную линию',
          text: 'Найдите экстремум между опорными точками и проведите через него линию, параллельную основной. Убедитесь, что линии образуют чёткий канал.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Применяйте канал в торговле',
          text: 'Используйте границы канала для входов: покупайте у поддержки в восходящем тренде, продавайте у сопротивления в нисходящем. При пробое границы с объёмом входите по направлению пробоя.',
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
      name: 'Глоссарий терминов трендовых каналов',
      description:
        'Ключевые термины, связанные с трендовыми каналами в техническом анализе',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Трендовый канал',
          description:
            'Инструмент технического анализа из двух параллельных линий, ограничивающих движение цены в рамках тренда',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Линия поддержки',
          description:
            'Нижняя граница канала, соединяющая локальные минимумы цены, где покупатели активизируются',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Линия сопротивления',
          description:
            'Верхняя граница канала, соединяющая локальные максимумы, где продавцы начинают доминировать',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Восходящий канал',
          description:
            'Ценовой канал с наклоном вверх, характеризующий бычий тренд с повышающимися максимумами и минимумами',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Нисходящий канал',
          description:
            'Ценовой канал с наклоном вниз, характеризующий медвежий тренд с понижающимися экстремумами',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Боковой канал',
          description:
            'Горизонтальный ценовой диапазон без выраженного тренда, также называемый флетом или консолидацией',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Пробой канала',
          description:
            'Выход цены за границу канала с закрытием свечи за линией, сигнализирующий о возможной смене тренда',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ретест уровня',
          description:
            'Возврат цены к пробитой линии канала для её тестирования перед продолжением движения',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Точка касания',
          description:
            'Момент, когда цена достигает границы канала и отскакивает, подтверждая её значимость',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ложный пробой',
          description:
            'Кратковременный выход цены за границу канала с последующим возвратом внутрь диапазона',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
