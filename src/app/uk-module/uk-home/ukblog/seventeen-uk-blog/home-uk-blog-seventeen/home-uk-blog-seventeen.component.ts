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
  selector: 'app-home-uk-blog-seventeen',
  templateUrl: './home-uk-blog-seventeen.component.html',
  styleUrl: './home-uk-blog-seventeen.component.scss',
})
export class HomeUkBlogSeventeenComponent implements OnInit {
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
      'Міфи про трейдинг: розвінчання популярних оман | ArapovTrade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Аналізуємо головні міфи про трейдинг: від ілюзії швидкого збагачення до омани про необхідність великого капіталу. Дізнайтеся правду про біржову торгівлю.',
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
          '@id': 'https://arapov.trade/uk/freestudying/tradingmyths#article',
          headline: 'Міфи про трейдинг: розвінчання популярних оман',
          description:
            'Аналізуємо головні міфи про трейдинг: від ілюзії швидкого збагачення до омани про необхідність великого капіталу. Дізнайтеся правду про біржову торгівлю.',
          image: 'https://arapov.trade/assets/img/content/tradingmyths1.webp',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
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
            '@id': 'https://arapov.trade/uk/freestudying/tradingmyths',
          },
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
      '@id': 'https://arapov.trade/uk/freestudying/tradingmyths#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Чи можна швидко розбагатіти на трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ні, трейдинг вимагає місяців навчання та практики. Більшість початківців втрачає капітал у перший рік через нереалістичні очікування. Успіх приходить через поступовий розвиток навичок аналізу та управління ризиками.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи потрібен великий капітал для початку торгівлі?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ні, сучасні брокери дозволяють починати з мінімальних сум. Демо-рахунки дають можливість практикуватися без вкладень. Розмір капіталу впливає на абсолютний прибуток, але не на відсоткову дохідність стратегії.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому професійні трейдери теж зазнають збитків?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Збиткові угоди — невід'ємна частина будь-якої торговельної системи. Навіть стратегії з математичною перевагою допускають відсоток невдач. Професіонали управляють співвідношенням прибутку до збитків через грамотний ризик-менеджмент.",
          },
        },
        {
          '@type': 'Question',
          name: 'Трейдинг — це азартна гра?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ні, на відміну від казино, грамотний трейдер створює статистичну перевагу через аналіз та управління ризиками. Фінансові ринки дозволяють формувати позитивне математичне очікування при дисциплінованому підході.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи потрібно постійно стежити за ринком?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ні, середньострокові та позиційні стратегії вимагають аналізу графіків кілька разів на день або тиждень. Автоматичні ордери захищають позиції без участі трейдера. Надмірний екранний час часто шкодить результатам.',
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
      '@id': 'https://arapov.trade/uk/freestudying/tradingmyths#howto',
      name: 'Як уникнути поширених оман у трейдингу',
      description:
        'Покрокове керівництво з формування реалістичного розуміння біржової торгівлі',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Сформуйте реалістичні очікування',
          text: 'Відмовтеся від ідеї швидкого збагачення. Трейдинг вимагає місяців навчання та практики. Плануйте поступовий розвиток навичок.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Почніть з демо-рахунку',
          text: 'Практикуйтеся без ризику втрати реальних грошей. Освойте базові операції та протестуйте свою стратегію.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Вивчіть основи аналізу',
          text: 'Опануйте технічний та фундаментальний аналіз. Зосередьтеся на простих стратегіях, заснованих на рівнях підтримки та опору.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Впровадьте ризик-менеджмент',
          text: 'Обмежте ризик на угоду заздалегідь визначеним відсотком від капіталу. Використовуйте стоп-лоси для захисту позицій.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Ведіть торговельний журнал',
          text: 'Записуйте всі угоди та аналізуйте результати. Вчіться на помилках та вдосконалюйте стратегію на основі реальних даних.',
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
      '@id': 'https://arapov.trade/uk/freestudying/tradingmyths#glossary',
      name: 'Глосарій термінів трейдингу',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Трейдинг',
          description:
            'Купівля та продаж фінансових інструментів з метою отримання прибутку від зміни цін',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ризик-менеджмент',
          description:
            'Система управління ризиками, що визначає допустимі втрати на угоду та загальний розмір позицій',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Автоматичний ордер на закриття позиції при досягненні заданого рівня збитку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Технічний аналіз',
          description:
            'Метод прогнозування цін на основі вивчення графіків, патернів та індикаторів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фундаментальний аналіз',
          description:
            'Оцінка вартості активу на основі економічних, фінансових та інших якісних факторів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Демо-рахунок',
          description:
            'Навчальний торговельний рахунок з віртуальними грошима для практики без фінансового ризику',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильність',
          description: 'Ступінь мінливості ціни активу за певний період часу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Математичне очікування',
          description:
            'Середній прибуток або збиток на угоду при багаторазовому застосуванні торговельної стратегії',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Рівні підтримки та опору',
          description:
            'Цінові зони, де історично спостерігалася підвищена активність покупців або продавців',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Просідання',
          description:
            'Зниження торговельного капіталу від локального максимуму до локального мінімуму',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
