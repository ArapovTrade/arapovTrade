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
  selector: 'app-home-uk-blog-fifty-seven',
  templateUrl: './home-uk-blog-fifty-seven.component.html',
  styleUrl: './home-uk-blog-fifty-seven.component.scss',
})
export class HomeUkBlogFiftySevenComponent implements OnInit {
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

    this.ukrGroups = this.artickleServ.getUkrainianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;
    this.titleService.setTitle(
      'Індикатори в трейдингу: повний посібник з RSI та MACD'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Детальний посібник з індикаторів технічного аналізу RSI та MACD. Дізнайтеся, як застосовувати осцилятори для визначення точок входу та виходу з ринку.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-17' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/tradingindicators.webp',
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

    this.router.navigate(['/uk/freestudying', nextpage]);
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
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/tradingindicators',
          },
          headline: 'Індикатори в трейдингу: повний посібник з RSI та MACD',
          description:
            'Детальний посібник з індикаторів технічного аналізу RSI та MACD. Дізнайтеся, як застосовувати осцилятори для визначення точок входу та виходу з ринку.',
          image:
            'https://arapov.trade/assets/img/content/tradingindicators.webp',
          datePublished: '2024-06-15',
          dateModified: '2024-12-15',
          inLanguage: 'uk',
          author: {
            '@type': 'Person',
            '@id': 'https://arapov.trade/uk#person',
            name: 'Ігор Арапов',
            url: 'https://arapov.trade/uk',
            sameAs: [
              'https://www.youtube.com/@ArapovTrade',
              'https://www.mql5.com/ru/signals/2246716',
            ],
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov.Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          video: {
            '@type': 'VideoObject',
            name: 'Честный разговор об индикаторах в трейдинге',
            description:
              'Честный разговор об индикаторах в трейдинге от практика с 11-летним стажем. Игорь Арапов рассказывает, почему после 3 лет экспериментов с индикаторами полностью от них отказался и что использует вместо них.',
            thumbnailUrl: [
              'https://img.youtube.com/vi/t4eLSS2vh-w/maxresdefault.jpg',
              'https://img.youtube.com/vi/t4eLSS2vh-w/hqdefault.jpg',
            ],
            uploadDate: '2024-06-15',
            duration: 'PT12M35S',
            contentUrl: 'https://www.youtube.com/watch?v=t4eLSS2vh-w',
            embedUrl: 'https://www.youtube.com/embed/t4eLSS2vh-w',
            inLanguage: 'ru',
            keywords:
              'индикаторы трейдинг, Stochastic, Moving Average, MACD, объемный анализ, технический анализ',
            hasPart: [
              {
                '@type': 'Clip',
                name: 'Индикаторы в трейдинге - все плюсы и минусы использования',
                startOffset: 0,
                endOffset: 22,
                url: 'https://www.youtube.com/watch?v=t4eLSS2vh-w&t=0',
              },
              {
                '@type': 'Clip',
                name: 'Как трейдеры знакомятся с индикаторами',
                startOffset: 22,
                endOffset: 96,
                url: 'https://www.youtube.com/watch?v=t4eLSS2vh-w&t=22',
              },
              {
                '@type': 'Clip',
                name: 'Какие бывают индикаторы',
                startOffset: 96,
                endOffset: 129,
                url: 'https://www.youtube.com/watch?v=t4eLSS2vh-w&t=96',
              },
              {
                '@type': 'Clip',
                name: 'В чем проблема индикаторов',
                startOffset: 129,
                endOffset: 175,
                url: 'https://www.youtube.com/watch?v=t4eLSS2vh-w&t=129',
              },
              {
                '@type': 'Clip',
                name: 'Пример работы индикаторов',
                startOffset: 175,
                endOffset: 285,
                url: 'https://www.youtube.com/watch?v=t4eLSS2vh-w&t=175',
              },
              {
                '@type': 'Clip',
                name: 'Про индикатор ATR',
                startOffset: 285,
                endOffset: 321,
                url: 'https://www.youtube.com/watch?v=t4eLSS2vh-w&t=285',
              },
              {
                '@type': 'Clip',
                name: 'Почему индикаторы запаздывают?',
                startOffset: 321,
                endOffset: 755,
                url: 'https://www.youtube.com/watch?v=t4eLSS2vh-w&t=321',
              },
            ],
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
      '@id': 'https://arapov.trade/#person',
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
          name: 'Що таке індикатор RSI і як його застосовувати?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'RSI (Relative Strength Index) — осцилятор, що вимірює швидкість та амплітуду зміни ціни. Значення вище 70 вказують на перекупленість активу, нижче 30 — на перепроданість. Трейдери використовують RSI для пошуку точок розвороту та підтвердження сигналів дивергенції.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як працює індикатор MACD?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'MACD складається з лінії MACD (різниця між EMA 12 та EMA 26), сигнальної лінії (EMA 9 від лінії MACD) та гістограми. Перетин лінії MACD із сигнальною лінією знизу вгору генерує сигнал на купівлю, зверху вниз — на продаж.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які індикатори найкращі для визначення тренду?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для визначення тренду ефективні ковзні середні (SMA, EMA), індекс ADX, Параболік SAR та Ichimoku. Ці індикатори допомагають виявити напрямок руху ціни та оцінити силу поточного тренду.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи можна використовувати RSI та MACD одночасно?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Так, комбінація RSI та MACD підвищує точність торгових сигналів. RSI виявляє зони перекупленості та перепроданості, а MACD підтверджує напрямок тренду. Збіг сигналів обох індикаторів збільшує ймовірність успішної угоди.',
          },
        },
        {
          '@type': 'Question',
          name: 'На яких ринках застосовні індикатори RSI та MACD?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'RSI та MACD універсальні й застосовуються на форекс, фондовому ринку, криптовалютах та сировинних товарах. Налаштування періодів адаптуються під волатильність конкретного ринку та обраний таймфрейм.',
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
      name: 'Як торгувати з використанням індикаторів RSI та MACD',
      description:
        'Покрокова інструкція із застосування індикаторів RSI та MACD для пошуку торгових сигналів',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Визначте стан ринку',
          text: 'Використовуйте ADX або ковзні середні для визначення наявності тренду. Значення ADX вище 25 вказує на трендовий ринок, нижче 20 — на бокове рух.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Налаштуйте індикатори',
          text: 'Додайте RSI з періодом 14 та MACD зі стандартними налаштуваннями (12, 26, 9) на графік. Адаптуйте періоди під обраний таймфрейм.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Знайдіть сигнал RSI',
          text: 'Дочекайтеся виходу RSI із зони перекупленості (нижче 70) або перепроданості (вище 30). Перевірте наявність дивергенції між ціною та індикатором.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Підтвердіть сигнал MACD',
          text: 'Переконайтеся, що MACD підтверджує напрямок: перетин ліній має збігатися з сигналом RSI. Зростаюча гістограма підсилює надійність сигналу.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Встановіть рівні ризику',
          text: 'Розмістіть стоп-лосс за найближчим рівнем підтримки або опору. Розрахуйте тейк-профіт зі співвідношенням ризику до прибутку не менше 1:2.',
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
      name: 'Терміни індикаторів технічного аналізу',
      description:
        "Глосарій ключових термінів, пов'язаних із торговими індикаторами",
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'RSI',
          description:
            'Індекс відносної сили — осцилятор, що вимірює швидкість зміни ціни в діапазоні від 0 до 100',
        },
        {
          '@type': 'DefinedTerm',
          name: 'MACD',
          description:
            "Збіжність/розбіжність ковзних середніх — індикатор, що відображає взаємозв'язок між двома EMA",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Осцилятор',
          description:
            'Тип індикатора, що коливається між фіксованими значеннями для визначення перекупленості та перепроданості',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Дивергенція',
          description:
            'Розбіжність між напрямком руху ціни та показниками індикатора, що сигналізує про можливий розворот',
        },
        {
          '@type': 'DefinedTerm',
          name: 'EMA',
          description:
            'Експоненціальна ковзна середня, що надає більшу вагу останнім ціновим даним',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Перекупленість',
          description:
            'Стан ринку, за якого актив торгується вище справедливої вартості та ймовірна корекція вниз',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Перепроданість',
          description:
            'Стан ринку, за якого актив торгується нижче справедливої вартості та ймовірний відскок вгору',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ATR',
          description:
            'Середній істинний діапазон — індикатор волатильності, що вимірює середню амплітуду цінових коливань',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Bollinger Bands',
          description:
            'Смуги Боллінджера — індикатор волатильності з трьох ліній, що формують динамічний канал навколо ціни',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Сигнальна лінія',
          description:
            'У контексті MACD — ковзна середня від лінії MACD, що використовується для генерації торгових сигналів',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
