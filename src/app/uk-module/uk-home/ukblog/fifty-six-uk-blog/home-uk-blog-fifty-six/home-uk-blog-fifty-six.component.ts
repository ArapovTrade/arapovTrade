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
  selector: 'app-home-uk-blog-fifty-six',
  templateUrl: './home-uk-blog-fifty-six.component.html',
  styleUrl: './home-uk-blog-fifty-six.component.scss',
})
export class HomeUkBlogFiftySixComponent implements OnInit {
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
      'Книги з трейдингу для початківців | Найкраща література для трейдерів',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Книги з трейдингу для початківців — повний посібник з вибору професійної літератури. Дізнайтеся, як книги формують торгове мислення та допомагають освоїти аналіз ринків.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-04' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/benefitsoftradingbooks.jpg',
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
            'https://arapov.trade/uk/freestudying/benefitsoftradingbooks#article',
          headline:
            'Книги з трейдингу для початківців — повний посібник з професійної літератури',
          description:
            'Дізнайтеся, чому книги залишаються незамінним інструментом навчання трейдингу, як обрати літературу для свого рівня та інтегрувати книжкові знання у торгову практику.',
          image:
            'https://arapov.trade/assets/img/content/benefitsoftradingbooks1.webp',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
          author: { '@id': 'https://arapov.trade/uk#person' },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id':
              'https://arapov.trade/uk/freestudying/benefitsoftradingbooks',
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
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Які книги з трейдингу краще читати початківцям?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Початківцям рекомендується починати з вступних видань, що пояснюють базові поняття фінансових ринків.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому книги з трейдингу кращі за відеоуроки?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Книги надають структурований виклад матеріалу, дозволяючи читачу глибоко занурюватись у тему.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як застосовувати знання з книг по трейдингу на практиці?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Оптимальний підхід передбачає поетапне освоєння матеріалу з паралельним тестуванням концепцій на демонстраційних рахунках.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які книги допоможуть справитися з емоціями в трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Книги з психології торгівлі допомагають ідентифікувати деструктивні поведінкові паттерни та розробляти стратегії їх подолання.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи потрібно перечитувати книги з трейдингу кілька разів?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Регулярне перечитування ключових книг відкриває нові грані розуміння в міру накопичення торгового досвіду.',
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
      name: 'Як ефективно вивчати книги з трейдингу',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Оберіть книги за рівнем',
          text: 'Визначте свій поточний рівень знань та оберіть літературу відповідної складності.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Вивчайте активно з нотатками',
          text: 'Робіть помітки на полях, виписуйте ключові ідеї, формулюйте питання.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Тестуйте концепції на практиці',
          text: 'Паралельно з читанням перевіряйте вивчені концепції на демонстраційних рахунках.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Впроваджуйте зміни у торгівлю',
          text: 'Визначайте конкретні дії для впровадження у торгову практику після кожної книги.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Періодично перечитуйте ключові книги',
          text: 'Повертайтесь до класичних видань в міру накопичення досвіду.',
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
      '@id':
        'https://arapov.trade/uk/freestudying/benefitsoftradingbooks#glossary',
      name: 'Глосарій термінів трейдингу',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Ковзна середня',
          description:
            'Технічний індикатор, що розраховує середнє значення ціни за визначений період.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лос',
          description:
            'Захисний ордер, що автоматично закриває позицію при досягненні заданого рівня збитку.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ліквідність ринку',
          description:
            'Здатність ринку забезпечувати швидке виконання угод без суттєвого впливу на ціну.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Патерн поглинання',
          description:
            'Свічкова модель розвороту, при якій тіло поточної свічки повністю перекриває попередню.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Технічний аналіз',
          description:
            'Метод прогнозування руху цін на основі вивчення історичних даних та графіків.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговий щоденник',
          description:
            'Інструмент самоаналізу трейдера для фіксації угод та емоційних станів.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильність',
          description:
            'Ступінь мінливості ціни активу за визначений період часу.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Демонстраційний рахунок',
          description: 'Навчальний торговий рахунок з віртуальними коштами.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Прослизання',
          description:
            'Різниця між очікуваною та фактичною ціною виконання ордера.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тейк-профіт',
          description:
            'Ордер на фіксацію прибутку при досягненні цільового рівня ціни.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
