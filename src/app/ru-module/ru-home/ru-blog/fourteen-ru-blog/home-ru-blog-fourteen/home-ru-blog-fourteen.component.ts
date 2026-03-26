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
  selector: 'app-home-ru-blog-fourteen',
  templateUrl: './home-ru-blog-fourteen.component.html',
  styleUrl: './home-ru-blog-fourteen.component.scss',
})
export class HomeRuBlogFourteenComponent implements OnInit {
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
      'Трейдинг и инвестиции: в чём разница и что выбрать | ArapovTrade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Трейдинг и инвестиции: ключевые различия, преимущества и недостатки каждого подхода. Как выбрать свой путь к финансовой независимости.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-11-07' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/tradingandinvestments.webp',
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
          '@id':
            'https://arapov.trade/ru/freestudying/tradingandinvestments#article',
          headline:
            'Трейдинг и инвестиции: ключевые различия и выбор стратегии',
          description:
            'Трейдинг и инвестиции: ключевые различия, преимущества и недостатки каждого подхода к работе на финансовых рынках.',
          image:
            'https://arapov.trade/assets/img/content/tradingandinvestments1.webp',
          datePublished: '2026-03-15T00:00:00Z',
          dateModified: '2026-03-22T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Pair Trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/tradingandinvestments',
          },
          articleSection: 'Трейдинг',
          keywords: [
            'трейдинг',
            'инвестиции',
            'трейдер',
            'инвестор',
            'финансовые рынки',
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
        'https://t.me/ArapovTrade'
      ],
      jobTitle: ['Независимый исследователь', 'трейдер', 'автор и основатель arapov.trade'],
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
      '@id': 'https://arapov.trade/ru/freestudying/tradingandinvestments#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Чем трейдер отличается от инвестора?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Трейдер совершает частые сделки на коротких временных интервалах, зарабатывая на ценовых колебаниях. Инвестор держит активы месяцами и годами, получая доход от роста стоимости и дивидендов.',
          },
        },
        {
          '@type': 'Question',
          name: 'Сколько можно заработать на трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Профессиональные трейдеры зарабатывают 30-100% годовых, но 70-80% новичков теряют депозит в первый год. Доходность зависит от навыков, стратегии и дисциплины.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какой начальный капитал нужен для инвестиций?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Начать инвестировать можно с 1000-5000 рублей через брокерский счёт. Для диверсифицированного портфеля рекомендуется минимум 50-100 тысяч рублей.',
          },
        },
        {
          '@type': 'Question',
          name: 'Можно ли совмещать трейдинг и инвестиции?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Да, многие профессионалы держат 70-80% капитала в долгосрочных инвестициях и 20-30% используют для активной торговли.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что выгоднее — трейдинг или инвестиции?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Статистически 80% инвесторов в плюсе через 10 лет, тогда как 90% трейдеров в минусе. Однако успешные трейдеры зарабатывают значительно больше среднего инвестора.',
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
      '@id': 'https://arapov.trade/ru/freestudying/tradingandinvestments#howto',
      name: 'Как выбрать между трейдингом и инвестициями',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Оцените свободное время',
          text: 'Трейдинг требует 2-8 часов ежедневно, инвестиции — несколько часов в месяц.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Определите риск-профиль',
          text: 'Высокая толерантность к риску — трейдинг, консервативный подход — инвестиции.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Оцените начальный капитал',
          text: 'Для трейдинга достаточно 100-500 долларов, для инвестиций желательно больше.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Пройдите обучение',
          text: 'Изучите основы выбранного направления на демо-счёте минимум 3 месяца.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Начните с малого',
          text: 'Протестируйте стратегию небольшими суммами перед увеличением объёмов.',
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
      '@id': 'https://arapov.trade/ru/freestudying/tradingandinvestments#terms',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Трейдинг',
          description:
            'Активная торговля финансовыми инструментами на коротких временных интервалах',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Инвестиции',
          description:
            'Долгосрочное вложение капитала в активы для получения дохода',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Диверсификация',
          description:
            'Распределение капитала между разными активами для снижения рисков',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Дивиденды',
          description: 'Часть прибыли компании, выплачиваемая акционерам',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ETF',
          description:
            'Биржевой фонд, торгующийся как акция и содержащий корзину активов',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Технический анализ',
          description:
            'Метод прогнозирования цен на основе графиков и индикаторов',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фундаментальный анализ',
          description:
            'Оценка стоимости актива на основе финансовых показателей',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Риск-менеджмент',
          description: 'Система управления торговыми рисками',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильность',
          description: 'Степень изменчивости цены актива',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Портфель',
          description: 'Совокупность инвестиционных активов владельца',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
