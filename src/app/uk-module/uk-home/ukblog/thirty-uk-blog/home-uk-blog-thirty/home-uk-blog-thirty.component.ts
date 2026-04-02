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
  selector: 'app-home-uk-blog-thirty',
  templateUrl: './home-uk-blog-thirty.component.html',
  styleUrl: './home-uk-blog-thirty.component.scss',
})
export class HomeUkBlogThirtyComponent implements OnInit {
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
      'Криптовалюти: повний посібник для початківців трейдерів | Arapov.trade',
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({
      name: 'description',
      content:
        'Криптовалюти для початківців: як працює блокчейн, огляд Bitcoin та Ethereum, вибір біржі, стратегії торгівлі та управління ризиками.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-04-02' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cryptocurrencybasics.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.artickleServ.getRandomUkArticles();
  }

  hoveredIndex: number | null = null;

  projects = [
    { title: 'Книги з трейдингу', link: 'https://arapov.trade/uk/books' },
    { title: 'Професійні курси', link: 'https://arapov.trade/uk/studying' },
    {
      title: 'Базовий курс',
      link: 'https://arapov.trade/uk/freestudying/freeeducation',
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
          headline: 'Криптовалюти: повний посібник для початківців трейдерів',
          description:
            'Криптовалюти для початківців: як працює блокчейн, огляд Bitcoin та Ethereum, вибір біржі, стратегії торгівлі та управління ризиками.',
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
          datePublished: '2026-03-25T00:00:00Z',
          dateModified: '2026-03-31T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/cryptocurrencybasics',
          },
          image:
            'https://arapov.trade/assets/img/content/cryptocurrencybasics1.webp',
          articleSection: 'Навчання трейдингу',
          keywords: 'криптовалюти, трейдинг, блокчейн, Біткоїн, Ефіріум',
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
      alternateName: [
        'Igor Arapov',
        'Арапов Игорь',
        'I. Arapov',
        'Игорь Арапов',
        'І. В. Арапов',
        'Арапов Ігор',
        'Arapov Igor',
      ],
      url: 'https://arapov.trade/uk',
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
        'Незалежний дослідник',
        'трейдер',
        'автор і засновник arapov.trade',
      ],
      description:
        'Незалежний дослідник, практикуючий трейдер, автор книг з трейдингу та наукових публікацій. Спеціалізується на психології трейдингу та когнітивних упередженнях на фінансових ринках.',
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
          name: 'Скільки грошей потрібно для старту торгівлі криптовалютами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Більшість бірж дозволяють розпочати з мінімальних сум від 10 доларів. Для навчання рекомендується використовувати демо-рахунки, які дозволяють торгувати віртуальними коштами без ризику втрати реальних грошей.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які криптовалюти найкращі для новачків?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Bitcoin (BTC) та Ethereum (ETH) вважаються найбезпечнішими для початківців завдяки високій ліквідності та стабільності. Стейблкоїни (USDT, USDC) допомагають захистити капітал від волатильності.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи безпечно зберігати криптовалюту на біржі?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Зберігання на біржі зручне для активної торгівлі, але несе ризики злому. Для довгострокового зберігання рекомендуються апаратні гаманці (Ledger, Trezor), які зберігають приватні ключі офлайн.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке волатильність і чому вона важлива?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Волатильність — це міра коливання ціни активу. Висока волатильність криптовалют створює можливості для заробітку, але також збільшує ризики. Трейдери використовують волатильність для отримання прибутку на короткострокових рухах ціни.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як захистити свої криптоактиви від крадіжки?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Використовуйте двофакторну автентифікацію на всіх платформах, ніколи не діліться приватними ключами, зберігайте великі суми на апаратних гаманцях, уникайте підозрілих посилань та регулярно оновлюйте паролі.',
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
      name: 'Як розпочати торгівлю криптовалютами',
      description: 'Покрокова інструкція для початківців криптотрейдерів',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Вивчіть теоретичні основи',
          text: 'Опануйте базові поняття: блокчейн, гаманці, типи ордерів, технічний аналіз. Використовуйте безкоштовні ресурси: Binance Academy, CoinGecko Learn, тематичні YouTube-канали.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Оберіть надійну біржу',
          text: 'Порівняйте комісії, доступні інструменти та рівень безпеки різних платформ. Зверніть увагу на відгуки користувачів та регуляторний статус біржі.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Налаштуйте безпеку',
          text: 'Увімкніть двофакторну автентифікацію, створіть надійні паролі, розгляньте придбання апаратного гаманця для довгострокового зберігання.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Створіть торговий план',
          text: 'Визначте свої фінансові цілі, допустимий рівень ризику, стратегію входу та виходу з позицій. Встановіть правило ризикувати не більше 2% депозиту на одну угоду.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Практикуйтесь на демо-рахунку',
          text: 'Перед торгівлею реальними коштами відпрацюйте стратегію на демо-рахунку. Це допоможе зрозуміти механіку ринку без фінансових втрат.',
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
      name: 'Глосарій криптотрейдингу',
      description: 'Основні терміни та поняття криптовалютного трейдингу',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Криптовалюта',
          description:
            'Цифровий актив, що використовує криптографію для забезпечення безпеки транзакцій та контролю створення нових одиниць',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Блокчейн',
          description:
            "Розподілена база даних, що складається з послідовних блоків, кожен з яких містить інформацію про транзакції та зв'язаний з попереднім",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Біткоїн',
          description:
            'Перша децентралізована криптовалюта, створена у 2009 році з обмеженою емісією 21 мільйон монет',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильність',
          description:
            'Статистичний показник, що характеризує ступінь коливання ціни активу за певний період',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Захисний ордер, який автоматично закриває позицію при досягненні заданого рівня збитків',
        },
        {
          '@type': 'DefinedTerm',
          name: 'HODL',
          description:
            'Стратегія довгострокового утримання криптовалюти незалежно від ринкових коливань',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Альткоїн',
          description:
            'Будь-яка криптовалюта, окрім Bitcoin, що часто пропонує унікальні технічні рішення',
        },
        {
          '@type': 'DefinedTerm',
          name: 'DeFi',
          description:
            'Децентралізовані фінанси — екосистема фінансових додатків на блокчейні, що працюють без посередників',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Приватний ключ',
          description:
            'Секретний криптографічний код, що надає повний доступ до криптовалютного гаманця',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Смарт-контракт',
          description:
            'Програмний код на блокчейні, що автоматично виконує умови угоди без участі посередників',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
