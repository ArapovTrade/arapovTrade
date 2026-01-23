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
  selector: 'app-home-ru-blog-fiveteen',
  templateUrl: './home-ru-blog-fiveteen.component.html',
  styleUrl: './home-ru-blog-fiveteen.component.scss',
})
export class HomeRuBlogFiveteenComponent implements OnInit {
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
      'Фьючерсы: полное руководство по торговле | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Что такое фьючерсы и как ими торговать? Подробное руководство по фьючерсным контрактам: типы, механизм работы, стратегии торговли и управление рисками.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-10' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/futurestrading.webp',
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
          headline: 'Фьючерсы: полное руководство по торговле',
          description:
            'Комплексное руководство по фьючерсным контрактам. Типы фьючерсов, механизм работы, преимущества и риски, стратегии для начинающих и опытных трейдеров.',
          image: 'https://arapov.trade/assets/img/content/futurestrading.webp',
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
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/futurestrading',
          },
          articleSection: 'Обучение трейдингу',
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
          name: 'Что такое фьючерсный контракт?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Фьючерс — это стандартизированный биржевой контракт, обязывающий стороны купить или продать определённое количество базового актива по фиксированной цене в установленную дату в будущем. Контракты торгуются на регулируемых биржах.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем фьючерсы отличаются от опционов?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Фьючерс — это обязательство исполнить сделку, тогда как опцион даёт право, но не обязанность. Покупатель опциона может отказаться от сделки, потеряв только премию. Во фьючерсах обе стороны обязаны выполнить условия контракта.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какая маржа нужна для торговли фьючерсами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Маржа обычно составляет 5-15% от стоимости контракта. Например, для контракта на нефть стоимостью $50,000 маржа может быть $2,500-$7,500. Точный размер зависит от биржи и волатильности актива.',
          },
        },
        {
          '@type': 'Question',
          name: 'Можно ли заработать на падении рынка с фьючерсами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Да, фьючерсы позволяют открывать короткие позиции — продавать контракты, которых у вас нет, с целью выкупить дешевле. Это даёт возможность зарабатывать на падающих рынках.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие фьючерсы лучше для начинающих?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Начинающим рекомендуются мини-фьючерсы на индексы, такие как E-mini S&P 500. Они имеют меньший размер контракта, высокую ликвидность и более низкие требования к марже.',
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
      name: 'Как начать торговать фьючерсами',
      description:
        'Пошаговое руководство для начинающих трейдеров по освоению фьючерсных рынков',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Изучите основы',
          text: 'Разберитесь в механизме работы фьючерсов: маржа, плечо, экспирация, спецификации контрактов.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Выберите брокера',
          text: 'Откройте счёт у лицензированного брокера с доступом к фьючерсным биржам и конкурентными комиссиями.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Практикуйтесь на демо',
          text: 'Отработайте стратегии на демо-счёте минимум 2-3 месяца до перехода к реальной торговле.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Начните с мини-контрактов',
          text: 'Используйте мини или микро-фьючерсы для ограничения рисков при освоении рынка.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Внедрите риск-менеджмент',
          text: 'Установите правила: максимум 1-2% риска на сделку, обязательные стоп-лоссы, дневные лимиты потерь.',
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
      name: 'Глоссарий фьючерсной торговли',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Фьючерсный контракт',
          description:
            'Стандартизированное соглашение о покупке или продаже базового актива по фиксированной цене в будущем',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маржа',
          description:
            'Залоговое обеспечение, вносимое трейдером для открытия и поддержания позиции',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кредитное плечо',
          description:
            'Механизм, позволяющий управлять позицией, превышающей собственный капитал трейдера',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Экспирация',
          description: 'Дата истечения срока действия фьючерсного контракта',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Хеджирование',
          description:
            'Использование фьючерсов для защиты от неблагоприятного изменения цен базового актива',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маржин-колл',
          description:
            'Требование брокера пополнить счёт при падении маржи ниже минимального уровня',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Базовый актив',
          description:
            'Товар, валюта, индекс или другой инструмент, лежащий в основе фьючерсного контракта',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Открытый интерес',
          description:
            'Общее количество незакрытых фьючерсных контрактов на рынке',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Контанго',
          description:
            'Ситуация, когда цена фьючерса выше спотовой цены базового актива',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Бэквордация',
          description:
            'Ситуация, когда цена фьючерса ниже спотовой цены базового актива',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
