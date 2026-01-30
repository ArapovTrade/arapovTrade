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
  selector: 'app-home-uk-blog-fourty-one',
  templateUrl: './home-uk-blog-fourty-one.component.html',
  styleUrl: './home-uk-blog-fourty-one.component.scss',
})
export class HomeUkBlogFourtyOneComponent implements OnInit {
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
      'Правила успішного трейдингу: повний посібник | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Правила успішного трейдингу: торгова стратегія, ризик-менеджмент, емоційна дисципліна. Повний посібник для прибуткової торгівлі на фінансових ринках.',
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
          '@id':
            'https://arapov.trade/uk/freestudying/successfultrading#article',
          headline: 'Правила успішного трейдингу: повний посібник',
          description:
            'Комплексний посібник з успішного трейдингу: вибір стратегії, управління ризиками, контроль емоцій, вибір брокера.',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          image:
            'https://arapov.trade/assets/img/content/successfultrading1.webp',
          articleSection: 'Навчання трейдингу',
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
      '@id': 'https://arapov.trade/uk/freestudying/successfultrading#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Яку торгову стратегію обрати новачку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Новачкам рекомендується свінг-трейдинг на денних графіках. Цей стиль дає більше часу на аналіз та не вимагає постійної присутності біля терміналу.',
          },
        },
        {
          '@type': 'Question',
          name: 'Скільки капіталу ризикувати на одну угоду?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Професійне правило: не більше 1-2% від депозиту на угоду. При капіталі 10000$ максимальний збиток — 100-200$.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому важливий торговий журнал?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Журнал виявляє патерни помилок, допомагає оцінити ефективність стратегії та відстежити вплив емоцій на результати.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як обрати надійного брокера?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Перевіряйте ліцензію регулятора, вивчайте відгуки, тестуйте на демо-рахунку, порівнюйте спреди та комісії.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як контролювати емоції в трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Торгуйте за планом, використовуйте фіксований ризик, робіть перерви після збитків, ведіть щоденник емоцій.',
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
      '@id': 'https://arapov.trade/uk/freestudying/successfultrading#howto',
      name: 'Як стати успішним трейдером',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Оберіть стратегію',
          text: 'Визначте стиль торгівлі: скальпінг, дейтрейдинг, свінг або позиційна торгівля.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Впровадьте ризик-менеджмент',
          text: 'Встановіть правило 1-2% ризику на угоду. Завжди використовуйте стоп-лоси.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Опануйте аналіз',
          text: 'Вивчіть технічний і фундаментальний аналіз. Комбінуйте методи.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Розвивайте дисципліну',
          text: 'Торгуйте за планом. Ведіть торговий журнал. Контролюйте емоції.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Постійно навчайтесь',
          text: 'Аналізуйте угоди, вивчайте нові методики, адаптуйтесь до змін ринку.',
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
      '@id': 'https://arapov.trade/uk/freestudying/successfultrading#glossary',
      name: 'Глосарій трейдингу',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Ризик-менеджмент',
          description:
            'Система управління торговими ризиками через контроль розміру позицій.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лос',
          description:
            'Захисний ордер для автоматичного закриття збиткової позиції.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тейк-профіт',
          description: 'Ордер для автоматичної фіксації прибутку.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Свінг-трейдинг',
          description:
            'Стиль торгівлі з утриманням позицій від кількох днів до тижнів.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Скальпінг',
          description: 'Короткострокова торгівля з безліччю угод за сесію.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Таймфрейм',
          description: 'Часовий інтервал для відображення цінових даних.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спред',
          description: 'Різниця між ціною купівлі та продажу активу.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кредитне плече',
          description:
            "Інструмент для збільшення торгового об'єму за рахунок позикових коштів.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговий журнал',
          description: 'Записи про угоди для аналізу ефективності системи.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Risk-to-Reward',
          description:
            'Співвідношення потенційного збитку до потенційного прибутку.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
