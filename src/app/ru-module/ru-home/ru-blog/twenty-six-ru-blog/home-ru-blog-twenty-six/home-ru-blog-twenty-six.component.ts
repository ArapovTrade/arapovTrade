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
  selector: 'app-home-ru-blog-twenty-six',
  templateUrl: './home-ru-blog-twenty-six.component.html',
  styleUrl: './home-ru-blog-twenty-six.component.scss',
})
export class HomeRuBlogTwentySixComponent implements OnInit {
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

    this.ukrGroups = this.artickleServ.getRussianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;
    this.titleService.setTitle(
      'Виды ордеров на бирже: полное руководство | ArapovTrade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Полное руководство по видам ордеров на бирже. Рыночные, лимитные, стоп-ордера, OCO, Iceberg и другие типы приказов для эффективной торговли.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-14' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/ordertypes.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.artickleServ.getRandomUkArticles();
  }

  hoveredIndex: number | null = null;

  projects = [
    { title: 'Книги по трейдингу', link: 'https://arapov.trade/ru/books' },
    {
      title: 'Профессиональные курсы',
      link: 'https://arapov.trade/ru/studying',
    },
    {
      title: 'Базовый курс',
      link: 'https://arapov.trade/ru/freestudying/freeeducation',
    },
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

    this.router.navigate(['/ru/freestudying', nextpage]);
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
          headline: 'Виды ордеров на бирже: полное руководство для трейдеров',
          description:
            'Полное руководство по видам ордеров на бирже. Рыночные, лимитные, стоп-ордера, OCO, Iceberg и другие типы приказов для эффективной торговли.',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2026-03-15T00:00:00Z',
          dateModified: '2026-03-22T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/ordertypes',
          },
          image: 'https://arapov.trade/assets/img/content/ordertypes.webp',
          articleSection: 'Трейдинг',
          inLanguage: 'ru',
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
      alternateName: [
        'Igor Arapov',
        'Арапов Игорь',
        'I. Arapov',
        'Ігор Арапов',
        'І. В. Арапов',
        'Арапов Ігор',
        'Arapov Igor',
      ],
      url: 'https://arapov.trade/ru',
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
        'https://t.me/ArapovTrade',
      ],
      jobTitle: [
        'Независимый исследователь',
        'трейдер',
        'автор и основатель arapov.trade',
      ],
      description:
        'Независимый исследователь, практикующий трейдер, автор книг по трейдингу и научных публикаций. Специализируется на психологии трейдинга и когнитивных искажениях на финансовых рынках.',
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
          name: 'Что такое рыночный ордер?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Рыночный ордер — это приказ купить или продать актив мгновенно по текущей рыночной цене. Исполняется сразу после отправки на биржу при наличии ликвидности. Подходит для срочного входа или выхода из позиции.',
          },
        },
        {
          '@type': 'Question',
          name: 'В чем разница между лимитным и стоп-ордером?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Лимитный ордер исполняется по указанной цене или лучше, размещается для покупки ниже рынка или продажи выше. Стоп-ордер активируется при достижении цены и становится рыночным, используется для защиты позиций или входа по тренду.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое стоп-лосс и зачем он нужен?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Стоп-лосс — это защитный ордер, который автоматически закрывает позицию при достижении определенного уровня убытка. Он необходим для ограничения потерь и является ключевым инструментом риск-менеджмента.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как работает трейлинг-стоп?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Трейлинг-стоп автоматически перемещает уровень стоп-лосса вслед за движением цены в прибыльную сторону. Это позволяет фиксировать прибыль при продолжении тренда и защищает от разворота рынка.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое OCO-ордер?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'OCO (One Cancels the Other) — это связанная пара ордеров, где исполнение одного автоматически отменяет другой. Обычно комбинирует тейк-профит и стоп-лосс для автоматического управления позицией.',
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
      name: 'Как выбрать правильный тип ордера',
      description:
        'Пошаговое руководство по выбору типа ордера в зависимости от торговой ситуации',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Определите цель сделки',
          text: 'Решите, нужен ли вам срочный вход/выход (рыночный ордер) или вы готовы ждать лучшую цену (лимитный ордер).',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Оцените ликвидность рынка',
          text: 'На низколиквидных рынках используйте лимитные ордера для избежания проскальзывания. На ликвидных рынках допустимы рыночные ордера.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Установите защитные ордера',
          text: 'Всегда размещайте стоп-лосс для ограничения убытков. Используйте стоп-лимит при высокой волатильности.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Настройте фиксацию прибыли',
          text: 'Установите тейк-профит или используйте трейлинг-стоп для автоматической фиксации прибыли при движении в вашу сторону.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Используйте комбинированные ордера',
          text: 'Применяйте OCO-ордера для одновременной установки тейк-профита и стоп-лосса, автоматизируя управление позицией.',
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
      name: 'Термины биржевых ордеров',
      description: 'Глоссарий ключевых терминов по видам ордеров на бирже',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Рыночный ордер',
          description:
            'Приказ на немедленную покупку или продажу актива по лучшей доступной рыночной цене',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Лимитный ордер',
          description:
            'Приказ на покупку или продажу актива по указанной цене или лучше',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-ордер',
          description:
            'Условный приказ, который активируется при достижении ценой заданного уровня и становится рыночным ордером',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Защитный ордер для автоматического закрытия позиции при достижении определенного уровня убытка',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тейк-профит',
          description:
            'Ордер для автоматической фиксации прибыли при достижении целевого уровня цены',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Трейлинг-стоп',
          description:
            'Динамический стоп-ордер, автоматически перемещающийся вслед за ценой для защиты прибыли',
        },
        {
          '@type': 'DefinedTerm',
          name: 'OCO-ордер',
          description:
            'One Cancels the Other — связанная пара ордеров, где исполнение одного отменяет другой',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Iceberg-ордер',
          description:
            'Крупный ордер, разделенный на части, где в стакане видна только небольшая часть объема',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Проскальзывание',
          description:
            'Разница между ожидаемой и фактической ценой исполнения ордера',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лимитный ордер',
          description:
            'Комбинированный ордер, который при активации становится лимитным вместо рыночного',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
