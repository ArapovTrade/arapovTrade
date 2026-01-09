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
  selector: 'app-home-ru-blog-fourty-four',
  templateUrl: './home-ru-blog-fourty-four.component.html',
  styleUrl: './home-ru-blog-fourty-four.component.scss',
})
export class HomeRuBlogFourtyFourComponent implements OnInit {
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
      'Что такое стейкинг криптовалюты? | Пассивный доход в крипте'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Стейкинг криптовалюты: как получать пассивный доход от блокировки токенов. Полное руководство по типам стейкинга, выбору платформы и минимизации рисков.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-27' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cryptostaking.webp',
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
            '@id': 'https://arapov.trade/ru/freestudying/cryptostaking',
          },
          headline:
            'Что такое стейкинг криптовалюты? Полное руководство по пассивному доходу',
          description:
            'Стейкинг криптовалюты: как получать пассивный доход от блокировки токенов. Полное руководство по типам стейкинга, выбору платформы и минимизации рисков.',
          image: 'https://arapov.trade/assets/img/content/cryptostaking1.webp',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov Trade',
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
          name: 'Что такое стейкинг криптовалюты и как он работает?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Стейкинг криптовалюты — это процесс блокировки токенов в специальном кошельке или на платформе для поддержки операций блокчейн-сети. За это участники получают вознаграждение в виде новых токенов. Механизм основан на консенсусе Proof-of-Stake, где валидаторы подтверждают транзакции пропорционально количеству заблокированных активов.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какую доходность можно получить от стейкинга?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Доходность стейкинга обычно составляет от 5% до 20% годовых в зависимости от выбранной криптовалюты и платформы. Например, стейкинг Ethereum приносит около 4-5% годовых, тогда как новые проекты могут предлагать ставки выше 15-20% для привлечения валидаторов.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие риски существуют при стейкинге криптовалют?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основные риски стейкинга включают волатильность цены токена (падение курса может нивелировать доход), блокировку ликвидности (невозможность быстро продать активы), технические уязвимости смарт-контрактов, инфляцию токена и риски недобросовестных валидаторов при делегированном стейкинге.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем отличается ликвидный стейкинг от обычного?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'При обычном стейкинге токены блокируются на определённый период и недоступны для операций. Ликвидный стейкинг позволяет получить производные токены (например, stETH вместо ETH), которые можно использовать для торговли или DeFi-операций, сохраняя при этом стейкинговый доход.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как выбрать надёжную платформу для стейкинга?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'При выборе платформы учитывайте репутацию и историю работы, наличие аудита безопасности, прозрачность условий вознаграждения, размер комиссий, условия блокировки активов и поддерживаемые криптовалюты. Проверенные платформы — Binance, Kraken, Lido Finance, Coinbase.',
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
      name: 'Как начать зарабатывать на стейкинге криптовалюты',
      description:
        'Пошаговая инструкция для начала заработка на стейкинге криптовалюты от выбора токена до получения первых вознаграждений',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Выберите криптовалюту для стейкинга',
          text: 'Изучите доступные PoS-криптовалюты: Ethereum, Cardano, Polkadot, Solana. Оцените их потенциал роста, историю проекта и размер стейкинговой доходности. Отдавайте предпочтение проверенным блокчейнам с активным сообществом.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Выберите тип и платформу стейкинга',
          text: 'Определитесь между одиночным, пуловым, делегированным или ликвидным стейкингом. Для начинающих рекомендуется пуловый или делегированный стейкинг на проверенных биржах (Binance, Kraken) или протоколах (Lido, Rocket Pool).',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Приобретите необходимое количество токенов',
          text: 'Купите криптовалюту на надёжной бирже. Учитывайте минимальные требования платформы для стейкинга. Для Ethereum 2.0 полный валидатор требует 32 ETH, но пулы позволяют участвовать с любой суммой.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Заблокируйте токены в стейкинге',
          text: 'Переведите токены на выбранную платформу и активируйте стейкинг. Внимательно изучите условия: период блокировки, размер комиссий, частоту выплат. При ликвидном стейкинге получите производные токены для дополнительных операций.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Мониторьте и оптимизируйте доходность',
          text: 'Регулярно отслеживайте начисление вознаграждений и состояние рынка. Реинвестируйте полученные токены для сложного процента. При необходимости диверсифицируйте между несколькими валидаторами или платформами для снижения рисков.',
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
      name: 'Глоссарий терминов криптостейкинга',
      description:
        'Ключевые термины и понятия, связанные со стейкингом криптовалюты',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Стейкинг',
          description:
            'Процесс блокировки криптовалюты для поддержки операций блокчейна и получения вознаграждений',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Proof-of-Stake (PoS)',
          description:
            'Механизм консенсуса, при котором валидаторы выбираются пропорционально количеству заблокированных токенов',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Валидатор',
          description:
            'Узел сети, подтверждающий транзакции и создающий новые блоки в PoS-блокчейне',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Делегированный стейкинг',
          description:
            'Передача токенов валидатору для стейкинга с сохранением права собственности',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ликвидный стейкинг',
          description:
            'Стейкинг с выпуском производных токенов, сохраняющих ликвидность заблокированных активов',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Пуловый стейкинг',
          description:
            'Объединение средств нескольких участников для совместного стейкинга',
        },
        {
          '@type': 'DefinedTerm',
          name: 'APY',
          description:
            'Annual Percentage Yield — годовая процентная доходность с учётом капитализации',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Слэшинг',
          description:
            'Штрафной механизм, при котором валидатор теряет часть заблокированных токенов за нарушения',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Период разблокировки',
          description:
            'Время ожидания вывода токенов после деактивации стейкинга',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Смарт-контракт',
          description:
            'Программный код в блокчейне, автоматически исполняющий условия стейкинга',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
