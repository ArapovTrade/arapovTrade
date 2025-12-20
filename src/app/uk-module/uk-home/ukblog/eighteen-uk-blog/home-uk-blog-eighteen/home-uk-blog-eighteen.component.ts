import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Inject,
  Renderer2,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';
import { ThemeservService } from '../../../../../servises/themeserv.service';
import { artickle } from '../../../../../servises/articles.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-home-uk-blog-eighteen',
  templateUrl: './home-uk-blog-eighteen.component.html',
  styleUrl: './home-uk-blog-eighteen.component.scss',
})
export class HomeUkBlogEighteenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private artickleServ: ArticlesService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
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
      'Об’ємний аналіз ринку в трейдингу | ArapovTrade'
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({
      name: 'description',
      content:
        'Повний посібник з об’ємного аналізу ринку. Volume Profile, Delta Volume, Footprint Charts та практичні стратегії аналізу об’ємів для трейдерів.',
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
            '@id': 'https://arapov.trade/uk/freestudying/volmarketanalisys',
          },
          headline: 'Об`ємний аналіз ринку в трейдингу | ArapovTrade',
          description:
            'Повний посібник з об`ємного аналізу ринку. Volume Profile, Delta Volume, Footprint Charts та практичні стратегії аналізу об`ємів для трейдерів.',
          image:
            'https://arapov.trade/assets/img/content/volmarketanalisys.webp',
          datePublished: '2025-09-14T00:00:00+03:00',
          dateModified: '2025-10-14T00:00:00+02:00',
          inLanguage: 'uk',
          author: {
            '@type': 'Person',
            '@id': 'https://arapov.trade/uk#person',
            name: 'Игорь Арапов',
            url: 'https://arapov.trade/uk',
            sameAs: [
              'https://www.youtube.com/@ArapovTrade',
              'https://www.mql5.com/ru/signals/2246716',
            ],
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
            name: 'Индикатор объема - ключевой инструмент технического анализа',
            description:
              'Индикатор объема - ключевой инструмент технического анализа для трейдера. Разбираю основы объемного анализа: как читать объемы, определять дисбаланс спроса и предложения, находить Smart Money на рынке.',
            thumbnailUrl: [
              'https://img.youtube.com/vi/0pXHZRfVW9E/maxresdefault.jpg',
              'https://img.youtube.com/vi/0pXHZRfVW9E/hqdefault.jpg',
            ],
            uploadDate: '2025-10-13T00:00:00+02:00',
            duration: 'PT6M54S',
            contentUrl: 'https://www.youtube.com/watch?v=0pXHZRfVW9E',
            embedUrl: 'https://www.youtube.com/embed/0pXHZRfVW9E',
            inLanguage: 'ru',
            keywords:
              'объемы в трейдинге, индикатор объема, анализ объемов, Smart Money, биржевой стакан',
            hasPart: [
              {
                '@type': 'Clip',
                name: 'Откуда берется объем на бирже',
                startOffset: 39,
                endOffset: 56,
                url: 'https://www.youtube.com/watch?v=0pXHZRfVW9E&t=39',
              },
              {
                '@type': 'Clip',
                name: 'Биржевой стакан - что это и как работает',
                startOffset: 56,
                endOffset: 80,
                url: 'https://www.youtube.com/watch?v=0pXHZRfVW9E&t=56',
              },
              {
                '@type': 'Clip',
                name: 'Механика движения цены на рынке',
                startOffset: 80,
                endOffset: 90,
                url: 'https://www.youtube.com/watch?v=0pXHZRfVW9E&t=80',
              },
              {
                '@type': 'Clip',
                name: 'Как увидеть дисбаланс спроса и предложения',
                startOffset: 90,
                endOffset: 150,
                url: 'https://www.youtube.com/watch?v=0pXHZRfVW9E&t=90',
              },
              {
                '@type': 'Clip',
                name: 'Анализ больших объемов профессионалов',
                startOffset: 150,
                endOffset: 160,
                url: 'https://www.youtube.com/watch?v=0pXHZRfVW9E&t=150',
              },
              {
                '@type': 'Clip',
                name: 'Как правильно анализировать объемы',
                startOffset: 160,
                endOffset: 260,
                url: 'https://www.youtube.com/watch?v=0pXHZRfVW9E&t=160',
              },
              {
                '@type': 'Clip',
                name: 'Логика Smart Money в трейдинге',
                startOffset: 260,
                endOffset: 316,
                url: 'https://www.youtube.com/watch?v=0pXHZRfVW9E&t=260',
              },
              {
                '@type': 'Clip',
                name: 'Медвежий объем - объем продаж',
                startOffset: 316,
                endOffset: 327,
                url: 'https://www.youtube.com/watch?v=0pXHZRfVW9E&t=316',
              },
              {
                '@type': 'Clip',
                name: 'Бычий объем - объем покупок',
                startOffset: 327,
                endOffset: 356,
                url: 'https://www.youtube.com/watch?v=0pXHZRfVW9E&t=327',
              },
              {
                '@type': 'Clip',
                name: 'Захват ликвидности профессионалами',
                startOffset: 356,
                endOffset: 414,
                url: 'https://www.youtube.com/watch?v=0pXHZRfVW9E&t=356',
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
          name: "Що таке об'ємний аналіз ринку?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Об'ємний аналіз — це метод технічного аналізу, що базується на вивченні торгових об'ємів. Він допомагає виявити справжні наміри великих гравців та визначити, куди вони спрямовують ліквідність, аналізуючи кількість угод на різних цінових рівнях.",
          },
        },
        {
          '@type': 'Question',
          name: "Які основні інструменти об'ємного аналізу?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Основні інструменти: Volume Profile (розподіл об'ємів за цінами), Delta Volume (різниця між купівлями та продажами), Footprint Charts (детальний аналіз ордерів), Open Interest (відкритий інтерес на ф'ючерсах).",
          },
        },
        {
          '@type': 'Question',
          name: "Як об'єм підтверджує тренд?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Зростаючий тренд зі збільшенням об'єму підтверджує силу руху. Зниження об'єму при зростанні ціни сигналізує про послаблення тренду. Високі об'єми на пробої рівня підтверджують його істинність.",
          },
        },
        {
          '@type': 'Question',
          name: 'Як відрізнити справжній пробій від хибного?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Справжній пробій супроводжується різким збільшенням об'єму та продовженням руху. Хибний пробій характеризується низьким об'ємом або його падінням після пробою, що часто призводить до повернення ціни в діапазон.",
          },
        },
        {
          '@type': 'Question',
          name: "На яких платформах краще проводити об'ємний аналіз?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Найкращі платформи для об'ємного аналізу: TradingView (базові індикатори), ATAS (професійний аналіз потоку ордерів), Bookmap (теплові карти ліквідності). Вибір залежить від ринку та стилю торгівлі.",
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
      name: "Як проводити об'ємний аналіз ринку",
      description:
        "Покроковий процес аналізу ринкових об'ємів для прийняття торгових рішень",
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Визначте ринковий контекст',
          text: "Оцініть поточну фазу ринку: тренд, флет чи консолідація. Об'ємні рівні працюють по-різному залежно від ринкових умов.",
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Використовуйте мультитаймфреймовий аналіз',
          text: "Аналізуйте об'єми на старших таймфреймах для визначення глобальних рівнів ліквідності, на молодших — для пошуку точок входу.",
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: "Знайдіть ключові об'ємні рівні",
          text: "Використовуйте Volume Profile для визначення POC (Point of Control) та зон накопичення об'єму, де концентрується ліквідність.",
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Аналізуйте Delta Volume',
          text: 'Оцініть співвідношення купівель та продажів. Позитивна дельта вказує на переважання покупців, негативна — продавців.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Підтвердіть сигнали Price Action',
          text: "Комбінуйте об'ємний аналіз зі свічковими патернами та рівнями підтримки/опору для підвищення точності входів.",
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
      name: "Терміни об'ємного аналізу в трейдингу",
      description: "Глосарій ключових термінів об'ємного аналізу ринку",
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: "Об'ємний аналіз",
          description:
            "Метод технічного аналізу, що вивчає торгові об'єми для визначення активності учасників ринку та намірів великих гравців",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volume Profile',
          description:
            "Індикатор, що показує розподіл торгових об'ємів за різними ціновими рівнями за певний період",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Delta Volume',
          description:
            "Різниця між об'ємом ринкових купівель та продажів, що показує реальний тиск покупців або продавців",
        },
        {
          '@type': 'DefinedTerm',
          name: 'POC',
          description:
            "Point of Control — ціновий рівень з максимальним об'ємом торгів, що часто виступає як зона притягання ціни",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Footprint Charts',
          description:
            "Графіки, що показують детальний розподіл об'ємів всередині кожної свічки з розбивкою на купівлі та продажі",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Відкритий інтерес',
          description:
            "Кількість відкритих позицій на ф'ючерсному ринку, що показує залученість учасників до поточного тренду",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Зона накопичення',
          description:
            'Ціновий діапазон, де великі гравці поступово набирають позиції перед значним рухом ціни',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Зона розподілу',
          description:
            'Ціновий діапазон, де великі гравці поступово закривають позиції, готуючись до розвороту тренду',
        },
        {
          '@type': 'DefinedTerm',
          name: "Тіковий об'єм",
          description:
            "Кількість змін ціни за період часу, що використовується на ринках без централізованого обліку реального об'єму",
        },
        {
          '@type': 'DefinedTerm',
          name: 'VWAP',
          description:
            "Volume Weighted Average Price — середньозважена за об'ємом ціна, що показує справедливу вартість активу",
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
