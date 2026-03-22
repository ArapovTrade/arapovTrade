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
  selector: 'app-home-uk-blog-thirty-five',
  templateUrl: './home-uk-blog-thirty-five.component.html',
  styleUrl: './home-uk-blog-thirty-five.component.scss',
})
export class HomeUkBlogThirtyFiveComponent implements OnInit {
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
      'Основи трейдингу для початківців | Повний посібник 2025',
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({
      name: 'description',
      content:
        'Основи трейдингу для початківців: принципи біржової торгівлі, види ринків, стратегії, управління ризиками та психологія трейдера. Повний посібник від Ігоря Арапова.',
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
          headline:
            'Основи трейдингу для початківців: повний посібник з біржової торгівлі',
          description:
            'Детальний посібник з основ трейдингу: принципи роботи фінансових ринків, види торгівлі, стратегії, інструменти аналізу та управління ризиками для початківців.',
          image: 'https://arapov.trade/assets/img/content/tradingbasics1.webp',
          datePublished: '2026-03-15T00:00:00Z',
          dateModified: '2026-03-22T00:00:00Z',
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
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/tradingbasics',
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
          name: 'Що таке трейдинг простими словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Трейдинг — це діяльність з купівлі та продажу фінансових інструментів (акцій, валют, криптовалют, товарів) з метою отримання прибутку від зміни їхньої вартості. Трейдер аналізує ринок та приймає рішення про момент входу та виходу з угод.',
          },
        },
        {
          '@type': 'Question',
          name: 'З якої суми можна почати торгувати на біржі?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Мінімальна сума залежить від обраного ринку та брокера. На валютному ринку можна почати від 100-500 доларів, на фондовому — від 1000 доларів. Однак рекомендується починати з демо-рахунку для відпрацювання навичок без ризику втрати коштів.',
          },
        },
        {
          '@type': 'Question',
          name: 'Який стиль торгівлі краще для новачка?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Початківцям рекомендується свінг-трейдинг або позиційна торгівля. Ці стилі менш інтенсивні, дають час на аналіз та прийняття рішень, не вимагають постійної присутності біля монітора.',
          },
        },
        {
          '@type': 'Question',
          name: 'Скільки часу потрібно на навчання трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Базові концепції можна освоїти за 2-3 місяці систематичного навчання. Однак формування стійких навичок та стабільних результатів зазвичай займає від 1 до 3 років практики на реальному рахунку.',
          },
        },
        {
          '@type': 'Question',
          name: 'Який відсоток від депозиту можна ризикувати в одній угоді?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Професійні трейдери рекомендують ризикувати не більше 1-2% від депозиту в одній угоді. Такий консервативний підхід дозволяє пережити серію збиткових угод та зберегти капітал для продовження торгівлі.',
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
      name: 'Як почати торгувати на біржі: покрокова інструкція',
      description:
        'Практичний посібник для початківців з старту біржової торгівлі',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Вивчіть основи',
          text: 'Освойте базові поняття: типи ринків, види ордерів, принципи ціноутворення. Вивчіть технічний та фундаментальний аналіз на базовому рівні.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Оберіть ринок та брокера',
          text: 'Визначтеся з торговим майданчиком (форекс, акції, криптовалюти) та оберіть надійного брокера з ліцензією регулятора.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Практикуйтеся на демо-рахунку',
          text: 'Відкрийте демонстраційний рахунок та відпрацьовуйте торгові стратегії без ризику втрати реальних грошей мінімум 2-3 місяці.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Розробіть торговий план',
          text: 'Створіть чіткий план з правилами входу, виходу, управління ризиками та розміром позиції. Дотримуйтесь плану без відхилень.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Почніть з невеликого капіталу',
          text: 'Після стабільних результатів на демо переходьте на реальний рахунок з мінімальною сумою. Поступово збільшуйте капітал у міру зростання досвіду.',
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
      name: 'Глосарій трейдингу',
      description: 'Основні терміни біржової торгівлі',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Трейдинг',
          description:
            'Діяльність з купівлі та продажу фінансових інструментів з метою отримання прибутку від зміни їхньої вартості',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Захисний ордер, що автоматично закриває позицію при досягненні заданого рівня збитку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Технічний аналіз',
          description:
            'Метод прогнозування цін на основі вивчення графіків та історичних даних про рух котирувань',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фундаментальний аналіз',
          description:
            'Метод оцінки вартості активів на основі економічних показників, новин та фінансових звітів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильність',
          description:
            'Міра мінливості ціни активу, що показує амплітуду коливань котирувань за певний період',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ліквідність',
          description:
            'Здатність активу швидко продаватися або купуватися без суттєвого впливу на його ціну',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спред',
          description:
            'Різниця між ціною купівлі (ask) та ціною продажу (bid) фінансового інструменту',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Скальпінг',
          description:
            'Стиль торгівлі з безліччю короткострокових угод, спрямований на отримання невеликого прибутку з кожної операції',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Свінг-трейдинг',
          description:
            'Стиль торгівлі з утриманням позицій від кількох днів до тижнів для захоплення середньострокових цінових рухів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Диверсифікація',
          description:
            'Розподіл капіталу між різними активами для зниження загального ризику інвестиційного портфеля',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
