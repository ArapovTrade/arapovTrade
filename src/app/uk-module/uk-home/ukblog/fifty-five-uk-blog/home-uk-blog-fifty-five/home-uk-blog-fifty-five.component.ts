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
  selector: 'app-home-uk-blog-fifty-five',
  templateUrl: './home-uk-blog-fifty-five.component.html',
  styleUrl: './home-uk-blog-fifty-five.component.scss',
})
export class HomeUkBlogFiftyFiveComponent implements OnInit {
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
      'Скальпінг у трейдингу: Повний посібник | ArapovTrade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Скальпінг у трейдингу: стратегії, інструменти та управління ризиками. Повний посібник для початківців трейдерів з короткострокової торгівлі на Forex, криптовалютах та фондовому ринку.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-04' }); this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/scalpingintrading.webp',
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
            'https://arapov.trade/uk/freestudying/scalpingintrading#article',
          headline: 'Скальпінг у трейдингу: Повний посібник для початківців',
          description:
            'Скальпінг у трейдингу: стратегії, інструменти та управління ризиками. Повний посібник для початківців трейдерів з короткострокової торгівлі.',
          image:
            'https://arapov.trade/assets/img/content/scalpingintrading.webp',
          datePublished: '2026-03-15T00:00:00Z',
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
            '@id': 'https://arapov.trade/uk/freestudying/scalpingintrading',
          },
          articleSection: 'Трейдинг',
          keywords: [
            'скальпінг',
            'скальпінг стратегії',
            'внутрішньоденна торгівля',
            'короткострокова торгівля',
            'управління ризиками',
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
        'https://t.me/ArapovTrade'
      ],
       jobTitle: ['Незалежний дослідник', 'трейдер', 'автор і засновник arapov.trade'],
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
      '@id': 'https://arapov.trade/uk/freestudying/scalpingintrading#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Що таке скальпінг у трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Скальпінг — це метод короткострокової торгівлі, де трейдер здійснює велику кількість угод протягом дня, заробляючи на мінімальних цінових коливаннях. Позиції утримуються від кількох секунд до кількох хвилин.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які таймфрейми використовують скальпери?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Скальпери працюють на коротких таймфреймах: M1 (1 хвилина) для швидкого аналізу, M5 (5 хвилин) для підтвердження тренду та M15 (15 хвилин) для фільтрації хибних сигналів.',
          },
        },
        {
          '@type': 'Question',
          name: 'Скільки капіталу потрібно для скальпінгу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Мінімальний капітал залежить від ринку та брокера. На Forex можна почати з 500-1000 доларів завдяки кредитному плечу. Важливіше правильний ризик-менеджмент — ризик на угоду не повинен перевищувати 1-2% від депозиту.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які індикатори найкращі для скальпінгу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Популярні індикатори для скальпінгу: ковзні середні (MA) для визначення тренду, Bollinger Bands для виявлення волатильності, RSI для визначення перекупленості/перепроданості, MACD для підтвердження сигналів.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи підходить скальпінг для початківців?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Скальпінг вимагає високої концентрації, швидкої реакції та емоційної стійкості. Початківцям рекомендується спочатку опанувати базові принципи трейдингу та потренуватися на демо-рахунку.',
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
      '@id': 'https://arapov.trade/uk/freestudying/scalpingintrading#howto',
      name: 'Як почати скальпінг: покрокова інструкція',
      description:
        'Покрокова інструкція для початківців скальперів з освоєння короткострокової торгівлі на фінансових ринках.',
      totalTime: 'P30D',
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'USD',
        value: '500',
      },
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Оберіть ринок та брокера',
          text: 'Визначтеся з ринком (Forex, криптовалюти, акції) та оберіть надійного брокера з низькими спредами та швидким виконанням ордерів.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Опануйте торговельну платформу',
          text: 'Вивчіть функціонал торговельної платформи (MetaTrader 4/5, cTrader). Налаштуйте графіки та індикатори.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Розробіть торговельну стратегію',
          text: 'Оберіть та протестуйте стратегію скальпінгу: за трендом, на рівнях підтримки/опору або на новинах.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Практикуйтесь на демо-рахунку',
          text: 'Відпрацюйте стратегію на демо-рахунку мінімум 2-4 тижні. Ведіть торговельний щоденник.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Переходьте до реальної торгівлі',
          text: 'Почніть торгувати реальними коштами з мінімальним лотом. Дотримуйтесь ризик-менеджменту.',
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
      '@id': 'https://arapov.trade/uk/freestudying/scalpingintrading#glossary',
      name: 'Глосарій термінів скальпінгу',
      description:
        'Основні терміни та поняття, що використовуються у скальпінгу',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Скальпінг',
          description:
            'Стратегія короткострокової торгівлі з великою кількістю угод на день, спрямована на отримання прибутку з мінімальних цінових рухів.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спред',
          description:
            'Різниця між ціною купівлі (Ask) та ціною продажу (Bid) фінансового інструменту.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Таймфрейм',
          description:
            'Часовий інтервал відображення цінового графіка. Скальпери використовують короткі таймфрейми: M1, M5, M15.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лос',
          description:
            'Захисний ордер для автоматичного закриття збиткової позиції при досягненні певного рівня ціни.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кредитне плече',
          description:
            'Механізм, що дозволяє торгувати сумами, які перевищують власний капітал.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ліквідність',
          description:
            'Здатність активу швидко купуватися або продаватися без суттєвого впливу на його ціну.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Прослизання',
          description:
            'Різниця між очікуваною ціною виконання ордера та фактичною ціною.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ECN-рахунок',
          description:
            'Тип торговельного рахунку з прямим доступом до міжбанківського ринку.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильність',
          description:
            'Ступінь мінливості ціни активу. Помірна волатильність створює можливості для скальпінгу.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ризик-менеджмент',
          description:
            'Система управління ризиками в торгівлі, що включає визначення розміру позиції та встановлення стоп-лосів.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
