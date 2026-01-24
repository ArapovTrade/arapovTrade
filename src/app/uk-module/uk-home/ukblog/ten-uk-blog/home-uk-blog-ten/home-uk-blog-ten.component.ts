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
  selector: 'app-home-uk-blog-ten',
  templateUrl: './home-uk-blog-ten.component.html',
  styleUrl: './home-uk-blog-ten.component.scss',
})
export class HomeUkBlogTenComponent implements OnInit {
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
      'Чому трейдери втрачають депозит: головні причини та як їх уникнути | Arapov.trade',
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Розбираємо основні причини втрати депозиту в трейдингу: відсутність плану, ігнорування ризик-менеджменту, емоційні помилки. Практичні поради зі збереження капіталу.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-04-09' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/mainreasonforlosses.webp',
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
          headline:
            'Чому трейдери втрачають депозит: головні причини та як їх уникнути',
          description:
            'Розбираємо основні причини втрати депозиту в трейдингу: відсутність плану, ігнорування ризик-менеджменту, емоційні помилки. Практичні поради зі збереження капіталу.',
          image:
            'https://arapov.trade/assets/img/content/reasonfordepositeloose.webp',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
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
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/mainreasonforlosses',
          },
          articleSection: 'Навчання трейдингу',
          wordCount: 1530,
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
          name: 'Чому більшість трейдерів втрачають гроші?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основні причини: відсутність торгового плану, ігнорування ризик-менеджменту, емоційні рішення, брак знань про ринок та завищені очікування. За статистикою, близько 90% трейдерів втрачають депозит через ці помилки.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як уникнути зливу депозиту?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Розробіть торговий план, обмежуйте ризик до 1-2% на угоду, завжди використовуйте стоп-лоси, контролюйте емоції та регулярно аналізуйте свої результати. Починайте з демо-рахунку для відпрацювання стратегії.',
          },
        },
        {
          '@type': 'Question',
          name: 'Який відсоток трейдерів втрачає гроші?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'За різними дослідженнями, від 70% до 90% роздрібних трейдерів втрачають свої депозити. Однак серед тих, хто застосовує системний підхід та суворий ризик-менеджмент, відсоток успішних значно вищий.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке тільт у трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Тільт — це емоційний стан, коли трейдер після збитків починає приймати імпульсивні рішення, збільшує ризики та відхиляється від торгового плану в спробі швидко відігратися. Це одна з головних причин повної втрати депозиту.',
          },
        },
        {
          '@type': 'Question',
          name: 'Скільки часу потрібно, щоб навчитися прибутково торгувати?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'У середньому потрібно від 1 до 3 років постійної практики, навчання та аналізу помилок. Успіх залежить від дисципліни, якості навчання та здатності контролювати емоції. Демо-торгівля прискорює процес без ризику втрати реальних грошей.',
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
      name: 'Як зберегти депозит та уникнути типових помилок',
      description:
        'Покрокове керівництво із захисту торгового капіталу від поширених помилок трейдерів',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Створіть торговий план',
          text: 'Визначте правила входу та виходу, цільовий прибуток, допустимий ризик та інструменти для торгівлі. План має бути конкретним та вимірюваним.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Впровадьте суворий ризик-менеджмент',
          text: 'Обмежте ризик на угоду до 1-2% депозиту, завжди встановлюйте стоп-лоси, розраховуйте розмір позиції до входу в угоду.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Контролюйте емоції',
          text: 'Ведіть торговий щоденник, робіть перерви після збитків, не торгуйте в стані стресу або ейфорії. Розпізнавайте ознаки тільту.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Постійно навчайтесь',
          text: 'Вивчайте ринок, аналізуйте свої угоди, тестуйте стратегії на демо-рахунку. Трейдинг вимагає безперервного розвитку.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Оцінюйте математичне сподівання',
          text: 'Розраховуйте очікувану прибутковість стратегії. Позитивне математичне сподівання — основа довгострокового успіху.',
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
      name: 'Терміни трейдингу: помилки та ризики',
      description:
        "Ключові поняття, пов'язані з втратою депозиту та управлінням ризиками",
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Злив депозиту',
          description:
            'Повна або значна втрата торгового капіталу через збиткові угоди',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тільт',
          description:
            'Емоційний стан, при якому трейдер приймає імпульсивні рішення після серії збитків',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговий план',
          description:
            'Документ з правилами торгівлі: критерії входу/виходу, ризик на угоду, інструменти',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ризик-менеджмент',
          description:
            'Система управління ризиками для захисту капіталу від значних втрат',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лос',
          description:
            'Захисний ордер для автоматичного закриття збиткової позиції',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кредитне плече',
          description:
            'Механізм збільшення торгового обсягу за рахунок позикових коштів брокера',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Математичне сподівання',
          description:
            'Середній результат угоди в довгостроковій перспективі з урахуванням ймовірності та розміру прибутку/збитку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Просадка',
          description:
            'Зниження торгового рахунку від максимуму до поточного мінімуму',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Овертрейдинг',
          description:
            'Надмірна кількість угод, що веде до підвищених комісій та емоційного виснаження',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговий щоденник',
          description:
            'Журнал для запису угод, емоцій та висновків з метою аналізу та покращення результатів',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
