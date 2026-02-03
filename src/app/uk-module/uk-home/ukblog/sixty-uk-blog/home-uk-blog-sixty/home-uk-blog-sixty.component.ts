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
  selector: 'app-home-uk-blog-sixty',
  templateUrl: './home-uk-blog-sixty.component.html',
  styleUrl: './home-uk-blog-sixty.component.scss',
})
export class HomeUkBlogSixtyComponent implements OnInit {
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
      'Трейдинг vs опціони: що обрати трейдеру | ArapovTrade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Трейдинг vs опціони: порівняння двох підходів до торгівлі на фінансових ринках. Дізнайтеся ключові відмінності, переваги та недоліки кожного інструменту для початківців та досвідчених трейдерів.',
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
            'https://arapov.trade/uk/freestudying/tradingvsoptions#article',
          headline: 'Трейдинг vs опціони: що обрати трейдеру',
          description:
            'Порівняння трейдингу та опціонів: ключові відмінності, переваги та недоліки кожного інструменту для початківців та досвідчених трейдерів.',
          image:
            'https://arapov.trade/assets/img/content/tradingvsoptions1.webp',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'ArapovTrade',
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/tradingvsoptions',
          },
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
      '@id': 'https://arapov.trade/uk/freestudying/tradingvsoptions#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Що краще для новачка: трейдинг чи опціони?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для новачків рекомендується починати з класичного трейдингу акціями або валютами. Це дозволяє опанувати базові принципи аналізу ринку та управління ризиками. Опціони вимагають розуміння складних концепцій, таких як греки та часовий розпад.',
          },
        },
        {
          '@type': 'Question',
          name: 'Який капітал потрібен для трейдингу та опціонів?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Трейдинг можна почати з мінімального депозиту від 100-500 доларів на Forex або криптобіржах. Для опціонів на американському ринку зазвичай потрібно від 2000 доларів.',
          },
        },
        {
          '@type': 'Question',
          name: 'Де вищі ризики: в трейдингу чи опціонах?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'При купівлі опціонів ризик обмежений сплаченою премією. У трейдингу збитки можуть перевищити початковий депозит при використанні кредитного плеча. Однак продаж опціонів несе необмежені ризики.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи можна поєднувати трейдинг та опціони?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Так, багато досвідчених трейдерів використовують обидва інструменти. Наприклад, можна торгувати акціями та одночасно хеджувати позиції пут-опціонами.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке греки в опціонах?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Греки — це показники, що вимірюють чутливість ціни опціону до різних факторів: дельта (зміна ціни активу), тета (часовий розпад), вега (волатильність), гамма (швидкість зміни дельти).',
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
      '@id': 'https://arapov.trade/uk/freestudying/tradingvsoptions#howto',
      name: 'Як обрати між трейдингом та опціонами',
      description:
        'Покрокове керівництво з вибору відповідного торговельного інструменту залежно від ваших цілей та досвіду.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Визначте свої цілі',
          text: 'Вирішіть, чого ви хочете досягти: регулярного доходу від короткострокової торгівлі, довгострокових інвестицій чи хеджування портфеля.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Оцініть свій досвід',
          text: 'Якщо ви новачок, почніть з трейдингу для освоєння базових навичок. Опціони підходять досвідченим учасникам ринку.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Визначте толерантність до ризику',
          text: 'Трейдинг з плечем несе високі ризики. Купівля опціонів обмежує збитки розміром премії.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Вивчіть доступні інструменти',
          text: 'Відкрийте демо-рахунок та спробуйте обидва інструменти в безризиковому середовищі.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Почніть з малого',
          text: 'Незалежно від вибору, починайте з мінімальних сум та поступово збільшуйте обсяги.',
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
      '@id': 'https://arapov.trade/uk/freestudying/tradingvsoptions#glossary',
      name: 'Глосарій термінів трейдингу та опціонів',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Опціон',
          description:
            'Похідний фінансовий інструмент, що дає право купити або продати актив за визначеною ціною у встановлений термін.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Колл-опціон',
          description:
            'Контракт, що дає покупцю право придбати базовий актив за фіксованою ціною до дати експірації.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Пут-опціон',
          description:
            'Контракт, що дає покупцю право продати базовий актив за фіксованою ціною до дати експірації.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Премія',
          description:
            'Ціна, яку покупець платить продавцю опціону за право виконання контракту.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Страйк',
          description:
            'Ціна виконання опціону — фіксована ціна, за якою власник може купити або продати базовий актив.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Експірація',
          description: 'Дата закінчення терміну дії опціонного контракту.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Дельта',
          description:
            'Показник чутливості ціни опціону до зміни ціни базового активу.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тета',
          description:
            'Показник часового розпаду опціону — швидкість втрати вартості з наближенням експірації.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Хеджування',
          description:
            'Стратегія захисту портфеля від несприятливих ринкових рухів.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильність',
          description:
            'Ступінь мінливості ціни активу. Висока волатильність збільшує вартість опціонів.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
