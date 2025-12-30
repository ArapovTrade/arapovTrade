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
  selector: 'app-home-uk-blog-nineteen',
  templateUrl: './home-uk-blog-nineteen.component.html',
  styleUrl: './home-uk-blog-nineteen.component.scss',
})
export class HomeUkBlogNineteenComponent implements OnInit {
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
      'Метод Вайкоффа у трейдингу | Повний посібник 2025'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Метод Вайкоффа у трейдингу: детальний посібник з аналізу ринкових фаз, виявлення дій великих гравців та побудови торгових стратегій.',
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
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/wyckoffmethod',
          },
          headline: 'Метод Вайкоффа у трейдингу | Повний посібник 2025',
          description:
            'Метод Вайкоффа у трейдингу: детальний посібник з аналізу ринкових фаз, виявлення дій великих гравців та побудови торгових стратегій.',
          image: 'https://arapov.trade/assets/img/content/wyckoffmethod.webp',
          datePublished: '2025-03-15T00:00:00+02:00',
          dateModified: '2025-12-15T00:00:00+02:00',
          inLanguage: 'uk',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov.Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          video: {
            '@type': 'VideoObject',
            name: 'Метод Вайкоффа для начинающих трейдеров: полное руководство по объемному анализу',
            description:
              'Метод Вайкоффа для начинающих трейдеров: полное руководство по объемному анализу рынка. Узнайте, как следовать за крупными деньгами и использовать фазы накопления и распределения.',
            thumbnailUrl: [
              'https://img.youtube.com/vi/-oEWnPGRVqs/maxresdefault.jpg',
              'https://img.youtube.com/vi/-oEWnPGRVqs/hqdefault.jpg',
            ],
            uploadDate: '2024-06-15T00:00:00+02:00',
            duration: 'PT7M41S',
            contentUrl: 'https://www.youtube.com/watch?v=-oEWnPGRVqs',
            embedUrl: 'https://www.youtube.com/embed/-oEWnPGRVqs',
            inLanguage: 'ru',
            keywords:
              'метод Вайкоффа, Wyckoff, объемный анализ, VSA, фазы рынка, накопление, распределение',
            hasPart: [
              {
                '@type': 'Clip',
                name: 'Введение в метод Вайкоффа для начинающих',
                startOffset: 0,
                endOffset: 45,
                url: 'https://www.youtube.com/watch?v=-oEWnPGRVqs&t=0',
              },
              {
                '@type': 'Clip',
                name: 'История метода Вайкоффа - почему работает с 1905 года',
                startOffset: 45,
                endOffset: 195,
                url: 'https://www.youtube.com/watch?v=-oEWnPGRVqs&t=45',
              },
              {
                '@type': 'Clip',
                name: 'Суть концепции Вайкоффа - следуйте за профессионалами',
                startOffset: 195,
                endOffset: 280,
                url: 'https://www.youtube.com/watch?v=-oEWnPGRVqs&t=195',
              },
              {
                '@type': 'Clip',
                name: 'Фазы рынка: накопление и распределение',
                startOffset: 280,
                endOffset: 380,
                url: 'https://www.youtube.com/watch?v=-oEWnPGRVqs&t=280',
              },
              {
                '@type': 'Clip',
                name: 'Как крупный капитал собирает и распределяет позиции',
                startOffset: 380,
                endOffset: 461,
                url: 'https://www.youtube.com/watch?v=-oEWnPGRVqs&t=380',
              },
            ],
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
          name: 'Що таке метод Вайкоффа?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Метод Вайкоффа — це аналітична система для розуміння поведінки великих інституційних учасників ринку через аналіз цінових графіків та обсягів торгів.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які фази ринку виділяє Вайкофф?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Вайкофф виділяє акумуляцію, markup, дистрибуцію та markdown.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке спринг?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Спринг — хибний пробій нижньої межі діапазону накопичення для збору ліквідності.',
          },
        },
        {
          '@type': 'Question',
          name: "Навіщо потрібен об'ємний аналіз?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Обсяги підтверджують справжність цінових рухів та виявляють присутність великих гравців.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи працює Вайкофф на криптовалютах?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Так, криптовалютний ринок демонструє яскраві патерни Вайкоффа завдяки концентрації капіталу.',
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
      name: 'Як торгувати за методом Вайкоффа',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Визначте фазу ринку',
          text: 'Проаналізуйте графік на старшому таймфреймі',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Знайдіть патерни',
          text: 'Ідентифікуйте спринг або аптраст',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Підтвердіть обсягами',
          text: "Перевірте сигнал за допомогою об'ємного аналізу",
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Відкрийте позицію',
          text: 'Встановіть вхід та стоп-лосс',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Керуйте ризиком',
          text: 'Перенесіть стоп у беззбиток після досягнення цілі',
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
      name: 'Глосарій Вайкоффа',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Акумуляція',
          description: 'Фаза прихованого накопичення позицій',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Дистрибуція',
          description: 'Фаза розподілу позицій',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спринг',
          description: 'Хибний пробій підтримки',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Аптраст',
          description: 'Хибний пробій опору',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Markup',
          description: 'Висхідний тренд',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Markdown',
          description: 'Спадний тренд',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Дельта обсягу',
          description: 'Різниця покупок та продажів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Профіль обсягу',
          description: 'Розподіл активності за рівнями',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
