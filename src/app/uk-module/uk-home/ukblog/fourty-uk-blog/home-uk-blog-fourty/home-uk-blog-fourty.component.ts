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
  selector: 'app-home-uk-blog-fourty',
  templateUrl: './home-uk-blog-fourty.component.html',
  styleUrl: './home-uk-blog-fourty.component.scss',
})
export class HomeUkBlogFourtyComponent implements OnInit {
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
    this.titleService.setTitle(
      'Чому трейдинг такий складний? Головні причини та рішення | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Чому трейдинг такий складний? Розбираємо головні причини: психологія, волатильність, ризик-менеджмент. Практичні поради для подолання труднощів у трейдингу.',
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
          '@id':
            'https://arapov.trade/uk/freestudying/difficulttrading#article',
          headline: 'Чому трейдинг такий складний? Головні причини та рішення',
          description:
            "Комплексний розбір причин складності трейдингу: психологічні бар'єри, волатильність ринків, помилки управління капіталом.",
          datePublished: '2026-03-25T00:00:00Z',
          dateModified: '2026-03-31T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          image:
            'https://arapov.trade/assets/img/content/difficulttrading1.webp',
          articleSection: 'Навчання трейдингу',
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
      '@id': 'https://arapov.trade/uk/freestudying/difficulttrading#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Чому 70% трейдерів втрачають гроші?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основні причини: нереалістичні очікування, відсутність знань про ринки, емоційні рішення та нехтування ризик-менеджментом.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як подолати страх втрати грошей?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Встановлюйте ризик 1-2% на угоду, використовуйте стоп-лоси, торгуйте за планом. Починайте з демо-рахунку.',
          },
        },
        {
          '@type': 'Question',
          name: 'Скільки часу потрібно для освоєння трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Базове розуміння — 3-6 місяців. Стабільний прибуток — 2-3 роки практики.',
          },
        },
        {
          '@type': 'Question',
          name: 'Яка головна помилка початківців?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Торгівля без стратегії та ризик-менеджменту. Надмірний ризик і рішення на емоціях.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи можна заробляти трейдингом стабільно?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Так, при системному навчанні, розробці стратегії та суворому ризик-менеджменті.',
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
      '@id': 'https://arapov.trade/uk/freestudying/difficulttrading#howto',
      name: 'Як подолати складнощі в трейдингу',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Вивчіть основи',
          text: 'Опануйте технічний і фундаментальний аналіз за 2-3 місяці.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Практика на демо',
          text: 'Торгуйте віртуальними грошима 3-6 місяців.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Торговий план',
          text: 'Створіть план з умовами входу, виходу та ризик-лімітами.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Ризик-менеджмент',
          text: 'Ризик на угоду 1-2%. Завжди використовуйте стоп-лоси.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Психологічна стійкість',
          text: 'Ведіть щоденник, робіть перерви, керуйте стресом.',
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
      '@id': 'https://arapov.trade/uk/freestudying/difficulttrading#glossary',
      name: 'Глосарій трейдингу',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Волатильність',
          description: 'Ступінь мінливості ціни активу.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лос',
          description: 'Ордер для обмеження збитків.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ризик-менеджмент',
          description: 'Система управління торговими ризиками.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кредитне плече',
          description: 'Торгівля позиковими коштами.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Диверсифікація',
          description: 'Розподіл капіталу між активами.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговий план',
          description: 'Документ з правилами торгівлі.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Демо-рахунок',
          description: 'Навчальний рахунок з віртуальними грошима.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Технічний аналіз',
          description: 'Аналіз графіків та індикаторів.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фундаментальний аналіз',
          description: 'Аналіз економічних показників.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ліквідність',
          description: 'Здатність швидко продати актив.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
