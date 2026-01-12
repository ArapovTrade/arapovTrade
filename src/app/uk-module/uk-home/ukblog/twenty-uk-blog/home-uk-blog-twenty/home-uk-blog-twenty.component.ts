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
  selector: 'app-home-uk-blog-twenty',
  templateUrl: './home-uk-blog-twenty.component.html',
  styleUrl: './home-uk-blog-twenty.component.scss',
})
export class HomeUkBlogTwentyComponent implements OnInit {
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
    this.titleService.setTitle('Що таке скам у криптовалюті | Arapov.trade');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({
      name: 'description',
      content:
        'Що таке скам у криптовалюті: види шахрайства, ознаки фейкових проєктів, фішинг, піраміди та способи захисту ваших криптоактивів від шахраїв.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-21' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cryptoscam.webp',
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
          headline: 'Що таке скам у криптовалюті: види шахрайства та захист',
          description:
            'Що таке скам у криптовалюті: види шахрайства, ознаки фейкових проєктів, фішинг, піраміди та способи захисту ваших криптоактивів від шахраїв.',
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
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/cryptoscam',
          },
          image: 'https://arapov.trade/assets/img/content/cryptoscam1.webp',
          articleSection: 'Навчання трейдингу',
          keywords: [
            'скам криптовалюта',
            'шахрайство',
            'фішинг',
            'криптопіраміди',
            'безпека',
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
          name: 'Що таке скам у криптовалюті?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Скам у криптовалюті — це шахрайство, спрямоване на крадіжку коштів або особистих даних користувачів. Включає фейкові ICO, фішингові атаки, пірамідальні схеми та підроблені біржі. Шахраї використовують довірливість та брак знань для обману як новачків, так і досвідчених інвесторів.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як розпізнати криптовалютний скам?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ознаки скаму: нереалістичні обіцянки гарантованого прибутку, анонімна команда без публічних профілів, відсутність White Paper або дорожньої карти, тиск на термінове прийняття рішень, ухилення від запитань про структуру проєкту.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які види криптоскаму найпоширеніші?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основні види: фейкові ICO з професійними сайтами без реального продукту, фішингові сайти що копіюють біржі, піраміди Понці з виплатами за рахунок нових учасників, підроблені біржі що не дозволяють вивести кошти, rug pull у DeFi проєктах.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як захистити свої криптоактиви від шахраїв?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Використовуйте апаратні гаманці для зберігання, увімкніть двофакторну автентифікацію, перевіряйте URL сайтів перед введенням даних, вивчайте проєкти через незалежні джерела, ніколи не діліться приватними ключами та seed-фразами.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що робити якщо став жертвою криптоскаму?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Негайно змініть паролі на всіх пов'язаних акаунтах, повідомте про шахрайство в правоохоронні органи та на платформу де стався інцидент, попередьте спільноту в соціальних мережах, збережіть усі докази для можливого розслідування.",
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
      name: 'Як захиститися від криптовалютного скаму',
      description:
        'Покрокова інструкція із захисту ваших криптоактивів від шахраїв',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Перевірте проєкт перед інвестуванням',
          text: 'Вивчіть White Paper, команду розробників, їхні публічні профілі в LinkedIn. Перевірте історію проєкту та відгуки на незалежних платформах на кшталт Reddit та BitcoinTalk.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Використовуйте надійні гаманці та біржі',
          text: 'Зберігайте криптовалюту на апаратних гаманцях Ledger або Trezor. Використовуйте лише перевірені біржі з ліцензіями та гарною репутацією.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Увімкніть двофакторну автентифікацію',
          text: 'Активуйте 2FA на всіх криптовалютних платформах. Використовуйте застосунки-автентифікатори замість SMS для більшої безпеки.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Перевіряйте URL-адреси сайтів',
          text: 'Завжди перевіряйте адресу сайту перед введенням даних. Додавайте офіційні сайти до закладок. Остерігайтеся посилань з неперевірених джерел.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Ніколи не діліться приватними ключами',
          text: 'Зберігайте seed-фрази та приватні ключі офлайн. Ніколи не вводьте їх на сайтах і не повідомляйте третім особам, навіть якщо вони представляються службою підтримки.',
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
      name: 'Терміни криптовалютного шахрайства',
      description: 'Глосарій ключових понять у сфері криптоскаму',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Скам',
          description:
            'Шахрайство, спрямоване на крадіжку грошових коштів або конфіденційної інформації користувачів криптовалют',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фішинг',
          description:
            'Вид шахрайства, при якому зловмисники створюють підроблені сайти або застосунки для крадіжки облікових даних користувачів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Піраміда Понці',
          description:
            'Шахрайська схема, де дохід ранніх інвесторів виплачується за рахунок вкладень нових учасників',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ICO (Initial Coin Offering)',
          description:
            'Первинне розміщення токенів для залучення інвестицій у криптовалютний проєкт',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Rug Pull',
          description:
            'Шахрайство в DeFi, коли розробники забирають ліквідність з пулу та зникають з коштами інвесторів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Соціальна інженерія',
          description:
            'Методи психологічного маніпулювання для отримання конфіденційної інформації від жертв',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Seed-фраза',
          description:
            'Набір слів для відновлення доступу до криптогаманця, який ніколи не можна розкривати третім особам',
        },
        {
          '@type': 'DefinedTerm',
          name: '2FA (двофакторна автентифікація)',
          description:
            'Метод захисту акаунту, що вимагає підтвердження входу через другий канал окрім пароля',
        },
        {
          '@type': 'DefinedTerm',
          name: 'White Paper',
          description:
            'Технічний документ проєкту, що описує його концепцію, технологію та план розвитку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Апаратний гаманець',
          description:
            'Фізичний пристрій для безпечного зберігання приватних ключів криптовалют офлайн',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
