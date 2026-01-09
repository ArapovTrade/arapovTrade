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
  selector: 'app-home-uk-blog-fourty-four',
  templateUrl: './home-uk-blog-fourty-four.component.html',
  styleUrl: './home-uk-blog-fourty-four.component.scss',
})
export class HomeUkBlogFourtyFourComponent implements OnInit {
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
      'Що таке стейкінг криптовалюти? | Пасивний дохід у крипті'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Стейкінг криптовалюти: як отримувати пасивний дохід від блокування токенів. Повний посібник з типів стейкінгу, вибору платформи та мінімізації ризиків.',
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
            '@id': 'https://arapov.trade/uk/freestudying/cryptostaking',
          },
          headline:
            'Що таке стейкінг криптовалюти? Повний посібник з пасивного доходу',
          description:
            'Стейкінг криптовалюти: як отримувати пасивний дохід від блокування токенів. Повний посібник з типів стейкінгу, вибору платформи та мінімізації ризиків.',
          image: 'https://arapov.trade/assets/img/content/cryptostaking1.webp',
          author: {
            '@id': 'https://arapov.trade/uk#person',
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
          name: 'Що таке стейкінг криптовалюти і як він працює?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Стейкінг криптовалюти — це процес блокування токенів у спеціалізованому гаманці або на платформі для забезпечення роботи блокчейн-мережі. Натомість учасники отримують винагороду у вигляді нових токенів. Механізм ґрунтується на консенсусі Proof-of-Stake, де валідатори підтверджують транзакції пропорційно обсягу заблокованих активів.',
          },
        },
        {
          '@type': 'Question',
          name: 'Яку дохідність можна отримати від стейкінгу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Дохідність стейкінгу зазвичай становить від 5% до 20% річних залежно від обраної криптовалюти та платформи. Наприклад, стейкінг Ethereum приносить близько 4-5% річних, тоді як нові проекти можуть пропонувати ставки понад 15-20% для залучення валідаторів.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які ризики існують при стейкінгу криптовалют?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Головні ризики стейкінгу охоплюють волатильність ціни токена (падіння курсу може нівелювати дохід), блокування ліквідності (неможливість швидко продати активи), технічні вразливості смарт-контрактів, інфляцію токена та ризики недобросовісних валідаторів при делегованому стейкінгу.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чим відрізняється ліквідний стейкінг від звичайного?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'При звичайному стейкінгу токени блокуються на визначений період і недоступні для операцій. Ліквідний стейкінг дозволяє отримати похідні токени (наприклад, stETH замість ETH), які можна використовувати для торгівлі або DeFi-операцій, зберігаючи при цьому стейкінговий дохід.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як обрати надійну платформу для стейкінгу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'При виборі платформи враховуйте репутацію та історію роботи, наявність аудиту безпеки, прозорість умов винагородження, розмір комісій, умови блокування активів та підтримувані криптовалюти. Перевірені платформи — Binance, Kraken, Lido Finance, Coinbase.',
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
      name: 'Як розпочати заробляти на стейкінгу криптовалюти',
      description:
        'Покрокова інструкція для початку заробітку на стейкінгу криптовалюти від вибору токена до отримання перших винагород',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Оберіть криптовалюту для стейкінгу',
          text: 'Вивчіть доступні PoS-криптовалюти: Ethereum, Cardano, Polkadot, Solana. Оцініть їхній потенціал зростання, історію проекту та розмір стейкінгової дохідності. Віддавайте перевагу перевіреним блокчейнам з активною спільнотою.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Оберіть тип та платформу стейкінгу',
          text: 'Визначтеся між одиночним, пуловим, делегованим або ліквідним стейкінгом. Для початківців рекомендується пуловий або делегований стейкінг на перевірених біржах (Binance, Kraken) або протоколах (Lido, Rocket Pool).',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Придбайте необхідну кількість токенів',
          text: 'Купіть криптовалюту на надійній біржі. Враховуйте мінімальні вимоги платформи для стейкінгу. Для Ethereum 2.0 повний валідатор потребує 32 ETH, але пули дозволяють брати участь з будь-якою сумою.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Заблокуйте токени у стейкінгу',
          text: 'Переведіть токени на обрану платформу та активуйте стейкінг. Уважно вивчіть умови: період блокування, розмір комісій, частоту виплат. При ліквідному стейкінгу отримайте похідні токени для додаткових операцій.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Моніторте та оптимізуйте дохідність',
          text: 'Регулярно відстежуйте нарахування винагород та стан ринку. Реінвестуйте отримані токени для складного відсотка. За необхідності диверсифікуйте між кількома валідаторами або платформами для зниження ризиків.',
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
      name: 'Глосарій термінів криптостейкінгу',
      description:
        "Ключові терміни та поняття, пов'язані зі стейкінгом криптовалюти",
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Стейкінг',
          description:
            'Процес блокування криптовалюти для підтримки операцій блокчейну та отримання винагород',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Proof-of-Stake (PoS)',
          description:
            'Механізм консенсусу, при якому валідатори обираються пропорційно кількості заблокованих токенів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Валідатор',
          description:
            'Вузол мережі, що підтверджує транзакції та створює нові блоки в PoS-блокчейні',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Делегований стейкінг',
          description:
            'Передача токенів валідатору для стейкінгу зі збереженням права власності',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ліквідний стейкінг',
          description:
            'Стейкінг з випуском похідних токенів, що зберігають ліквідність заблокованих активів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Пуловий стейкінг',
          description:
            "Об'єднання коштів кількох учасників для спільного стейкінгу",
        },
        {
          '@type': 'DefinedTerm',
          name: 'APY',
          description:
            'Annual Percentage Yield — річна відсоткова дохідність з урахуванням капіталізації',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Слешінг',
          description:
            'Штрафний механізм, при якому валідатор втрачає частину заблокованих токенів за порушення',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Період розблокування',
          description:
            'Час очікування виведення токенів після деактивації стейкінгу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Смарт-контракт',
          description:
            'Програмний код у блокчейні, що автоматично виконує умови стейкінгу',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
