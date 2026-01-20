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
  selector: 'app-home-uk-blog-twenty-four',
  templateUrl: './home-uk-blog-twenty-four.component.html',
  styleUrl: './home-uk-blog-twenty-four.component.scss',
})
export class HomeUkBlogTwentyFourComponent implements OnInit {
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
      'Патерн Прапор у трейдингу: як розпізнати та торгувати | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Патерн Прапор у трейдингу: повний посібник з ідентифікації, побудови та торгових стратегій. Дізнайтеся, як використовувати фігуру продовження тренду для прибуткової торгівлі.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/flagfigure.webp',
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
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/flagfigure',
          },
          headline:
            'Патерн Прапор у трейдингу: повний посібник з ідентифікації та торгових стратегій',
          description:
            'Вичерпний посібник з патерну Прапор: структура фігури, типи прапорів, методи торгівлі та практичні рекомендації для трейдерів усіх рівнів.',
          image: 'https://arapov.trade/assets/img/content/flagfigure.webp',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
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
            url: 'https://arapov.trade',
          },
          articleSection: 'Технічний аналіз',
          keywords: [
            'патерн прапор',
            'фігура прапор',
            'продовження тренду',
            'древко прапора',
            'пробій',
          ],
          wordCount: 1680,
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
          name: 'Що являє собою патерн Прапор у трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Патерн Прапор — це графічна модель продовження тренду, що складається з двох елементів: древка (різкого імпульсного руху) та полотнища прапора (короткої консолідації у вузькому каналі). Після завершення консолідації ціна зазвичай продовжує рух у напрямку початкового імпульсу.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які типи патерну Прапор існують?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Виділяють два основні типи: бичачий прапор (формується після імпульсу вгору, консолідація нахилена вниз) та ведмежий прапор (утворюється після імпульсу вниз, консолідація нахилена вгору). Обидва типи сигналізують про продовження попереднього тренду.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як правильно торгувати патерн Прапор?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основний метод — вхід на пробої межі прапора у напрямку тренду. Стоп-лос розміщується за протилежною межею консолідації. Ціль по прибутку розраховується як проекція довжини древка від точки пробою.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як відрізнити справжній пробій Прапора від хибного?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Справжній пробій супроводжується збільшенням торгового об'єму та закриттям свічки за межею прапора. Хибні пробої характеризуються низьким об'ємом і швидким поверненням ціни в діапазон консолідації. Додатково використовуйте підтвердження від індикаторів.",
          },
        },
        {
          '@type': 'Question',
          name: 'На яких ринках працює патерн Прапор?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Прапор універсальний і ефективний на всіх фінансових ринках: Форекс, акції, криптовалюти, сировинні товари. Патерн працює на будь-яких таймфреймах, від хвилинних до тижневих, хоча найнадійніші сигнали формуються на H1-D1.',
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
      name: 'Як торгувати патерн Прапор',
      description:
        'Покрокова інструкція з ідентифікації та торгівлі патерну Прапор',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Ідентифікуйте імпульс',
          text: "Знайдіть на графіку різкий спрямований рух ціни (древко прапора), що супроводжується підвищеним об'ємом торгів. Імпульс має бути вираженим та однозначним.",
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Визначте консолідацію',
          text: 'Після імпульсу ціна входить у фазу консолідації, формуючи вузький канал із нахилом проти основного тренду. Межі каналу мають бути паралельними.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Дочекайтеся пробою',
          text: 'Спостерігайте за поведінкою ціни біля меж прапора. Вхід здійснюється після закриття свічки за межею каналу в напрямку початкового імпульсу.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: "Підтвердіть сигнал об'ємом",
          text: "Переконайтеся, що пробій супроводжується зростанням торгового об'єму. Низький об'єм при пробої підвищує ймовірність хибного сигналу.",
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Встановіть стоп і ціль',
          text: 'Розмістіть стоп-лос за протилежною межею прапора. Ціль по прибутку дорівнює довжині древка, відкладеній від точки пробою.',
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
      name: 'Глосарій термінів патерну Прапор',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Патерн Прапор',
          description:
            'Графічна модель продовження тренду, що складається з імпульсу (древка) та подальшої консолідації (полотнища)',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Древко прапора',
          description:
            'Різкий імпульсний рух ціни, що передує консолідації та формує основу патерну',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Полотнище прапора',
          description:
            'Фаза консолідації у вузькому каналі з нахилом проти основного тренду',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Бичачий прапор',
          description:
            'Патерн продовження висхідного тренду з консолідацією, нахиленою вниз',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ведмежий прапор',
          description:
            'Патерн продовження низхідного тренду з консолідацією, нахиленою вгору',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Пробій прапора',
          description:
            'Вихід ціни за межу консолідації із закриттям свічки, що сигналізує про продовження тренду',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Хибний пробій',
          description:
            'Короткочасний вихід ціни за межу прапора з подальшим поверненням у діапазон консолідації',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Проекція цілі',
          description:
            'Метод розрахунку цільової ціни шляхом відкладання довжини древка від точки пробою',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Консолідація',
          description:
            'Період бічного руху ціни у вузькому діапазоні, що відображає тимчасову паузу в тренді',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Імпульс',
          description:
            "Різкий односпрямований рух ціни з високим об'ємом, що формує початок патерну",
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
