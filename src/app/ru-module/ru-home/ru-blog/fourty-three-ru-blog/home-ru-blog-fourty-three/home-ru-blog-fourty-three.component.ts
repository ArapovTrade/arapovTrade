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
  selector: 'app-home-ru-blog-fourty-three',
  templateUrl: './home-ru-blog-fourty-three.component.html',
  styleUrl: './home-ru-blog-fourty-three.component.scss',
})
export class HomeRuBlogFourtyThreeComponent implements OnInit {
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
      'Спрос и предложение в криптовалютах | Полное руководство'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Как анализировать спрос и предложение на рынке криптовалют. Изучите методы оценки баланса сил, объёмы торгов, ордербук и стратегии для прибыльного трейдинга.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-25' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cryptomarketanalysis.png',
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
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/cryptomarketanalysis',
          },
          headline:
            'Спрос и предложение в криптовалютах: полное руководство по анализу рынка',
          description:
            'Как анализировать спрос и предложение на рынке криптовалют. Изучите методы оценки баланса сил, объёмы торгов, ордербук и стратегии для прибыльного трейдинга.',
          image:
            'https://arapov.trade/assets/img/content/cryptomarketanalysis.png',
          author: {
            '@type': 'Person',
            name: 'Игорь Арапов',
            url: 'https://arapov.trade/ru',
            sameAs: [
              'https://www.youtube.com/@ArapovTrade',
              'https://t.me/ArapovTrade',
            ],
          },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
          articleBody:
            'Криптовалютный рынок функционирует по базовым экономическим законам, где взаимодействие покупателей и продавцов определяет ценообразование каждого актива...',
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
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Что такое спрос и предложение на крипторынке?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Спрос — это готовность покупателей приобретать криптовалюту по определённой цене, а предложение — количество монет, которое владельцы готовы продать. Баланс этих сил определяет текущую рыночную цену актива.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как объёмы торгов связаны со спросом и предложением?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Объёмы торгов показывают интенсивность рыночной активности. Растущие объёмы при росте цены подтверждают сильный спрос, а высокие объёмы при падении указывают на доминирование продавцов и избыточное предложение.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие инструменты используют для анализа баланса спроса и предложения?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Трейдеры применяют ордербук для просмотра заявок, кластерный анализ объёмов, индикаторы OBV и A/D, профиль рынка, а также данные о потоках криптовалют между кошельками и биржами.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему ограниченная эмиссия влияет на цену криптовалют?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ограниченный запас, как у Bitcoin с его 21 миллионом монет, создаёт дефицит. При росте спроса и фиксированном предложении цена неизбежно растёт согласно закону экономики.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как действия китов влияют на баланс рынка?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Крупные держатели (киты) способны резко менять баланс спроса и предложения. Массовая продажа создаёт избыток монет и давит на цену вниз, а крупные покупки поглощают предложение и толкают цену вверх.',
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
      name: 'Как анализировать спрос и предложение на крипторынке',
      description:
        'Пошаговое руководство по оценке баланса покупателей и продавцов для принятия торговых решений',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Изучите ордербук',
          text: 'Откройте книгу ордеров на бирже и проанализируйте соотношение заявок на покупку и продажу. Крупные кластеры ордеров указывают на значимые ценовые уровни.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Проанализируйте объёмы торгов',
          text: 'Сопоставьте динамику цены с объёмами. Рост цены на высоких объёмах подтверждает силу спроса, падение объёмов при росте предупреждает о слабости движения.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Определите ключевые уровни',
          text: 'Найдите зоны поддержки, где покупатели активно защищают цену, и сопротивления, где продавцы создают давление. Эти уровни отражают баланс сил.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Отслеживайте потоки криптовалют',
          text: 'Мониторьте движение монет между кошельками и биржами. Приток на биржи сигнализирует о готовности к продаже, вывод — о накоплении.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Учитывайте рыночные настроения',
          text: 'Анализируйте индекс страха и жадности, активность в социальных сетях и новостной фон. Эмоции участников усиливают дисбаланс спроса и предложения.',
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
      name: 'Термины анализа спроса и предложения криптовалют',
      description: 'Ключевые понятия для понимания рыночной динамики',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Ордербук',
          description:
            'Книга заявок, отображающая все текущие ордера на покупку и продажу с указанием цены и объёма',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ликвидность',
          description:
            'Способность рынка обеспечивать быстрое исполнение сделок без существенного влияния на цену',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Киты',
          description:
            'Крупные держатели криптовалют, чьи сделки способны значительно влиять на рыночную цену',
        },
        {
          '@type': 'DefinedTerm',
          name: 'On-chain анализ',
          description:
            'Изучение данных блокчейна для оценки активности сети, потоков средств и поведения участников',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кластерный анализ объёмов',
          description:
            'Метод визуализации торговой активности на каждом ценовом уровне для выявления зон накопления',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Индекс страха и жадности',
          description:
            'Индикатор рыночных настроений, измеряющий эмоциональное состояние участников рынка по шкале от 0 до 100',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Халвинг',
          description:
            'Сокращение вдвое награды майнерам, уменьшающее темпы эмиссии новых монет и влияющее на предложение',
        },
        {
          '@type': 'DefinedTerm',
          name: 'DeFi',
          description:
            'Децентрализованные финансы — экосистема финансовых приложений на блокчейне без посредников',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стейкинг',
          description:
            'Блокировка криптовалюты для поддержки работы сети с получением вознаграждения, влияющая на доступное предложение',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
