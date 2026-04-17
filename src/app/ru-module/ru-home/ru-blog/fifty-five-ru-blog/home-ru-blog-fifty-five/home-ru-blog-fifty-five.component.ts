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
  selector: 'app-home-ru-blog-fifty-five',
  templateUrl: './home-ru-blog-fifty-five.component.html',
  styleUrl: './home-ru-blog-fifty-five.component.scss',
})
export class HomeRuBlogFiftyFiveComponent implements OnInit {
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
      'Скальпинг в трейдинге: Полное руководство | ArapovTrade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Скальпинг в трейдинге: стратегии, инструменты и риск-менеджмент. Полное руководство для начинающих трейдеров по краткосрочной торговле на Forex, криптовалютах и фондовом рынке.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-04' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/scalpingintrading.webp',
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
            'https://arapov.trade/ru/freestudying/scalpingintrading#article',
          headline: 'Скальпинг в трейдинге: Полное руководство для начинающих',
          description:
            'Скальпинг в трейдинге: стратегии, инструменты и риск-менеджмент. Полное руководство для начинающих трейдеров по краткосрочной торговле.',
          image:
            'https://arapov.trade/assets/img/content/scalpingintrading.webp',
          datePublished: '2026-03-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
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
            '@id': 'https://arapov.trade/ru/freestudying/scalpingintrading',
          },
          articleSection: 'Трейдинг',
          keywords: [
            'скальпинг',
            'скальпинг стратегии',
            'внутридневная торговля',
            'краткосрочная торговля',
            'риск-менеджмент',
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
      '@id': 'https://arapov.trade/ru/freestudying/scalpingintrading#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Что такое скальпинг в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Скальпинг — это стратегия краткосрочной торговли, при которой трейдер открывает и закрывает множество сделок в течение дня, извлекая прибыль из минимальных ценовых колебаний. Позиции удерживаются от нескольких секунд до нескольких минут.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие таймфреймы используются в скальпинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Скальперы работают на коротких таймфреймах: M1 (1 минута) для быстрого анализа, M5 (5 минут) для подтверждения тренда и M15 (15 минут) для фильтрации ложных сигналов и более широкого обзора рынка.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какой капитал нужен для скальпинга?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Минимальный капитал зависит от рынка и брокера. На Forex можно начать с 500-1000 долларов благодаря кредитному плечу. Важнее не сумма, а правильный риск-менеджмент — риск на сделку не должен превышать 1-2% от депозита.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие индикаторы лучше использовать для скальпинга?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Популярные индикаторы для скальпинга: скользящие средние (MA) для определения тренда, Bollinger Bands для выявления волатильности, RSI для определения перекупленности/перепроданности, MACD для подтверждения сигналов входа и выхода.',
          },
        },
        {
          '@type': 'Question',
          name: 'Подходит ли скальпинг для начинающих трейдеров?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Скальпинг требует высокой концентрации, быстрой реакции и эмоциональной устойчивости. Новичкам рекомендуется сначала освоить базовые принципы трейдинга, потренироваться на демо-счёте и выработать чёткую торговую систему перед переходом к реальной торговле.',
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
      '@id': 'https://arapov.trade/ru/freestudying/scalpingintrading#howto',
      name: 'Как начать скальпинг: пошаговое руководство',
      description:
        'Пошаговая инструкция для начинающих скальперов по освоению краткосрочной торговли на финансовых рынках.',
      totalTime: 'P30D',
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'USD',
        value: '500',
      },
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Выберите рынок и брокера',
          text: 'Определитесь с рынком (Forex, криптовалюты, акции) и выберите надёжного брокера с низкими спредами, быстрым исполнением ордеров и поддержкой ECN-счетов.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Освойте торговую платформу',
          text: 'Изучите функционал торговой платформы (MetaTrader 4/5, cTrader). Настройте графики, индикаторы и горячие клавиши для быстрого открытия и закрытия позиций.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Разработайте торговую стратегию',
          text: 'Выберите и протестируйте стратегию скальпинга: по тренду, на уровнях поддержки/сопротивления или на новостях. Определите чёткие правила входа и выхода.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Практикуйтесь на демо-счёте',
          text: 'Отработайте стратегию на демо-счёте минимум 2-4 недели. Анализируйте результаты, ведите торговый дневник и корректируйте подход.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Переходите к реальной торговле',
          text: 'Начните торговать реальными деньгами с минимальным лотом. Соблюдайте риск-менеджмент: стоп-лосс на каждую сделку, не более 1-2% риска от депозита, дневной лимит убытков.',
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
      '@id': 'https://arapov.trade/ru/freestudying/scalpingintrading#glossary',
      name: 'Глоссарий терминов скальпинга',
      description: 'Основные термины и понятия, используемые в скальпинге',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Скальпинг',
          description:
            'Стратегия краткосрочной торговли с множеством сделок в день, направленная на извлечение прибыли из минимальных ценовых движений.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спред',
          description:
            'Разница между ценой покупки (Ask) и ценой продажи (Bid) финансового инструмента. Низкий спред критичен для прибыльного скальпинга.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Таймфрейм',
          description:
            'Временной интервал отображения ценового графика. Скальперы используют короткие таймфреймы: M1, M5, M15.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Защитный ордер для автоматического закрытия убыточной позиции при достижении определённого уровня цены.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кредитное плечо',
          description:
            'Механизм, позволяющий торговать суммами, превышающими собственный капитал. Увеличивает как потенциальную прибыль, так и риски.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ликвидность',
          description:
            'Способность актива быстро покупаться или продаваться без существенного влияния на его цену. Высокая ликвидность важна для скальпинга.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Проскальзывание',
          description:
            'Разница между ожидаемой ценой исполнения ордера и фактической ценой. Негативно влияет на результаты скальпинга.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ECN-счёт',
          description:
            'Тип торгового счёта с прямым доступом к межбанковскому рынку, обеспечивающий низкие спреды и быстрое исполнение.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильность',
          description:
            'Степень изменчивости цены актива. Умеренная волатильность создаёт возможности для скальпинга.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Риск-менеджмент',
          description:
            'Система управления рисками в торговле, включающая определение размера позиции, установку стоп-лоссов и лимитов убытков.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
