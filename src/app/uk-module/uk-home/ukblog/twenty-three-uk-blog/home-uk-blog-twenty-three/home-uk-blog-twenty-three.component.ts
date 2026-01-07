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
  selector: 'app-home-uk-blog-twenty-three',
  templateUrl: './home-uk-blog-twenty-three.component.html',
  styleUrl: './home-uk-blog-twenty-three.component.scss',
})
export class HomeUkBlogTwentyThreeComponent implements OnInit {
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
    this.titleService.setTitle('Bitcoin-ETF: що це таке і як працює');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Повний посібник з Bitcoin-ETF. Дізнайтеся, як працюють біржові фонди на біткоїн, їхні переваги, ризики та вплив на криптовалютний ринок.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-21' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/bitcoinetf.webp',
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
          headline: 'Bitcoin-ETF: що це таке і як працює',
          description:
            'Повний посібник з Bitcoin-ETF. Дізнайтеся, як працюють біржові фонди на біткоїн, їхні переваги, ризики та вплив на криптовалютний ринок.',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            url: 'https://arapov.trade',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/bitcoinetf1.webp',
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-11T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/bitcoinetf',
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
          name: 'Що таке Bitcoin-ETF?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Bitcoin-ETF — це біржовий інвестиційний фонд, що торгується на традиційних біржах і дозволяє інвестувати в біткоїн без прямої купівлі криптовалюти.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чим Bitcoin-ETF відрізняється від купівлі біткоїна?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'При купівлі ETF ви володієте часткою фонду, а не самими біткоїнами. Це позбавляє від необхідності керувати криптогаманцем.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які типи Bitcoin-ETF існують?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Існують спотові ETF (фонд володіє реальними біткоїнами) та ф'ючерсні ETF (фонд використовує ф'ючерсні контракти).",
          },
        },
        {
          '@type': 'Question',
          name: 'Чому Bitcoin-ETF важливий для ринку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Bitcoin-ETF відкриває доступ до криптовалют для інституційних інвесторів, підвищує ліквідність ринку та сприяє інтеграції біткоїна.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які ризики у інвестицій в Bitcoin-ETF?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основні ризики: комісії фонду, відсутність володіння реальними біткоїнами, залежність від регуляторів, волатильність базового активу.',
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
      name: 'Як інвестувати в Bitcoin-ETF',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Вивчіть доступні фонди',
          text: "Порівняйте комісії, ліквідність, репутацію керуючої компанії та тип прив'язки до біткоїна.",
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Виберіть брокера',
          text: 'Використовуйте надійного брокера з доступом до бірж NYSE або Nasdaq.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Відкрийте брокерський рахунок',
          text: 'Пройдіть верифікацію та поповніть рахунок.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Визначте розмір інвестиції',
          text: 'Вирішіть, яку частку портфеля виділити під Bitcoin-ETF.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Здійсніть купівлю',
          text: 'Купіть ETF як звичайну акцію через торговий термінал брокера.',
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
      name: 'Терміни Bitcoin-ETF',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Bitcoin-ETF',
          description:
            'Біржовий інвестиційний фонд, що відстежує ціну біткоїна',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спотовий ETF',
          description: 'Фонд, що володіє реальними біткоїнами в резерві',
        },
        {
          '@type': 'DefinedTerm',
          name: "Ф'ючерсний ETF",
          description:
            "Фонд, що використовує ф'ючерсні контракти для відстеження ціни",
        },
        {
          '@type': 'DefinedTerm',
          name: 'SEC',
          description: 'Комісія з цінних паперів та бірж США, регулятор ринку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Tracking error',
          description: 'Відхилення ціни ETF від ціни базового активу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Комісія за управління',
          description: 'Річна плата фонду за управління активами',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Інституційні інвестори',
          description: 'Великі інвестори: пенсійні фонди, хедж-фонди, банки',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ліквідність',
          description:
            'Здатність швидко купити або продати актив без значного впливу на ціну',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Криптовалютний гаманець',
          description: 'Програма або пристрій для зберігання криптовалют',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Приватний ключ',
          description: 'Секретний код для доступу до криптовалютних активів',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
