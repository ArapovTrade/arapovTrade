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
  selector: 'app-home-ru-blog-fourty-six',
  templateUrl: './home-ru-blog-fourty-six.component.html',
  styleUrl: './home-ru-blog-fourty-six.component.scss',
})
export class HomeRuBlogFourtySixComponent implements OnInit {
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

    this.ukrGroups = this.artickleServ.getRussianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;
    this.titleService.setTitle(
      'Bitcoin Pizza Day — первая покупка за биткоины | Значение и уроки'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Bitcoin Pizza Day — история первой покупки за биткоины 22 мая 2010 года. Узнайте, как 10 000 BTC обменяли на две пиццы и почему эта дата изменила финансовый мир.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-27' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/pizzaday.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.artickleServ.getRandomUkArticles();
  }

  hoveredIndex: number | null = null;

  projects = [
    { title: 'Быстрый старт', link: 'https://arapov.education/course/' },
    {
      title: 'Введение в трейдинг',
      link: 'https://arapov.education/reg-workshop/',
    },
    {
      title: 'Профессиональные курсы',
      link: 'https://arapov.trade/ru/studying',
    },
    {
      title: 'Базовый курс',
      link: 'https://arapov.trade/ru/freestudying/freeeducation',
    },
    { title: 'Копитрейдинг', link: 'https://arapovcopytrade.com' },
  ];

  onGroupChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    this.router.navigate(['/ru/freestudying'], {
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
      article.groupsRus.forEach((group) => {
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

    this.router.navigate(['/ru/freestudying', nextpage]);
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

    this.router.navigate(['/ru/freestudying', nextpage]);
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
          '@id': 'https://arapov.trade/ru/freestudying/pizzaday#article',
          headline:
            'Bitcoin Pizza Day — первая покупка за биткоины в истории криптовалют',
          description:
            'Bitcoin Pizza Day — история первой покупки за биткоины 22 мая 2010 года. Узнайте, как 10 000 BTC обменяли на две пиццы и почему эта дата изменила финансовый мир.',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-11-29T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/pizzaday',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/pizzaday1.webp',
          },
          articleSection: 'Криптовалюты',
          keywords: [
            'Bitcoin Pizza Day',
            'первая покупка за биткоины',
            'Ласло Хейниц',
            'история биткоина',
            'криптовалюты',
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
      '@id': 'https://arapov.trade/ru#person',
      name: 'Игорь Арапов',
      url: 'https://arapov.trade/ru',
      image:
        'https://arapov.trade/assets/redesignArapovTrade/img/imageAuthor-light.png',
      sameAs: [
        'https://www.youtube.com/@ArapovTrade',
        'https://t.me/ArapovTrade',
      ],
      jobTitle: 'Профессиональный трейдер',
      description:
        'Активно торгую на финансовых рынках с 2013 года. Автор бесплатного курса по трейдингу.',
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
      '@id': 'https://arapov.trade/ru/freestudying/pizzaday#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Что такое Bitcoin Pizza Day?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Bitcoin Pizza Day — это памятная дата 22 мая, когда в 2010 году программист Ласло Хейниц совершил первую зарегистрированную покупку реального товара за биткоины, обменяв 10 000 BTC на две пиццы.',
          },
        },
        {
          '@type': 'Question',
          name: 'Сколько стоили 10 000 биткоинов в 2010 году?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'На момент сделки в мае 2010 года 10 000 биткоинов стоили примерно 41 доллар США. Сегодня эта сумма оценивается в сотни миллионов долларов.',
          },
        },
        {
          '@type': 'Question',
          name: 'Кто такой Ласло Хейниц?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ласло Хейниц (Laszlo Hanyecz) — американский программист венгерского происхождения, который стал известен как человек, совершивший первую коммерческую транзакцию с использованием биткоина.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему Bitcoin Pizza Day важен для криптосообщества?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Эта дата символизирует переход биткоина от теоретической концепции к практическому применению. Первая покупка доказала, что криптовалюта может функционировать как реальное средство обмена.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как отмечают Bitcoin Pizza Day?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Криптосообщество отмечает 22 мая акциями и скидками от бирж, тематическими встречами энтузиастов, обсуждениями в социальных сетях и благотворительными инициативами.',
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
      '@id': 'https://arapov.trade/ru/freestudying/pizzaday#howto',
      name: 'Как извлечь уроки из истории Bitcoin Pizza Day',
      description:
        'Пошаговое руководство по применению уроков первой криптовалютной транзакции в вашей инвестиционной стратегии.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Изучите историю биткоина',
          text: 'Ознакомьтесь с ключевыми событиями развития криптовалют, начиная с создания биткоина Сатоши Накамото в 2009 году и первой транзакции в 2010 году.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Оцените долгосрочный потенциал',
          text: 'Анализируйте активы не только по текущей цене, но и по их потенциальной роли в будущей экономике. История с пиццей показывает важность долгосрочного мышления.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Управляйте рисками осознанно',
          text: 'Инвестируйте только те средства, которые готовы потерять. Ранние инвестиции в криптовалюты сопряжены с высокой волатильностью.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Участвуйте в сообществе',
          text: 'Присоединяйтесь к криптосообществам, посещайте мероприятия и обменивайтесь опытом с другими энтузиастами блокчейн-технологий.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Применяйте криптовалюты практически',
          text: 'Используйте криптовалюты для реальных покупок, чтобы лучше понять их функционирование как средства обмена.',
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
      '@id': 'https://arapov.trade/ru/freestudying/pizzaday#terms',
      name: 'Глоссарий терминов Bitcoin Pizza Day',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Bitcoin Pizza Day',
          description:
            'Памятная дата 22 мая, когда в 2010 году была совершена первая покупка реального товара за биткоины.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Биткоин',
          description:
            'Первая децентрализованная криптовалюта, созданная в 2009 году анонимным разработчиком под псевдонимом Сатоши Накамото.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Криптовалюта',
          description:
            'Цифровой актив, использующий криптографию для обеспечения безопасности транзакций и контроля создания новых единиц.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Блокчейн',
          description:
            'Распределённая база данных, в которой транзакции записываются в виде цепочки блоков, обеспечивая прозрачность и неизменяемость данных.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Майнинг',
          description:
            'Процесс создания новых блоков в блокчейне и подтверждения транзакций с использованием вычислительных мощностей.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильность',
          description:
            'Степень изменчивости цены актива за определённый период времени, характеризующая уровень рыночного риска.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Децентрализация',
          description:
            'Принцип распределения управления и контроля между множеством участников сети без единого центра власти.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Криптобиржа',
          description:
            'Платформа для покупки, продажи и обмена криптовалют на фиатные деньги или другие цифровые активы.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Bitcointalk',
          description:
            'Первый крупный интернет-форум, посвящённый обсуждению биткоина и криптовалют, основанный Сатоши Накамото.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'HODL',
          description:
            'Криптовалютный сленг, означающий долгосрочное удержание активов независимо от рыночных колебаний.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
