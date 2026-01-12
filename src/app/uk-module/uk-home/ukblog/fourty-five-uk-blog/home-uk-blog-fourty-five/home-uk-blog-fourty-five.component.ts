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
  selector: 'app-home-uk-blog-fourty-five',
  templateUrl: './home-uk-blog-fourty-five.component.html',
  styleUrl: './home-uk-blog-fourty-five.component.scss',
})
export class HomeUkBlogFourtyFiveComponent implements OnInit {
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
      'Ковзні середні в трейдингу: повний посібник | ArapovTrade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Дізнайтеся, як використовувати ковзні середні (Moving Averages) у трейдингу. SMA, EMA, WMA — види, стратегії, приклади на реальних ринках та практичні рекомендації.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-04-17' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/movingaverages.png',
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
          headline:
            'Ковзні середні в трейдингу: повний посібник із застосування MA',
          description:
            'Детальний посібник з ковзних середніх у трейдингу. Види MA (SMA, EMA, WMA, SMMA), стратегії перетинів, практичні приклади на фондовому, криптовалютному та форекс ринках.',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-11-11T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/movingaverages',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/movingaverages.png',
            width: 1200,
            height: 630,
          },
          articleSection: 'Технічний аналіз',
          keywords:
            'ковзні середні, SMA, EMA, WMA, технічний аналіз, трейдинг, золотий хрест',
          inLanguage: 'uk',
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
          name: 'Що таке ковзне середнє у трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ковзне середнє (Moving Average, MA) — це технічний індикатор, який розраховує середню ціну активу за визначений період часу, згладжуючи цінові коливання та роблячи ринкові тренди більш помітними. MA допомагає трейдерам визначати напрямок тренду, знаходити точки входу та виходу, а також фільтрувати ринковий шум.',
          },
        },
        {
          '@type': 'Question',
          name: 'У чому різниця між SMA та EMA?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Просте ковзне середнє (SMA) розраховується як середнє арифметичне цін за обраний період, надаючи однакову вагу всім значенням. Експоненційне ковзне середнє (EMA) використовує експоненційну формулу, надаючи більшу вагу останнім ціновим даним, що робить його чутливішим до недавніх змін ринку. EMA краще підходить для короткострокової торгівлі, SMA — для аналізу довгострокових трендів.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке золотий хрест та мертвий хрест?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Золотий хрест — це бичачий сигнал, що виникає коли короткострокове ковзне середнє (наприклад, 50-денне) перетинає довгострокове (наприклад, 200-денне) знизу вгору, вказуючи на початок висхідного тренду. Мертвий хрест — ведмежий сигнал, коли короткострокове MA перетинає довгострокове згори вниз, сигналізуючи про можливий низхідний тренд.',
          },
        },
        {
          '@type': 'Question',
          name: 'Який період ковзного середнього краще використовувати?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Вибір періоду залежить від стилю торгівлі. Для скальпінгу та дейтрейдингу підходять короткострокові MA з періодами 9-21 день. Для свінг-трейдингу ефективні періоди 20-50 днів. Для довгострокових інвестицій та визначення глобального тренду використовують 100-200 денні ковзні середні. Рекомендується комбінувати декілька періодів для точнішого аналізу.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому ковзні середні погано працюють у флеті?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ковзні середні є трендовими індикаторами та ефективні при чіткому спрямованому русі ринку. Під час флету (бокового руху) ціна часто перетинає MA в обох напрямках, генеруючи безліч хибних сигналів. Для визначення флету використовуйте індикатор ADX: значення нижче 20 вказує на слабкий тренд, і торгівля за сигналами MA буде неефективною.',
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
      name: 'Як використовувати ковзні середні для торгівлі',
      description:
        'Покроковий посібник із застосування ковзних середніх у трейдингу для визначення трендів та пошуку точок входу.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Оберіть тип та період ковзного середнього',
          text: 'Визначте свій стиль торгівлі та оберіть відповідний тип MA. Для короткострокової торгівлі використовуйте EMA з періодами 9-21, для довгострокового аналізу — SMA 50-200. Налаштуйте індикатори на своїй торговій платформі.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Визначте напрямок тренду',
          text: 'Проаналізуйте положення ціни відносно ковзного середнього. Якщо ціна вище MA — тренд висхідний, якщо нижче — низхідний. Використовуйте 200-денне SMA для визначення глобального тренду на денному графіку.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Шукайте сигнали перетинів',
          text: 'Відстежуйте перетини ковзних середніх з різними періодами. Золотий хрест (короткострокове MA перетинає довгострокове знизу вгору) — сигнал на купівлю. Мертвий хрест (згори вниз) — сигнал на продаж.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Підтвердіть сигнал додатковими індикаторами',
          text: "Використовуйте RSI для перевірки перекупленості/перепроданості, MACD для підтвердження сили тренду, об'єми для валідації сигналу. Не входьте в позицію лише на основі одного індикатора.",
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Встановіть стоп-лосс та керуйте ризиками',
          text: 'Розмістіть стоп-лосс нижче найближчого рівня підтримки або на відстані 1-2 ATR від точки входу. Ризикуйте не більше 1-2% депозиту на угоду. Використовуйте MA як динамічний рівень для трейлінг-стопу.',
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
      name: 'Глосарій термінів ковзних середніх',
      description:
        "Основні терміни та визначення, пов'язані з ковзними середніми в технічному аналізі",
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Ковзне середнє (Moving Average)',
          description:
            'Технічний індикатор, що розраховує середню ціну активу за визначений період для згладжування цінових коливань та виявлення трендів.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'SMA (Simple Moving Average)',
          description:
            'Просте ковзне середнє, що обчислюється як середнє арифметичне цін закриття за обраний період часу.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'EMA (Exponential Moving Average)',
          description:
            'Експоненційне ковзне середнє, яке надає більшу вагу останнім ціновим даним, забезпечуючи швидшу реакцію на зміни ринку.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'WMA (Weighted Moving Average)',
          description:
            'Зважене ковзне середнє, що використовує лінійну шкалу ваг для надання більшого значення недавнім цінам.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Золотий хрест (Golden Cross)',
          description:
            'Бичачий сигнал, що виникає при перетині короткостроковим ковзним середнім довгострокового знизу вгору.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Мертвий хрест (Death Cross)',
          description:
            'Ведмежий сигнал, що формується при перетині короткостроковим ковзним середнім довгострокового згори вниз.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Період ковзного середнього',
          description:
            'Кількість часових інтервалів (свічок), що використовуються для розрахунку середнього значення ціни. Визначає чутливість індикатора.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Динамічна підтримка/опір',
          description:
            'Функція ковзного середнього як рівня, що змінюється, від якого ціна може відскакувати у напрямку тренду.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Запізнення індикатора (Lag)',
          description:
            'Властивість ковзних середніх реагувати на цінові зміни із затримкою, оскільки вони базуються на історичних даних.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Флет (Боковий рух)',
          description:
            'Стан ринку без вираженого спрямованого тренду, при якому ковзні середні генерують безліч хибних сигналів.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
