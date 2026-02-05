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
  selector: 'app-home-ru-blog-thirty-four',
  templateUrl: './home-ru-blog-thirty-four.component.html',
  styleUrl: './home-ru-blog-thirty-four.component.scss',
})
export class HomeRuBlogThirtyFourComponent implements OnInit {
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
      'Что такое стоп-лосс и как его выставлять | ArapovTrade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Полное руководство по стоп-лоссу в трейдинге. Как правильно рассчитать и выставить стоп-лосс, типичные ошибки, стратегии для разных стилей торговли.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-16' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/stoplossmain.png',
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
          headline: 'Что такое стоп-лосс и как его правильно выставлять',
          description:
            'Полное руководство по стоп-лоссу в трейдинге. Как правильно рассчитать и выставить стоп-лосс, типичные ошибки, стратегии для разных стилей торговли.',
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
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/stoploss',
          },
          image: 'https://arapov.trade/assets/img/content/stoploss1.png',
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
          name: 'Что такое стоп-лосс?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Стоп-лосс — это автоматический ордер, который закрывает позицию трейдера при достижении ценой заранее установленного уровня убытка. Основная цель — защитить капитал от значительных потерь.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какой процент риска оптимален для стоп-лосса?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Оптимальный риск составляет 1-2% от депозита на одну сделку. Это позволяет выдержать серию убыточных сделок без значительного урона для капитала.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как рассчитать стоп-лосс с помощью ATR?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'ATR показывает среднюю волатильность актива. Стоп-лосс устанавливается на расстоянии 1.5-2 ATR от точки входа, что учитывает естественные колебания цены.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему нельзя переносить стоп-лосс в сторону убытка?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Перенос стоп-лосса в убыточную сторону нарушает торговый план и может привести к катастрофическим потерям. Это признак эмоционального трейдинга.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое трейлинг-стоп?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Трейлинг-стоп — это динамический стоп-лосс, который автоматически перемещается вслед за ценой в прибыльном направлении, защищая накопленную прибыль.',
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
      name: 'Как правильно выставить стоп-лосс',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Определите риск на сделку',
          text: 'Установите максимальный процент риска на одну сделку (рекомендуется 1-2% от депозита).',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Найдите технический уровень',
          text: 'Определите ближайший уровень поддержки или сопротивления для размещения стоп-лосса.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Учтите волатильность',
          text: 'Используйте индикатор ATR для определения оптимального расстояния стоп-лосса.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Рассчитайте размер позиции',
          text: 'Вычислите объем позиции так, чтобы убыток в пунктах не превышал допустимый риск в деньгах.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Проверьте соотношение риск/прибыль',
          text: 'Убедитесь, что потенциальная прибыль минимум в 2 раза превышает риск.',
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
      name: 'Термины стоп-лосса',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Защитный ордер для автоматического закрытия позиции при достижении определенного уровня убытка',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тейк-профит',
          description:
            'Ордер для автоматической фиксации прибыли при достижении целевой цены',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ATR',
          description:
            'Average True Range — индикатор средней волатильности актива за определенный период',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Трейлинг-стоп',
          description:
            'Динамический стоп-лосс, следующий за ценой в прибыльном направлении',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Risk/Reward Ratio',
          description: 'Соотношение риска к потенциальной прибыли в сделке',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Проскальзывание',
          description:
            'Разница между ожидаемой и фактической ценой исполнения ордера',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Уровень поддержки',
          description:
            'Ценовой уровень, на котором ожидается остановка падения и разворот вверх',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Уровень сопротивления',
          description:
            'Ценовой уровень, на котором ожидается остановка роста и разворот вниз',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильность',
          description:
            'Степень изменчивости цены актива за определенный период',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Риск-менеджмент',
          description:
            'Система управления рисками для защиты торгового капитала',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
