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
  selector: 'app-home-ru-blog-fifty-four',
  templateUrl: './home-ru-blog-fifty-four.component.html',
  styleUrl: './home-ru-blog-fifty-four.component.scss',
})
export class HomeRuBlogFiftyFourComponent implements OnInit {
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
      'Как обеспечить безопасность криптовалюты | Полное руководство'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Полное руководство по обеспечению безопасности криптовалюты. Защита от хакеров и фишинга, настройка двухфакторной аутентификации, безопасное хранение крупных сумм цифровых активов.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-28' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cryptosafe.webp',
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
            '@id': 'https://arapov.trade/ru/freestudying/cryptosafe',
          },
          headline:
            'Как обеспечить безопасность криптовалюты: полное руководство по защите цифровых активов',
          description:
            'Полное руководство по обеспечению безопасности криптовалюты. Защита от хакеров и фишинга, настройка двухфакторной аутентификации, безопасное хранение крупных сумм цифровых активов.',
          image: 'https://arapov.trade/assets/img/content/cryptosafe1.webp',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/content/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-12T00:00:00Z',
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
          name: 'Какие основные угрозы существуют для криптовалютных активов?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ключевые угрозы включают: хакерские атаки на биржи и кошельки, фишинговые схемы с поддельными сайтами, потерю приватных ключей или сид-фраз, физическую кражу устройств хранения, ошибки пользователей при переводах и мошеннические проекты, обещающие высокую доходность.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему двухфакторная аутентификация важна для защиты криптовалюты?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Двухфакторная аутентификация создаёт дополнительный барьер безопасности: даже если злоумышленник узнает пароль, без второго фактора (кода из приложения-аутентификатора) доступ к аккаунту невозможен. Рекомендуется использовать Google Authenticator или Authy вместо SMS-кодов.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как распознать фишинговую атаку в криптосфере?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Признаки фишинга: незначительные изменения в URL-адресе сайта, срочные требования ввести данные, письма с угрозами блокировки аккаунта, запросы приватных ключей или сид-фраз. Легитимные сервисы никогда не запрашивают приватные ключи ни при каких обстоятельствах.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие меры предосторожности нужны для хранения крупных сумм криптовалюты?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Используйте аппаратные кошельки для холодного хранения, разделяйте активы между несколькими кошельками, настройте мультиподпись для транзакций, регулярно проводите аудит безопасности, храните резервные копии ключей в физически защищённых местах (сейф, банковская ячейка).',
          },
        },
        {
          '@type': 'Question',
          name: 'Безопасно ли использовать публичные Wi-Fi сети для криптовалютных операций?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Категорически не рекомендуется использовать публичные Wi-Fi для доступа к криптовалютным аккаунтам — такие сети легко перехватываются злоумышленниками. При необходимости работы вне дома используйте мобильный интернет или VPN с надёжным шифрованием.',
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
      name: 'Как настроить комплексную защиту криптовалютных активов',
      description:
        'Пошаговое руководство по созданию многоуровневой системы безопасности для криптовалюты.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Аудит текущего состояния безопасности',
          text: 'Проведите инвентаризацию всех криптоактивов и мест их хранения. Оцените уровень защиты каждого кошелька и платформы, выявите слабые места и составьте план их устранения.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Настройка двухфакторной аутентификации',
          text: 'Установите приложение-аутентификатор (Google Authenticator, Authy) и активируйте 2FA на всех криптовалютных платформах, биржах и электронной почте. Сохраните резервные коды восстановления в безопасном месте.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Организация безопасного хранения ключей',
          text: 'Переведите основную часть активов на аппаратный кошелёк. Запишите сид-фразу на физический носитель (бумага, металлическая пластина) и разместите копии в нескольких защищённых локациях.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Создание системы паролей',
          text: 'Установите менеджер паролей и сгенерируйте уникальные сложные пароли для каждой криптоплатформы. Избегайте повторного использования паролей и регулярно обновляйте их.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Внедрение регулярного мониторинга',
          text: 'Настройте уведомления о входах в аккаунты и транзакциях. Периодически проверяйте историю активности, обновляйте прошивки кошельков и следите за новостями о безопасности используемых платформ.',
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
      name: 'Глоссарий криптовалютной безопасности',
      description:
        'Основные термины, связанные с защитой криптовалютных активов',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Двухфакторная аутентификация',
          description:
            'Метод защиты аккаунта, требующий подтверждения личности двумя независимыми способами — паролем и временным кодом.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фишинг',
          description:
            'Мошенническая схема получения конфиденциальных данных через поддельные сайты, письма или сообщения.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Холодное хранение',
          description:
            'Метод хранения криптовалюты на устройствах без подключения к интернету для максимальной защиты от удалённых атак.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Горячий кошелёк',
          description:
            'Криптовалютный кошелёк с постоянным интернет-подключением, удобный для оперативных транзакций.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Мультиподпись',
          description:
            'Технология, требующая нескольких независимых подписей для авторизации транзакции.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Сид-фраза',
          description:
            'Мнемоническая последовательность слов для восстановления доступа к криптовалютному кошельку.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Приватный ключ',
          description:
            'Криптографический код, обеспечивающий полный контроль над криптовалютными средствами.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Социальная инженерия',
          description:
            'Методы психологического манипулирования людьми для получения конфиденциальной информации.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'VPN',
          description:
            'Виртуальная частная сеть, шифрующая интернет-трафик и скрывающая реальный IP-адрес пользователя.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Аппаратный кошелёк',
          description:
            'Физическое устройство для хранения приватных ключей в изолированной защищённой среде.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
