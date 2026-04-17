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
  selector: 'app-home-uk-blog-fifty-eight',
  templateUrl: './home-uk-blog-fifty-eight.component.html',
  styleUrl: './home-uk-blog-fifty-eight.component.scss',
})
export class HomeUkBlogFiftyEightComponent implements OnInit {
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
      'Усереднення в трейдингу: стратегії, ризики та практичне застосування | ArapovTrade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Повний посібник з усереднення позицій у трейдингу. Розбираємо стратегії DCA, класичне усереднення, антимартингейл. Як уникнути помилок та коли метод працює.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-04' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/averagingintrading.webp',
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
          '@id':
            'https://arapov.trade/uk/freestudying/averagingintrading#article',
          headline:
            'Усереднення в трейдингу: стратегії, ризики та практичне застосування',
          description:
            'Повний посібник з усереднення позицій у трейдингу. Розбираємо стратегії DCA, класичне усереднення, антимартингейл.',
          image:
            'https://arapov.trade/assets/img/content/averagingintrading1.webp',
          datePublished: '2026-03-25T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',

          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'ArapovTrade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/averagingintrading',
          },
          articleSection: 'Трейдинг для початківців',
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
        'https://www.wikidata.org/wiki/Q137454477',
        'https://scholar.google.com/citations?user=N440tWQAAAAJ',
        'https://orcid.org/0009-0003-0430-778X',
        'https://isni.org/isni/0000000529518564',
        'https://www.amazon.com/stores/author/B0GBRFY457',
        'https://github.com/ArapovTrade',
        'https://ua.linkedin.com/in/arapovtrade',
        'https://www.youtube.com/@ArapovTrade',
        'https://t.me/ArapovTrade',
      ],
      jobTitle: [
        'Незалежний дослідник',
        'трейдер',
        'автор і засновник arapov.trade',
      ],
      description:
        'Незалежний дослідник, практикуючий трейдер, автор книг з трейдингу та наукових публікацій. Спеціалізується на психології трейдингу та когнітивних упередженнях на фінансових ринках.',
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
      '@id': 'https://arapov.trade/uk/freestudying/averagingintrading#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Що таке усереднення в трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Усереднення — це техніка управління позицією, коли трейдер додає обсяг до існуючої угоди в міру руху ціни. Мета — знизити середню ціну входу та покращити точку беззбитковості.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чим DCA відрізняється від класичного усереднення?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'DCA (Dollar Cost Averaging) передбачає регулярні покупки на фіксовану суму незалежно від ціни. Класичне усереднення — додавання до позиції при русі проти трейдера. DCA знижує емоційне навантаження та підходить для довгострокових інвестицій.',
          },
        },
        {
          '@type': 'Question',
          name: 'Коли усереднення небезпечне?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Усереднення особливо ризиковане у сильних трендах, при торгівлі з високим плечем та без чіткого плану виходу. Якщо актив продовжує падати без ознак розвороту, кожне усереднення збільшує збитки.',
          },
        },
        {
          '@type': 'Question',
          name: 'Скільки разів можна усереднювати позицію?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Професійні трейдери обмежують усереднення 2-3 додаваннями. Кожне усереднення має бути заплановане заздалегідь з урахуванням рівнів підтримки та загального розміру ризику на угоду.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи підходить усереднення для криптовалют?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'DCA добре працює для довгострокового накопичення біткоїна та ефіріуму. Класичне усереднення на крипторинку ризиковане через високу волатильність — корекції на 30-50% не рідкість.',
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
      '@id': 'https://arapov.trade/uk/freestudying/averagingintrading#howto',
      name: 'Як безпечно застосовувати усереднення в трейдингу',
      description:
        'Покрокова інструкція з грамотного використання усереднення позицій',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Визначте тип ринку',
          text: 'Проаналізуйте, чи знаходиться актив у тренді або боковику. Усереднення ефективніше в боковому ринку та на відкатах у тренді.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Розрахуйте рівні входу',
          text: 'Визначте 2-3 рівні для потенційного усереднення на основі підтримок, Фібоначчі або зон попиту.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Розподіліть капітал',
          text: 'Розділіть виділений на угоду капітал на частини. Типовий розподіл: 40% на перший вхід, 35% та 25% на усереднення.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Встановіть стоп-лос',
          text: 'Визначте максимальний збиток для всієї позиції. Стоп має знаходитися за останнім рівнем усереднення.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Зафіксуйте план виходу',
          text: 'Заздалегідь визначте цілі по прибутку та умови закриття позиції. Дотримуйтеся плану незалежно від емоцій.',
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
      '@id': 'https://arapov.trade/uk/freestudying/averagingintrading#terms',
      name: 'Глосарій термінів усереднення',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Усереднення',
          description:
            'Метод додавання до існуючої позиції для покращення середньої ціни входу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'DCA (Dollar Cost Averaging)',
          description:
            'Стратегія регулярних покупок на фіксовану суму незалежно від поточної ціни активу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Антимартингейл',
          description:
            'Збільшення позиції після прибуткових угод, протилежність класичному усередненню',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маржин-кол',
          description:
            'Вимога брокера внести додаткове забезпечення при падінні маржі нижче мінімуму',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кредитне плече',
          description: 'Співвідношення власних та позикових коштів у торгівлі',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Рівень підтримки',
          description:
            'Цінова зона, де попит перевищує пропозицію і ціна схильна відскакувати вгору',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильність',
          description: 'Ступінь коливання ціни активу за певний період',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ризик-менеджмент',
          description:
            'Система управління ризиками для захисту торгового капіталу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лос',
          description:
            'Ордер на автоматичне закриття позиції при досягненні заданого рівня збитку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Точка беззбитковості',
          description:
            'Ціна, при якій позиція не приносить ні прибутку, ні збитку',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
