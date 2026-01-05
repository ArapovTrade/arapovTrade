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
  selector: 'app-home-uk-blog-twenty-five',
  templateUrl: './home-uk-blog-twenty-five.component.html',
  styleUrl: './home-uk-blog-twenty-five.component.scss',
})
export class HomeUkBlogTwentyFiveComponent implements OnInit {
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
      'Маркет-мейкери на криптовалютному ринку | Роль та функції'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Повний посібник з маркет-мейкерів на крипторинку. Дізнайтеся, як вони забезпечують ліквідність, знижують волатильність та впливають на торгівлю криптовалютами.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-22' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cryptommakers.webp',
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
          headline: 'Маркет-мейкери на криптовалютному ринку: роль та функції',
          description:
            'Повний посібник з маркет-мейкерів на крипторинку. Дізнайтеся, як вони забезпечують ліквідність, знижують волатильність та впливають на торгівлю криптовалютами.',
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
          image: ['https://arapov.trade/assets/img/content/cryptommakers.webp'],
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-12T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/cryptommakers',
          },
          articleSection: 'Криптовалюти',
          keywords: [
            'маркет-мейкер',
            'криптовалюта',
            'ліквідність',
            'спред',
            'DEX',
            'CEX',
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
          name: 'Хто такі маркет-мейкери у криптовалютах?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Маркет-мейкери — це професійні учасники ринку, що забезпечують ліквідність шляхом постійного розміщення ордерів на купівлю та продаж. Вони створюють умови для швидкого виконання угод, мінімізують спреди та стабілізують ціни на криптовалютних біржах.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як маркет-мейкери заробляють на крипторинку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Маркет-мейкери заробляють на спреді — різниці між ціною купівлі та продажу. Вони купують активи за нижчою ціною (bid) та продають за вищою (ask). Також вони можуть отримувати комісії від бірж за забезпечення ліквідності.',
          },
        },
        {
          '@type': 'Question',
          name: 'У чому різниця між маркет-мейкерами на CEX та DEX?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'На централізованих біржах (CEX) маркет-мейкери працюють через ордербук, розміщуючи лімітні заявки. На децентралізованих біржах (DEX) вони забезпечують ліквідність через пули ліквідності, додаючи активи в смарт-контракти для автоматичного обміну.',
          },
        },
        {
          '@type': 'Question',
          name: "Які ризики пов'язані з маркет-мейкінгом?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основні ризики включають волатильність ринку, технічні збої алгоритмів, регуляторні зміни та конкуренцію. На малоліквідних ринках маркет-мейкери також стикаються з ризиком значних збитків при різких цінових рухах.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому маркет-мейкери важливі для нових токенів?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Маркет-мейкери критично важливі для нових токенів, оскільки забезпечують початкову ліквідність. Без них нові проекти страждають від широких спредів, низьких обсягів торгів та високої волатильності, що відлякує трейдерів та інвесторів.',
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
      name: 'Як працюють маркет-мейкери на крипторинку',
      description:
        'Основні етапи роботи маркет-мейкерів на криптовалютному ринку',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Аналіз ринкових умов',
          text: 'Маркет-мейкери аналізують обсяги торгів, спреди, волатильність та поточні тренди для визначення оптимальної стратегії.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Розміщення двосторонніх ордерів',
          text: 'Одночасно виставляються ордери на купівлю (bid) та продаж (ask), створюючи ліквідність для інших учасників ринку.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Алгоритмічне управління',
          text: 'Алгоритми автоматично коригують ордери в реальному часі, реагуючи на зміни ринкових умов.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Управління ризиками',
          text: 'Застосовуються стратегії хеджування, stop-loss ордери та ліміти позицій для захисту від збитків.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Балансування позицій',
          text: 'Маркет-мейкери постійно ребалансують свої позиції для підтримання нейтральності відносно напрямку ринку.',
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
      name: 'Термінологія маркет-мейкінгу',
      description: 'Основні терміни криптовалютного маркет-мейкінгу',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Маркет-мейкер',
          description:
            'Учасник ринку, що забезпечує ліквідність шляхом постійного розміщення ордерів на купівлю та продаж',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спред',
          description:
            'Різниця між найкращою ціною купівлі (bid) та найкращою ціною продажу (ask)',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ліквідність',
          description:
            'Здатність ринку забезпечувати швидке виконання угод без суттєвого впливу на ціну',
        },
        {
          '@type': 'DefinedTerm',
          name: 'CEX',
          description:
            'Centralized Exchange — централізована біржа з ордербуком та кастодіальним зберіганням активів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'DEX',
          description:
            'Decentralized Exchange — децентралізована біржа на базі смарт-контрактів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Пул ліквідності',
          description:
            'Смарт-контракт із заблокованими активами для автоматичного обміну токенів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Slippage',
          description:
            'Проковзування — різниця між очікуваною та фактичною ціною виконання угоди',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ордербук',
          description:
            'Книга заявок — список усіх активних ордерів на купівлю та продаж активу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'HFT',
          description:
            'High-Frequency Trading — високочастотна торгівля з використанням алгоритмів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'AMM',
          description:
            'Automated Market Maker — автоматичний маркет-мейкер на основі математичних формул',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
