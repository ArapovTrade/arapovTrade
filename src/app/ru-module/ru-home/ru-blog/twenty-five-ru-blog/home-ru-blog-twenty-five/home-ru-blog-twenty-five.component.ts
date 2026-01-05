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
  selector: 'app-home-ru-blog-twenty-five',
  templateUrl: './home-ru-blog-twenty-five.component.html',
  styleUrl: './home-ru-blog-twenty-five.component.scss',
})
export class HomeRuBlogTwentyFiveComponent implements OnInit {
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
      'Маркет-мейкеры в криптовалютном рынке | Роль и функции'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Полное руководство по маркет-мейкерам на крипторынке. Узнайте, как они обеспечивают ликвидность, снижают волатильность и влияют на торговлю криптовалютами.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-22' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cryptommakers.webpp',
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
          headline: 'Маркет-мейкеры в криптовалютном рынке: роль и функции',
          description:
            'Полное руководство по маркет-мейкерам на крипторынке. Узнайте, как они обеспечивают ликвидность, снижают волатильность и влияют на торговлю криптовалютами.',
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
          image: ['https://arapov.trade/assets/img/content/cryptommakers.webp'],
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-12T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/cryptommakers',
          },
          articleSection: 'Криптовалюты',
          keywords: [
            'маркет-мейкер',
            'криптовалюта',
            'ликвидность',
            'спред',
            'DEX',
            'CEX',
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
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Кто такие маркет-мейкеры в криптовалютах?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Маркет-мейкеры — это профессиональные участники рынка, обеспечивающие ликвидность путём постоянного размещения ордеров на покупку и продажу. Они создают условия для быстрого исполнения сделок, минимизируют спреды и стабилизируют цены на криптовалютных биржах.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как маркет-мейкеры зарабатывают на крипторынке?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Маркет-мейкеры зарабатывают на спреде — разнице между ценой покупки и продажи. Они покупают активы по более низкой цене (bid) и продают по более высокой (ask). Также они могут получать комиссии от бирж за обеспечение ликвидности.',
          },
        },
        {
          '@type': 'Question',
          name: 'В чём разница между маркет-мейкерами на CEX и DEX?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'На централизованных биржах (CEX) маркет-мейкеры работают через ордербук, размещая лимитные заявки. На децентрализованных биржах (DEX) они обеспечивают ликвидность через пулы ликвидности, добавляя активы в смарт-контракты для автоматического обмена.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие риски связаны с маркет-мейкингом?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основные риски включают волатильность рынка, технические сбои алгоритмов, регуляторные изменения и конкуренцию. На малоликвидных рынках маркет-мейкеры также сталкиваются с риском значительных убытков при резких ценовых движениях.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему маркет-мейкеры важны для новых токенов?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Маркет-мейкеры критически важны для новых токенов, поскольку обеспечивают начальную ликвидность. Без них новые проекты страдают от широких спредов, низких объёмов торгов и высокой волатильности, что отпугивает трейдеров и инвесторов.',
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
      name: 'Как работают маркет-мейкеры на крипторынке',
      description:
        'Основные этапы работы маркет-мейкеров на криптовалютном рынке',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Анализ рыночных условий',
          text: 'Маркет-мейкеры анализируют объёмы торгов, спреды, волатильность и текущие тренды для определения оптимальной стратегии.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Размещение двусторонних ордеров',
          text: 'Одновременно выставляются ордера на покупку (bid) и продажу (ask), создавая ликвидность для других участников рынка.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Алгоритмическое управление',
          text: 'Алгоритмы автоматически корректируют ордера в реальном времени, реагируя на изменения рыночных условий.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Управление рисками',
          text: 'Применяются стратегии хеджирования, stop-loss ордера и лимиты позиций для защиты от убытков.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Балансировка позиций',
          text: 'Маркет-мейкеры постоянно ребалансируют свои позиции для поддержания нейтральности относительно направления рынка.',
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
      name: 'Терминология маркет-мейкинга',
      description: 'Основные термины криптовалютного маркет-мейкинга',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Маркет-мейкер',
          description:
            'Участник рынка, обеспечивающий ликвидность путём постоянного размещения ордеров на покупку и продажу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спред',
          description:
            'Разница между лучшей ценой покупки (bid) и лучшей ценой продажи (ask)',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ликвидность',
          description:
            'Способность рынка обеспечивать быстрое исполнение сделок без существенного влияния на цену',
        },
        {
          '@type': 'DefinedTerm',
          name: 'CEX',
          description:
            'Centralized Exchange — централизованная биржа с ордербуком и кастодиальным хранением активов',
        },
        {
          '@type': 'DefinedTerm',
          name: 'DEX',
          description:
            'Decentralized Exchange — децентрализованная биржа на базе смарт-контрактов',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Пул ликвидности',
          description:
            'Смарт-контракт с заблокированными активами для автоматического обмена токенов',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Slippage',
          description:
            'Проскальзывание — разница между ожидаемой и фактической ценой исполнения сделки',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ордербук',
          description:
            'Книга заявок — список всех активных ордеров на покупку и продажу актива',
        },
        {
          '@type': 'DefinedTerm',
          name: 'HFT',
          description:
            'High-Frequency Trading — высокочастотная торговля с использованием алгоритмов',
        },
        {
          '@type': 'DefinedTerm',
          name: 'AMM',
          description:
            'Automated Market Maker — автоматический маркет-мейкер на основе математических формул',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
