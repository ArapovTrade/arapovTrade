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
  selector: 'app-home-uk-blog-fifty',
  templateUrl: './home-uk-blog-fifty.component.html',
  styleUrl: './home-uk-blog-fifty.component.scss',
})
export class HomeUkBlogFiftyComponent implements OnInit {
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
    this.titleService.setTitle('Алгоритмічні ордери на біржі | ArapovTrade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Повний посібник з алгоритмічних ордерів. VWAP, TWAP, Iceberg, Trailing Stop та інші типи автоматизованих заявок для ефективної торгівлі.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-03-26' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/algorithmicorders.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.artickleServ.getRandomUkArticles();
  }

  hoveredIndex: number | null = null;

  projects = [
    { title: 'Книги з трейдингу', link: 'https://arapov.trade/uk/books' },
    { title: 'Професійні курси', link: 'https://arapov.trade/uk/studying' },
    {
      title: 'Базовий курс',
      link: 'https://arapov.trade/uk/freestudying/freeeducation',
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
          headline: 'Алгоритмічні ордери на біржі: повний посібник',
          description:
            'Детальний посібник з алгоритмічних ордерів на біржі. Типи алгоритмічних ордерів, стратегії виконання, управління ризиками та автоматизація торгівлі.',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2026-03-25T00:00:00Z',
          dateModified: '2026-03-31T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/algorithmicorders',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/algorithmicorders.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Технічний аналіз',
          keywords:
            'алгоритмічні ордери, алго-трейдинг, біржові ордери, автоматична торгівля, TWAP, VWAP, виконання ордерів',
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
      alternateName: [
        'Igor Arapov',
        'Арапов Игорь',
        'I. Arapov',
        'Игорь Арапов',
        'І. В. Арапов',
        'Арапов Ігор',
        'Arapov Igor',
      ],
      url: 'https://arapov.trade/uk',
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
        'Незалежний дослідник',
        'трейдер',
        'автор і засновник arapov.trade',
      ],
      description:
        'Незалежний дослідник, практикуючий трейдер, автор книг з трейдингу та наукових публікацій. Спеціалізується на психології трейдингу та когнітивних упередженнях на фінансових ринках.',
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
          name: 'Що таке алгоритмічні ордери?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Автоматизовані заявки, що виконуються програмними алгоритмами для оптимізації торгівлі.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які типи існують?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'VWAP, TWAP, Iceberg, Trailing Stop, Pegged Orders та умовні ордери.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке VWAP?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Алгоритм виконання за зваженою середньою ціною з урахуванням обсягу торгів.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке спуфінг?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Заборонена маніпуляція з розміщенням фіктивних ордерів.',
          },
        },
        {
          '@type': 'Question',
          name: 'Кому доступні алгоритмічні ордери?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Інституційним інвесторам, HFT-компаніям та роздрібним трейдерам через сучасні платформи.',
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
      name: 'Як почати використовувати алгоритмічні ордери',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Вивчіть типи ордерів',
          text: 'Ознайомтеся з VWAP, TWAP, Iceberg та іншими типами алгоритмічних заявок.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Оберіть платформу',
          text: 'Оберіть відповідну платформу: MetaTrader, TradingView, API криптобірж.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Протестуйте на демо',
          text: 'Тестуйте стратегії на демо-рахунку перед реальною торгівлею.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Налаштуйте ризик-менеджмент',
          text: 'Встановіть Stop-Loss і Trailing Stop для захисту капіталу.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Запустіть у реальному часі',
          text: 'Починайте з невеликих обсягів і поступово масштабуйте стратегію.',
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
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Алгоритмічний ордер',
          description: 'Автоматизована заявка за правилами',
        },
        {
          '@type': 'DefinedTerm',
          name: 'VWAP',
          description: 'Зважена за обсягом середня ціна',
        },
        {
          '@type': 'DefinedTerm',
          name: 'TWAP',
          description: 'Зважена за часом середня ціна',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Iceberg Order',
          description: 'Ордер зі схованим обсягом',
        },
        {
          '@type': 'DefinedTerm',
          name: 'HFT',
          description: 'Високочастотна торгівля',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Trailing Stop',
          description: 'Динамічний стоп-лосс',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спуфінг',
          description: 'Заборонена маніпуляція',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Pegged Order',
          description: "Ордер, прив'язаний до bid/ask",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Прослизання',
          description: 'Різниця цін виконання',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Co-Location',
          description: 'Розміщення серверів біля біржі',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
