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
  selector: 'app-home-ru-blog-thirty-nine',
  templateUrl: './home-ru-blog-thirty-nine.component.html',
  styleUrl: './home-ru-blog-thirty-nine.component.scss',
})
export class HomeRuBlogThirtyNineComponent implements OnInit {
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
      'Где безопасно хранить криптовалюту | Полное руководство'
    );
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Полное руководство по безопасному хранению криптовалют. Сравнение горячих и холодных кошельков, защита приватных ключей, комбинированные стратегии для сохранности цифровых активов.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-23' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/safetostorecrypto.webp',
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
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/safetostorecrypto',
          },
          headline:
            'Где безопасно хранить криптовалюту: полное руководство по защите цифровых активов',
          description:
            'Полное руководство по безопасному хранению криптовалют. Сравнение горячих и холодных кошельков, защита приватных ключей, комбинированные стратегии для сохранности цифровых активов.',
          image:
            'https://arapov.trade/assets/img/content/safetostorecrypto.webp',
          author: {
            '@type': 'Person',
            name: 'Игорь Арапов',
            url: 'https://arapov.trade/ru',
            sameAs: [
              'https://www.youtube.com/@ArapovTrade',
              'https://t.me/ArapovTrade',
            ],
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/content/favicon.ico',
            },
          },
          datePublished: '2025-06-15T00:00:00Z',
          dateModified: '2025-12-04T00:00:00Z',
          articleBody:
            'Защита криптовалютных активов требует глубокого понимания различных методов хранения и потенциальных угроз. Владельцы цифровых валют несут полную ответственность за сохранность своих средств, поскольку децентрализованная природа блокчейна исключает возможность обращения в банк или службу поддержки для восстановления утраченных активов.',
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
          name: 'Какой тип кошелька лучше выбрать для хранения криптовалюты?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Выбор зависит от ваших целей: горячие кошельки подходят для активной торговли и ежедневных операций благодаря быстрому доступу, тогда как холодные кошельки (аппаратные устройства Ledger, Trezor) рекомендуются для долгосрочного хранения крупных сумм из-за изоляции от интернета и повышенной безопасности.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое сид-фраза и почему её важно защищать?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Сид-фраза (seed phrase) — это набор из 12 или 24 слов, который позволяет восстановить доступ к криптовалютному кошельку. Эта фраза является единственным способом восстановить активы при потере устройства, поэтому её необходимо хранить в надёжном месте оффлайн, никогда не фотографировать и не передавать третьим лицам.',
          },
        },
        {
          '@type': 'Question',
          name: 'Безопасно ли хранить криптовалюту на бирже?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Хранение на биржах удобно для активной торговли, но связано с рисками: биржи могут подвергнуться взлому, заморозить активы или обанкротиться. Рекомендуется держать на биржевых кошельках только средства для текущих операций, а основную часть активов переводить на личные кошельки под собственным контролем.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое мультиподпись и когда её стоит использовать?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Мультиподпись (multisig) — технология, требующая нескольких подписей для подтверждения транзакции. Она полезна для корпоративного управления криптоактивами, семейных инвестиций и ситуаций, когда нужно распределить контроль между несколькими участниками для повышения безопасности.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как защитить криптовалюту от фишинговых атак?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Всегда проверяйте URL-адреса сайтов перед вводом данных, скачивайте приложения только из официальных источников, используйте закладки для доступа к биржам и кошелькам, никогда не переходите по ссылкам из писем или сообщений, активируйте двухфакторную аутентификацию на всех платформах.',
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
      name: 'Как организовать безопасное хранение криптовалюты',
      description:
        'Пошаговое руководство по настройке надёжной системы хранения криптовалютных активов с использованием комбинированных стратегий.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Оценка портфеля и распределение активов',
          text: 'Определите объём ваших криптоактивов и разделите их на категории: средства для активной торговли (5-10%), оперативный резерв (10-20%) и долгосрочные инвестиции (70-85%). Это распределение определит выбор типов кошельков.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Выбор и приобретение аппаратного кошелька',
          text: 'Для долгосрочного хранения приобретите аппаратный кошелёк (Ledger, Trezor, SafePal) исключительно у официального производителя. Проверьте целостность упаковки и наличие защитных пломб перед использованием.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Настройка кошельков и создание резервных копий',
          text: 'Инициализируйте устройства, запишите сид-фразы на физические носители (бумага, металлические пластины), создайте несколько копий и разместите их в разных безопасных местах (сейф, банковская ячейка).',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Настройка многоуровневой защиты',
          text: 'Активируйте двухфакторную аутентификацию на всех платформах через приложения (Google Authenticator, Authy), установите уникальные сложные пароли для каждого сервиса, при необходимости настройте мультиподпись.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Регулярный аудит и обновление безопасности',
          text: 'Периодически проверяйте актуальность прошивок кошельков, анализируйте историю транзакций на подозрительную активность, обновляйте пароли, проверяйте сохранность резервных копий и следите за новыми угрозами в криптопространстве.',
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
      name: 'Глоссарий терминов безопасности криптовалют',
      description:
        'Основные термины, связанные с безопасным хранением криптовалютных активов',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Приватный ключ',
          description:
            'Криптографический код, обеспечивающий полный контроль над криптовалютными средствами на связанном адресе блокчейна.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Сид-фраза',
          description:
            'Мнемоническая последовательность из 12-24 слов для восстановления доступа к криптовалютному кошельку.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Горячий кошелёк',
          description:
            'Криптовалютный кошелёк с постоянным подключением к интернету, обеспечивающий быстрый доступ к активам.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Холодный кошелёк',
          description:
            'Способ хранения криптовалюты без подключения к сети, обеспечивающий максимальную защиту от удалённых атак.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Аппаратный кошелёк',
          description:
            'Физическое устройство для хранения приватных ключей в изолированной среде, защищённой от вредоносного ПО.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Мультиподпись',
          description:
            'Технология, требующая нескольких независимых подписей для авторизации криптовалютной транзакции.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Двухфакторная аутентификация',
          description:
            'Метод защиты аккаунта, требующий подтверждения личности двумя независимыми способами.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фишинговая атака',
          description:
            'Мошенническая схема получения конфиденциальных данных через поддельные сайты или сообщения.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кастодиальное хранение',
          description:
            'Модель хранения криптовалюты, при которой приватные ключи контролируются третьей стороной (биржей, сервисом).',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Некастодиальное хранение',
          description:
            'Способ хранения, при котором владелец полностью контролирует приватные ключи и несёт ответственность за безопасность.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
