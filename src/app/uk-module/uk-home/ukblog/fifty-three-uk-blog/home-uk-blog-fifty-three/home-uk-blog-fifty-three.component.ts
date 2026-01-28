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
  selector: 'app-home-uk-blog-fifty-three',
  templateUrl: './home-uk-blog-fifty-three.component.html',
  styleUrl: './home-uk-blog-fifty-three.component.scss',
})
export class HomeUkBlogFiftyThreeComponent implements OnInit {
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
      'Order Block у трейдингу: практичний посібник | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Order Block у трейдингу: практичний посібник. Дізнайтеся, як знаходити та торгувати ордерні блоки. Типи блоків, стратегії входу, управління ризиком.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-03-30' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/orderblockintrading.webp',
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
            'https://arapov.trade/uk/freestudying/orderblockintrading#article',
          headline: 'Order Block у трейдингу: практичний посібник',
          description:
            'Повний посібник з ордерних блоків у трейдингу. Як знаходити Order Block, типи блоків, стратегії торгівлі та управління ризиком.',
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/orderblocks.png',
            width: 1200,
            height: 630,
          },
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
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/orderblockintrading',
          },
          wordCount: 1336,
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
          name: 'Що таке Order Block у трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Order Block — це цінова зона, де великі інституційні учасники накопичували або розподіляли позиції перед значними ціновими рухами.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як визначити бичачий ордерний блок?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Бичачий ордерний блок визначається як остання ведмежа свічка перед сильним висхідним імпульсом. Межами блоку слугують максимум та мінімум цієї свічки.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чим ордерний блок відрізняється від рівня підтримки?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'На відміну від стандартних рівнів, ордерні блоки вказують на конкретні точки входу великих учасників та завжди передують імпульсному руху.',
          },
        },
        {
          '@type': 'Question',
          name: 'Яка найкраща стратегія торгівлі на ордерних блоках?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Класична стратегія — торгівля на ретесті блоку. При поверненні ціни очікується реакція. Вхід із підтвердженням свічковим патерном підвищує ймовірність успіху.',
          },
        },
        {
          '@type': 'Question',
          name: 'Де розміщувати стоп-лосс при торгівлі на ордерному блоці?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Стоп-лосс розміщується за межею блоку з буферною зоною. Для бичачого блоку — нижче мінімуму зони, для ведмежого — вище максимуму.',
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
      name: 'Як торгувати на ордерних блоках',
      description:
        'Покрокове керівництво з визначення та торгівлі ордерних блоків',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Аналіз структури',
          text: 'Визначте поточний тренд через послідовність максимумів та мінімумів.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Пошук імпульсу',
          text: 'Знайдіть сильний направлений рух, що створює нові структурні точки.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Визначення блоку',
          text: 'Відмітьте останню протилежну свічку перед імпульсом.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Очікування ретесту',
          text: 'Дочекайтеся повернення ціни до зони блоку з підтвердженням.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Вхід та управління',
          text: 'Входьте у напрямку імпульсу зі стоп-лоссом за межею блоку.',
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
      name: 'Глосарій термінів Order Block',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Order Block',
          description:
            'Цінова зона інституційного накопичення або розподілу позицій перед імпульсним рухом.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Бичачий ордерний блок',
          description:
            'Остання ведмежа свічка перед сильним висхідним імпульсом, зона накопичення довгих позицій.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ведмежий ордерний блок',
          description:
            'Остання бичача свічка перед сильним низхідним імпульсом, зона розподілу позицій.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Брейкер блок',
          description:
            'Ордерний блок, структура якого порушена пробоєм, що змінює роль з підтримки на опір або навпаки.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Мітигейшн блок',
          description:
            'Зона неефективного ціноутворення, до якої ринок прагне повернутися для заповнення дисбалансу.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ретест',
          description:
            'Повернення ціни до раніше пробитого рівня або зони для перевірки її значимості.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Імпульсний рух',
          description: 'Сильний односпрямований рух ціни з високим моментумом.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Зона ліквідності',
          description:
            'Область скупчення стоп-ордерів, що приваблює ціну перед розворотом.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Smart Money',
          description:
            'Інституційні учасники ринку — банки, хедж-фонди, маркет-мейкери.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Свічковий патерн',
          description:
            'Комбінація свічок, що сигналізує про ймовірний напрямок руху ціни.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
