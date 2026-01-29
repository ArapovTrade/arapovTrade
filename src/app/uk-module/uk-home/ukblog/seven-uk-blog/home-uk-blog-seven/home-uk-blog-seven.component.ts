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
  selector: 'app-home-uk-blog-seven',
  templateUrl: './home-uk-blog-seven.component.html',
  styleUrl: './home-uk-blog-seven.component.scss',
})
export class HomeUkBlogSevenComponent implements OnInit {
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
    this.titleService.setTitle('Як заробити на трейдингу: повний посібник');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Як заробити на трейдингу: практичний посібник з вибору ринку, стратегії торгівлі та управління ризиками для початківців.',
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
            'https://arapov.trade/uk/freestudying/makingmoneyintrading#article',
          headline: 'Як заробити на трейдингу: практичний посібник',
          description:
            'Як заробити на трейдингу: практичний посібник з вибору ринку, стратегії торгівлі та управління ризиками.',
          image:
            'https://arapov.trade/assets/img/content/makingmoneyintrading1.webp',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Pair Trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/makingmoneyintrading',
          },
          articleSection: 'Трейдинг',
          keywords: [
            'заробіток на трейдингу',
            'трейдинг',
            'Форекс',
            'торгові стратегії',
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
      '@id': 'https://arapov.trade/uk/freestudying/makingmoneyintrading#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Чи реально заробити на трейдингу новачку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Так, але потрібне навчання, практика на демо-рахунку та суворе дотримання ризик-менеджменту. Близько 20-30% трейдерів виходять на стабільний прибуток після 1-2 років практики.',
          },
        },
        {
          '@type': 'Question',
          name: 'Скільки грошей потрібно для старту в трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Мінімальний депозит на Форекс — від 100 доларів. Для комфортної торгівлі рекомендується 500-1000 доларів.',
          },
        },
        {
          '@type': 'Question',
          name: 'Який ринок краще обрати новачку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Форекс підходить для старту завдяки високій ліквідності та доступності. Криптовалюти більш волатильні та ризиковані.',
          },
        },
        {
          '@type': 'Question',
          name: 'Скільки часу займає трейдинг?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Залежить від стилю: скальпінг вимагає 4-8 годин на день, свінг-трейдинг — 1-2 години.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому більшість трейдерів втрачають гроші?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основні причини: відсутність навчання, ігнорування ризик-менеджменту, емоційні рішення та завищені очікування.',
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
      '@id': 'https://arapov.trade/uk/freestudying/makingmoneyintrading#howto',
      name: 'Як почати заробляти на трейдингу',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Оберіть ринок',
          text: 'Визначтеся з напрямком: Форекс, акції, криптовалюти чи деривативи.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Пройдіть навчання',
          text: 'Вивчіть основи технічного та фундаментального аналізу.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Відкрийте демо-рахунок',
          text: 'Практикуйтеся мінімум 3 місяці без ризику реальних грошей.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Розробіть стратегію',
          text: 'Створіть торговий план з чіткими правилами входу та виходу.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Почніть з малого',
          text: 'Переходьте на реальний рахунок з мінімальним депозитом.',
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
      '@id': 'https://arapov.trade/uk/freestudying/makingmoneyintrading#terms',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Трейдинг',
          description:
            'Процес купівлі та продажу фінансових інструментів з метою отримання прибутку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кредитне плече',
          description:
            'Інструмент, що дозволяє торгувати сумами, які перевищують власний депозит',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Скальпінг',
          description:
            'Стиль торгівлі з безліччю швидких угод для отримання невеликого прибутку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Свінг-трейдинг',
          description:
            'Торгівля на середньострокових коливаннях цін з утриманням позицій від днів до тижнів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Технічний аналіз',
          description:
            'Метод прогнозування цін на основі графіків та індикаторів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фундаментальний аналіз',
          description:
            'Оцінка вартості активу на основі економічних показників',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ризик-менеджмент',
          description:
            'Система управління торговими ризиками та розміром позицій',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильність',
          description: 'Ступінь мінливості ціни активу за певний період',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ліквідність',
          description:
            'Здатність активу швидко продаватися без суттєвої зміни ціни',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Деривативи',
          description:
            'Похідні фінансові інструменти, вартість яких залежить від базового активу',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
