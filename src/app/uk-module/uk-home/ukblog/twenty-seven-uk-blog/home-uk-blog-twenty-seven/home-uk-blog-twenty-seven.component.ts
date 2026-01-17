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
  selector: 'app-home-uk-blog-twenty-seven',
  templateUrl: './home-uk-blog-twenty-seven.component.html',
  styleUrl: './home-uk-blog-twenty-seven.component.scss',
})
export class HomeUkBlogTwentySevenComponent implements OnInit {
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
      'Японські свічки в трейдингу: як читати графіки та знаходити точки входу'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Навчіться читати японські свічки: молот, поглинання, доджі, ранкова зірка. Практичний посібник зі свічкового аналізу для трейдерів з прикладами.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-16' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/japanesecandle.jpg',
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
          headline:
            'Японські свічки в трейдингу: як читати графіки та знаходити точки входу',
          description:
            'Навчіться читати японські свічки: молот, поглинання, доджі, ранкова зірка. Практичний посібник зі свічкового аналізу.',
          image: 'https://arapov.trade/assets/img/content/japanessecandle1.jpg',

          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-12T00:00:00Z',
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
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/japanesecandle',
          },
          articleSection: 'Технічний аналіз',
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
          name: 'Що таке японські свічки?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Японські свічки — графічний метод відображення цінових рухів, що показує ціни відкриття, закриття, максимум та мінімум за період.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які основні свічкові патерни існують?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основні патерни: молот, повішений, поглинання, доджі, ранкова зірка, вечірня зірка, марубозу.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як визначити розворот за свічками?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Розворотні патерни формуються на ключових рівнях та підтверджуються обсягом і індикаторами.',
          },
        },
        {
          '@type': 'Question',
          name: 'На яких таймфреймах працюють свічкові патерни?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Свічки працюють на всіх таймфреймах, але сигнали на H4 і вище надійніші.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як підтвердити свічковий сигнал?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Використовуйте обсяг, RSI, MACD, рівні підтримки/опору та Фібоначчі.',
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
      name: 'Як аналізувати японські свічки',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Визначте тренд',
          text: 'Використовуйте ковзні середні для розуміння напрямку ринку.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Знайдіть ключові рівні',
          text: 'Позначте зони підтримки та опору на графіку.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Ідентифікуйте патерн',
          text: 'Знайдіть свічкову формацію: молот, поглинання, доджі.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Підтвердіть сигнал',
          text: 'Перевірте обсяг та показання RSI або MACD.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Увійдіть в угоду',
          text: 'Встановіть стоп-лосс та тейк-профіт зі співвідношенням 1:2.',
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
      name: 'Глосарій японських свічок',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Японська свічка',
          description:
            'Графічний елемент, що показує відкриття, закриття, максимум і мінімум ціни',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тіло свічки',
          description: 'Прямокутник між ціною відкриття та закриття',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тінь свічки',
          description: 'Лінії вище та нижче тіла, що показують екстремуми',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Молот',
          description:
            'Розворотна свічка з маленьким тілом та довгою нижньою тінню',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Поглинання',
          description:
            'Двосвічкова формація, де друга свічка повністю перекриває першу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Доджі',
          description: 'Свічка з майже рівними цінами відкриття та закриття',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Марубозу',
          description: 'Свічка з великим тілом та мінімальними тінями',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ранкова зірка',
          description: 'Трисвічкова розворотна формація вгору',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Вечірня зірка',
          description: 'Трисвічкова розворотна формація вниз',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Повішений',
          description: 'Ведмежа версія молота на вершині тренду',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
