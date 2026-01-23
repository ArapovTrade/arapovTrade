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
  selector: 'app-home-uk-blog-fiveteen',
  templateUrl: './home-uk-blog-fiveteen.component.html',
  styleUrl: './home-uk-blog-fiveteen.component.scss',
})
export class HomeUkBlogFiveteenComponent implements OnInit {
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

    this.ukrGroups = this.artickleServ.getUkrainianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;
    this.titleService.setTitle(
      'Ф`ючерси: повний посібник з торгівлі | Arapov.trade',
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({
      name: 'description',
      content:
        'Що таке ф`ючерси та як ними торгувати? Детальний посібник по ф`ючерсних контрактах: типи, механізм роботи, стратегії торгівлі та управління ризиками.',
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
    { title: 'Швидкий старт', link: 'https://arapov.education/ua/course-ua/' },
    {
      title: 'Вступ до трейдингу',
      link: 'https://arapov.education/ua/reg-workshop-ua/',
    },
    { title: 'Професійні курси', link: 'https://arapov.trade/uk/studying' },
    {
      title: 'Базовий курс',
      link: 'https://arapov.trade/uk/freestudying/freeeducation',
    },
    {
      title: 'Копiтрейдинг',
      link: 'https://arapovcopytrade.com/ua/invest-ua/',
    },
  ];

  onGroupChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    this.router.navigate(['/uk/freestudying'], {
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
      article.groupsUkr.forEach((group) => {
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

    this.router.navigate(['/uk/freestudying', nextpage]);
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

    this.router.navigate(['/uk/freestudying', nextpage]);
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
          headline: "Ф'ючерси: повний посібник з торгівлі",
          description:
            "Комплексний посібник по ф'ючерсних контрактах. Типи ф'ючерсів, механізм роботи, переваги та ризики, стратегії для початківців та досвідчених трейдерів.",
          image: 'https://arapov.trade/assets/img/content/futurestrading.webp',
          author: {
            '@id': 'https://arapov.trade/uk#person',
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
      '@id': 'https://arapov.trade/uk#person',
      name: 'Ігор Арапов',
      url: 'https://arapov.trade/uk',
      image:
        'https://arapov.trade/assets/redesignArapovTrade/img/imageAuthor-light.png',
      sameAs: [
        'https://www.youtube.com/@ArapovTrade',
        'https://t.me/ArapovTrade',
      ],
      jobTitle: 'Професійний трейдер',
      description:
        'Активно торгую на фінансових ринках з 2013 року. Автор безкоштовного курсу з трейдингу.',
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
          name: "Що таке ф'ючерсний контракт?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Ф'ючерс — це стандартизований біржовий контракт, що зобов'язує сторони купити або продати певну кількість базового активу за фіксованою ціною у встановлену дату в майбутньому.",
          },
        },
        {
          '@type': 'Question',
          name: "Чим ф'ючерси відрізняються від опціонів?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Ф'ючерс — це зобов'язання виконати угоду, тоді як опціон дає право, але не зобов'язання. Покупець опціону може відмовитися від угоди, втративши лише премію.",
          },
        },
        {
          '@type': 'Question',
          name: "Яка маржа потрібна для торгівлі ф'ючерсами?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Маржа зазвичай становить 5-15% від вартості контракту. Точний розмір залежить від біржі та волатильності активу.',
          },
        },
        {
          '@type': 'Question',
          name: "Чи можна заробити на падінні ринку з ф'ючерсами?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Так, ф'ючерси дозволяють відкривати короткі позиції — продавати контракти з метою викупити дешевше. Це дає можливість заробляти на падаючих ринках.",
          },
        },
        {
          '@type': 'Question',
          name: "Які ф'ючерси краще для початківців?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Початківцям рекомендуються міні-ф'ючерси на індекси, такі як E-mini S&P 500. Вони мають менший розмір контракту та нижчі вимоги до маржі.",
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
      name: "Як почати торгувати ф'ючерсами",
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Вивчіть основи',
          text: "Розберіться в механізмі роботи ф'ючерсів: маржа, плече, експірація, специфікації контрактів.",
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Оберіть брокера',
          text: "Відкрийте рахунок у ліцензованого брокера з доступом до ф'ючерсних бірж.",
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Практикуйтесь на демо',
          text: 'Відпрацюйте стратегії на демо-рахунку мінімум 2-3 місяці.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Почніть з міні-контрактів',
          text: "Використовуйте міні або мікро-ф'ючерси для обмеження ризиків.",
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Впровадьте ризик-менеджмент',
          text: "Встановіть правила: максимум 1-2% ризику на угоду, обов'язкові стоп-лоси.",
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
      name: "Глосарій ф'ючерсної торгівлі",
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: "Ф'ючерсний контракт",
          description:
            'Стандартизована угода про купівлю або продаж базового активу за фіксованою ціною в майбутньому',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маржа',
          description:
            'Заставне забезпечення для відкриття та підтримання позиції',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кредитне плече',
          description:
            'Механізм управління позицією, що перевищує власний капітал трейдера',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Експірація',
          description: "Дата закінчення терміну дії ф'ючерсного контракту",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Хеджування',
          description:
            "Використання ф'ючерсів для захисту від несприятливої зміни цін",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маржин-кол',
          description:
            'Вимога брокера поповнити рахунок при падінні маржі нижче мінімального рівня',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Базовий актив',
          description:
            "Товар, валюта, індекс або інший інструмент, що лежить в основі ф'ючерсного контракту",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Відкритий інтерес',
          description:
            "Загальна кількість незакритих ф'ючерсних контрактів на ринку",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Контанго',
          description:
            "Ситуація, коли ціна ф'ючерса вища за спотову ціну базового активу",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Бекворація',
          description:
            "Ситуація, коли ціна ф'ючерса нижча за спотову ціну базового активу",
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
