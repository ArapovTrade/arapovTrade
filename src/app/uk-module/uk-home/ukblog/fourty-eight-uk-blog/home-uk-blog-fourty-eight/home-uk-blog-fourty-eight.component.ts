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
  selector: 'app-home-uk-blog-fourty-eight',
  templateUrl: './home-uk-blog-fourty-eight.component.html',
  styleUrl: './home-uk-blog-fourty-eight.component.scss',
})
export class HomeUkBlogFourtyEightComponent implements OnInit {
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
      'Самостійне навчання трейдингу: покрокова інструкція для початківців | Ігор Арапов',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Як самостійно навчитися трейдингу: покрокова інструкція від основ до реальної торгівлі. Практичні поради для тих, хто починає з нуля.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-04-03' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/selfstudying.webp',
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
          '@id': 'https://arapov.trade/uk/freestudying/selfstudying#article',
          headline:
            'Самостійне навчання трейдингу: покрокова інструкція для початківців',
          description:
            'Як самостійно навчитися трейдингу: покрокова інструкція від основ до реальної торгівлі. Практичні поради для тих, хто починає з нуля.',
          image: 'https://arapov.trade/assets/img/content/selfstudying1.webp',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov Trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/selfstudying',
          },
          articleSection: 'Навчання трейдингу',
          keywords: [
            'самостійне навчання',
            'трейдинг для початківців',
            'як почати торгувати',
            'демо-рахунок',
            'управління ризиками',
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
      '@id': 'https://arapov.trade/uk/freestudying/selfstudying#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Чи реально навчитися трейдингу самостійно?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Так, самостійне навчання трейдингу цілком можливе за умови системного підходу. Багато успішних трейдерів пройшли саме цей шлях. Ключові елементи: вивчення термінології, опанування аналізу ринку, тривала практика на демо-рахунку та поступовий перехід до реальної торгівлі з мінімальним капіталом.',
          },
        },
        {
          '@type': 'Question',
          name: 'Скільки часу потрібно для опанування трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Базові навички можна здобути за 3-6 місяців інтенсивного навчання. Проте для досягнення стабільної прибутковості зазвичай потрібно 1-2 роки практичної торгівлі. Швидкість прогресу залежить від часу, який ви готові присвячувати навчанню та аналізу власних угод.',
          },
        },
        {
          '@type': 'Question',
          name: 'З якої суми починати торгувати?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Рекомендується починати з суми, втрату якої ви можете собі дозволити — зазвичай це $100-500. Спочатку відпрацюйте стратегію на демо-рахунку мінімум 1-2 місяці, потім переходьте на реальний рахунок з мінімальним депозитом, ризикуючи не більше 1-2% капіталу на угоду.',
          },
        },
        {
          '@type': 'Question',
          name: 'Який ринок обрати початківцю?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для початківців оптимальним є ринок Форекс завдяки високій ліквідності, низьким спредам та великій кількості навчальних матеріалів. Популярні валютні пари на кшталт EUR/USD мають передбачувані рухи. Після опанування Форексу можна переходити до фондового ринку або криптовалют.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як навчитися контролювати емоції під час торгівлі?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Контроль емоцій досягається через суворе дотримання торгового плану, обов'язкове використання стоп-лосів, обмеження денних збитків та регулярні перерви. Важливо вести щоденник угод для аналізу помилок і не торгувати в стані стресу або після серії збиткових угод.",
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
      '@id': 'https://arapov.trade/uk/freestudying/selfstudying#howto',
      name: 'Як самостійно опанувати трейдинг',
      description:
        'Покрокова інструкція з освоєння трейдингу без платних курсів',
      totalTime: 'P6M',
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'USD',
        value: '100-500',
      },
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Вивчіть базову термінологію',
          text: 'Опануйте ключові поняття: лонг, шорт, спред, ліквідність, волатильність, маржа, леверидж. Створіть власний словник термінів із визначеннями та прикладами.',
          url: 'https://arapov.trade/uk/freestudying/selfstudying#terminology',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Освойте методи аналізу ринку',
          text: 'Вивчіть технічний аналіз (графіки, індикатори, рівні підтримки та опору) і фундаментальний аналіз (економічні показники, новини, звіти компаній).',
          url: 'https://arapov.trade/uk/freestudying/selfstudying#analysis',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Оберіть ринок та інструменти',
          text: 'Визначтеся з ринком (Форекс, акції, криптовалюти) та конкретними інструментами для торгівлі. Почніть з одного ринку та найбільш ліквідних активів.',
          url: 'https://arapov.trade/uk/freestudying/selfstudying#markets',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Практикуйтесь на демо-рахунку',
          text: 'Відкрийте демо-рахунок у надійного брокера та відпрацьовуйте стратегії без ризику втрати реальних грошей мінімум 1-2 місяці до досягнення стабільних результатів.',
          url: 'https://arapov.trade/uk/freestudying/selfstudying#demo',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Перейдіть до реальної торгівлі',
          text: 'Почніть торгувати з мінімальним депозитом, суворо дотримуючись ризик-менеджменту (1-2% на угоду). Ведіть щоденник угод та регулярно аналізуйте результати.',
          url: 'https://arapov.trade/uk/freestudying/selfstudying#real-trading',
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
      '@id': 'https://arapov.trade/uk/freestudying/selfstudying#terms',
      name: 'Терміни трейдингу',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Лонг',
          description:
            'Відкриття позиції на купівлю активу з розрахунком на зростання його ціни',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Шорт',
          description:
            'Відкриття позиції на продаж активу з розрахунком на падіння його ціни',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ліквідність',
          description:
            'Здатність активу швидко продаватися або купуватися без суттєвої зміни ціни',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спред',
          description:
            'Різниця між ціною купівлі (Ask) та ціною продажу (Bid) активу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильність',
          description: 'Показник мінливості ціни активу за певний період часу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лос',
          description:
            'Захисний ордер для автоматичного закриття збиткової позиції при досягненні заданого рівня',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тейк-профіт',
          description:
            'Ордер для автоматичної фіксації прибутку при досягненні цільової ціни',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Демо-рахунок',
          description:
            'Навчальний торговий рахунок з віртуальними грошима для відпрацювання навичок без ризику',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ризик-менеджмент',
          description:
            'Система управління ризиками в торгівлі для захисту капіталу від великих втрат',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговий план',
          description:
            'Документ з правилами торгівлі, що включає стратегію, управління капіталом та критерії входу/виходу',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
