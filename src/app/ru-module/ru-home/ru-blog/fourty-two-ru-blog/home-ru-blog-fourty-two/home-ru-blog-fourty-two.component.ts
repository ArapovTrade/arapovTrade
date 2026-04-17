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
  selector: 'app-home-ru-blog-fourty-two',
  templateUrl: './home-ru-blog-fourty-two.component.html',
  styleUrl: './home-ru-blog-fourty-two.component.scss',
})
export class HomeRuBlogFourtyTwoComponent implements OnInit {
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
      'Риски криптовалют для новичков: как защитить капитал | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Риски криптовалют для новичков: волатильность, мошенничество, технические угрозы. Практические методы защиты капитала и безопасной торговли цифровыми активами.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-03' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cryptocurrencyrisks.webp',
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
          headline: 'Риски криптовалют для новичков: как защитить капитал',
          description:
            'Комплексный анализ рисков криптовалютного рынка: волатильность, мошенничество, регуляторные угрозы. Практические методы защиты инвестиций и безопасной торговли.',
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
          datePublished: '2026-03-25T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          image:
            'https://arapov.trade/assets/img/content/cryptocurrencyrisks1.webp',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/cryptocurrencyrisks',
          },
          articleSection: 'Криптовалюты',
          keywords: [
            'риски криптовалют',
            'волатильность',
            'мошенничество',
            'безопасность',
            'защита капитала',
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
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Какие основные риски криптовалют для новичков?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основные риски включают высокую волатильность цен, мошенничество и фишинг, технические сбои бирж, потерю доступа к кошелькам, отсутствие регулирования и непредсказуемость законодательства. Каждый из этих факторов может привести к полной потере инвестиций.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как защитить криптовалюту от мошенников?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Используйте аппаратные кошельки для хранения, включите двухфакторную аутентификацию, проверяйте URL-адреса сайтов, никогда не сообщайте приватные ключи, избегайте подозрительных проектов с нереалистичными обещаниями и храните seed-фразу в надёжном месте офлайн.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему криптовалюты такие волатильные?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Волатильность обусловлена спекулятивным характером рынка, низкой ликвидностью многих токенов, влиянием новостей и заявлений публичных лиц, действиями крупных держателей (китов), отсутствием централизованного регулирования и общей незрелостью рынка.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какую сумму безопасно инвестировать в криптовалюты?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Инвестируйте только те средства, потерю которых вы можете себе позволить. Для новичков рекомендуется начинать с 5-10% от инвестиционного портфеля. Никогда не используйте заёмные средства и деньги, необходимые для повседневных расходов.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое схема памп и дамп в криптовалютах?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Памп и дамп — манипулятивная схема, при которой организаторы искусственно завышают цену малоизвестного токена через ложную рекламу, привлекают инвесторов, а затем продают свои активы на пике, обрушивая цену и оставляя остальных с убытками.',
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
      name: 'Как минимизировать риски при торговле криптовалютами',
      description:
        'Пошаговое руководство по защите капитала на криптовалютном рынке',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Изучите основы рынка',
          text: 'Освойте принципы работы блокчейна, типы криптовалют и механизмы торговли до начала инвестирования.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Выберите надёжную платформу',
          text: 'Используйте проверенные биржи с хорошей репутацией, двухфакторной аутентификацией и страховыми фондами.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Обеспечьте безопасное хранение',
          text: 'Переводите крупные суммы на аппаратные кошельки, храните seed-фразу офлайн в нескольких местах.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Диверсифицируйте портфель',
          text: 'Распределите капитал между несколькими активами, не вкладывайте более 10% в один токен.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Используйте защитные инструменты',
          text: 'Устанавливайте стоп-лоссы, определите максимальный допустимый убыток и следуйте торговому плану.',
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
      name: 'Глоссарий терминов криптовалютных рисков',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Волатильность',
          description:
            'Степень изменчивости цены актива за определённый период времени',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Памп и дамп',
          description:
            'Манипулятивная схема искусственного завышения цены с последующей продажей на пике',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фишинг',
          description:
            'Мошенническая техника получения конфиденциальных данных через поддельные сайты и сообщения',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Приватный ключ',
          description:
            'Секретный криптографический код, дающий полный доступ к криптовалютному кошельку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Seed-фраза',
          description:
            'Набор слов для восстановления доступа к криптовалютному кошельку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Аппаратный кошелёк',
          description:
            'Физическое устройство для безопасного офлайн-хранения криптовалют',
        },
        {
          '@type': 'DefinedTerm',
          name: 'KYC',
          description:
            'Процедура верификации личности клиента на криптовалютных биржах',
        },
        {
          '@type': 'DefinedTerm',
          name: 'DeFi',
          description:
            'Децентрализованные финансы, финансовые сервисы на базе блокчейна без посредников',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Автоматический ордер на продажу актива при достижении заданного уровня убытка',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ликвидность',
          description:
            'Способность актива быстро продаваться без существенного влияния на его цену',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
