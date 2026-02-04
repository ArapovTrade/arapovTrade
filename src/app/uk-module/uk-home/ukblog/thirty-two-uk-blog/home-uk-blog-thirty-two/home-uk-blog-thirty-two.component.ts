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
  selector: 'app-home-uk-blog-thirty-two',
  templateUrl: './home-uk-blog-thirty-two.component.html',
  styleUrl: './home-uk-blog-thirty-two.component.scss',
})
export class HomeUkBlogThirtyTwoComponent implements OnInit {
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
      'Чи варто купувати навчання трейдингу? | Arapov.trade',
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({
      name: 'description',
      content:
        'Чи варто купувати навчання трейдингу? Аналізуємо переваги платних курсів, ризики самонавчання та як обрати якісну програму для початківців.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-04-02' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/purchasingcourses.webp',
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
          headline: 'Чи варто купувати навчання трейдингу?',
          description:
            'Детальний аналіз переваг платного навчання трейдингу, порівняння із самонавчанням та рекомендації щодо вибору якісних курсів',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/purchasingcourses',
          },
          image:
            'https://arapov.trade/assets/img/content/purchasingcourses1.webp',
          articleSection: 'Навчання трейдингу',
          wordCount: 1550,
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
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Чи варто платити за курси трейдингу якщо є безкоштовні матеріали?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Платні курси пропонують структуровану програму, практичні завдання та наставництво, що значно прискорює навчання. Безкоштовні матеріали часто розрізнені та містять застарілу інформацію. Інвестиція в якісне навчання окупається за рахунок економії часу та зменшення втрат на початковому етапі торгівлі.',
          },
        },
        {
          '@type': 'Question',
          name: 'Скільки часу потрібно вчитися трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'При системному підході базові навички можна освоїти за 2-3 місяці. Для стабільної прибуткової торгівлі зазвичай потрібно від 6 місяців до року практики. Професійні курси скорочують цей термін завдяки структурованій програмі та зворотному звязку від наставників.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які навички дають курси трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Якісні курси навчають технічному та фундаментальному аналізу, управлінню ризиками, роботі з торговими платформами та психології трейдингу. Також розвиваються навички дисципліни, емоційного контролю та системного мислення.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи можна навчитися трейдингу самостійно?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Самостійне навчання можливе, але займає значно більше часу та повязане з ризиками: неструктуровані знання, відсутність зворотного звязку та висока ймовірність фінансових втрат через експерименти на реальному рахунку.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як обрати якісні курси трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Звертайте увагу на досвід викладача, наявність практичних завдань, доступ до наставництва та відгуки випускників. Хороший курс включає модулі з аналізу ринку, управління ризиками та психології. Уникайте програм, що обіцяють швидке збагачення.',
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
      name: 'Як почати навчання трейдингу',
      description:
        'Покрокове керівництво з початку навчання трейдингу для новачків',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Визначте цілі навчання',
          text: 'Вирішіть, чого хочете досягти: освоїти базові поняття, розробити торгову стратегію чи покращити поточні результати.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Вивчіть основи самостійно',
          text: 'Ознайомтеся з базовими термінами та принципами роботи фінансових ринків через безкоштовні матеріали.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Оберіть якісний курс',
          text: 'Оцініть програму навчання, досвід викладача та формат занять. Віддавайте перевагу курсам з практичними завданнями.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Практикуйтеся на демо-рахунку',
          text: 'Застосовуйте отримані знання на демонстраційному рахунку без ризику втрати реальних грошей.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Ведіть щоденник трейдера',
          text: 'Записуйте всі угоди, аналізуйте успіхи та помилки для вдосконалення торгового підходу.',
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
      name: 'Глосарій термінів трейдингу',
      description: 'Ключові терміни, повязані з навчанням трейдингу',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Технічний аналіз',
          description:
            'Метод прогнозування руху цін на основі вивчення графіків, патернів та індикаторів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фундаментальний аналіз',
          description:
            'Метод оцінки активів на основі економічних показників та макроекономічних факторів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ризик-менеджмент',
          description:
            'Система методів управління ризиками в трейдингу, включаючи розрахунок розміру позиції',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Захисний ордер, що автоматично закриває позицію при досягненні заданого рівня збитку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Демо-рахунок',
          description:
            'Навчальний торговий рахунок з віртуальними грошима для практики без фінансових ризиків',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кредитне плече',
          description:
            'Інструмент маржинальної торгівлі, що дозволяє оперувати сумами, які перевищують власний капітал',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильність',
          description: 'Показник мінливості ціни активу за певний період часу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торгова стратегія',
          description:
            'Систематизований набір правил для входу в угоди, управління позиціями та фіксації прибутку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Психологія трейдингу',
          description:
            'Розділ трейдингу, що вивчає вплив емоцій на прийняття торгових рішень',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Скальпінг',
          description:
            'Стратегія короткострокової торгівлі, заснована на здійсненні багатьох швидких угод',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
