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
  selector: 'app-home-uk-blog-thirty-three',
  templateUrl: './home-uk-blog-thirty-three.component.html',
  styleUrl: './home-uk-blog-thirty-three.component.scss',
})
export class HomeUkBlogThirtyThreeComponent implements OnInit {
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
      'Пін-бар у трейдингу: Повний посібник з торгівлі | Arapov.trade',
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({
      name: 'description',
      content:
        'Пін-бар у трейдингу — повний посібник з торгівлі розворотним патерном. Бичачий та ведмежий пін-бар, стратегії входу, управління ризиками на форекс та криптовалютах.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-04-16' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/pinbar.jpg',
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
          '@id': 'https://arapov.trade/uk/freestudying/pinbar#article',
          headline: 'Пін-бар у трейдингу: Повний посібник з торгівлі',
          description:
            'Пін-бар у трейдингу — повний посібник з торгівлі розворотним патерном. Бичачий та ведмежий пін-бар, стратегії входу, управління ризиками.',
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/pinbar1.png',
            width: 1200,
            height: 630,
          },
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade#organization',
            name: 'Arapov.trade',
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
          name: 'Що таке пін-бар у трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Пін-бар — це свічковий патерн з довгою тінню та маленьким тілом, що сигналізує про потенційний розворот ціни. Довга тінь показує відторгнутий ціновий рівень, а компактне тіло вказує на невизначеність ринку.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як відрізнити бичачий пін-бар від ведмежого?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Бичачий пін-бар має довгу нижню тінь та формується після зниження, сигналізуючи про розворот вгору. Ведмежий пін-бар має довгу верхню тінь та з'являється після зростання, вказуючи на потенційний розворот вниз.",
          },
        },
        {
          '@type': 'Question',
          name: 'На яких рівнях пін-бар найбільш ефективний?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Пін-бар найбільш ефективний на ключових рівнях підтримки та опору, рівнях Фібоначчі (38.2%, 50%, 61.8%), круглих числах та зонах з високим обсягом торгів.',
          },
        },
        {
          '@type': 'Question',
          name: 'Де встановлювати стоп-лос при торгівлі пін-баром?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Стоп-лос встановлюється за межами довгої тіні пін-бара. Для бичачого пін-бара — нижче мінімуму тіні, для ведмежого — вище максимуму. Рекомендоване співвідношення ризику до прибутку — мінімум 1:2.',
          },
        },
        {
          '@type': 'Question',
          name: 'На яких таймфреймах краще торгувати пін-бари?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Найбільш надійні пін-бари формуються на денних (D1) та чотиригодинних (H4) графіках. На молодших таймфреймах (M5, M15) багато ринкового шуму та хибних сигналів.',
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
      name: 'Як торгувати пін-бар',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Визначте тренд та ключові рівні',
          text: 'Використовуйте ковзні середні для визначення напрямку тренду. Знайдіть ключові рівні підтримки та опору на графіку.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Дочекайтеся формування пін-бара',
          text: 'Шукайте свічку з довгою тінню (мінімум у 2 рази більше тіла) та маленьким тілом на ключовому рівні.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Підтвердіть сигнал',
          text: 'Перевірте обсяг торгів та використовуйте RSI для підтвердження перекупленості/перепроданості.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Увійдіть в угоду',
          text: 'Агресивний вхід — одразу після закриття пін-бара. Консервативний — після пробою максимуму/мінімуму наступною свічкою.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Встановіть стоп-лос та тейк-профіт',
          text: 'Стоп-лос — за межами довгої тіні. Тейк-профіт — на найближчому рівні підтримки/опору. Співвідношення мінімум 1:2.',
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
      name: 'Глосарій термінів пін-бара',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Пін-бар',
          description:
            'Свічковий патерн з довгою тінню та маленьким тілом, що сигналізує про потенційний розворот ціни.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Бичачий пін-бар',
          description:
            'Розворотний патерн з довгою нижньою тінню, що формується після зниження.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ведмежий пін-бар',
          description:
            'Розворотний патерн з довгою верхньою тінню, що формується після зростання.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тінь свічки',
          description:
            'Вертикальна лінія вище або нижче тіла свічки, що показує максимальний ціновий діапазон.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тіло свічки',
          description:
            'Прямокутна частина свічки між ціною відкриття та закриття.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Хибний пробій',
          description:
            'Короткочасний вихід ціни за рівень з подальшим поверненням.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Price Action',
          description:
            'Методологія аналізу руху ціни без використання індикаторів.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Відторгнення рівня',
          description:
            'Ситуація, коли ціна тестує рівень, але не може його пробити.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Підтвердження патерну',
          description:
            'Додаткові технічні сигнали, що підсилюють надійність сетапу.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Співвідношення ризик/прибуток',
          description:
            'Відношення потенційного збитку до потенційного прибутку в угоді.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
