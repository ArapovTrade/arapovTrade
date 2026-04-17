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
  selector: 'app-home-uk-blog-fifty-two',
  templateUrl: './home-uk-blog-fifty-two.component.html',
  styleUrl: './home-uk-blog-fifty-two.component.scss',
})
export class HomeUkBlogFiftyTwoComponent implements OnInit {
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
      'Анатомія ринкових трендів: практичний посібник трейдера | ArapovTrade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });

    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Дізнайтеся, як аналізувати тренди на фінансових ринках. Визначення фаз тренду, робота з індикаторами, типові помилки та стратегії торгівлі за трендом.',
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
            'https://arapov.trade/uk/freestudying/anatomyofmarkettrends#article',
          headline: 'Анатомія ринкових трендів: практичний посібник трейдера',
          description:
            'Дізнайтеся, як аналізувати тренди на фінансових ринках. Визначення фаз тренду, робота з індикаторами, типові помилки та стратегії торгівлі за трендом.',
          image: 'https://arapov.trade/assets/img/content/trends1.png',
          datePublished: '2026-03-25T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'ArapovTrade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage:
            'https://arapov.trade/uk/freestudying/anatomyofmarkettrends',
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
          name: 'Що таке тренд у трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Тренд — це стійкий напрямок руху ціни активу протягом певного часу. Висхідний тренд формується через підвищення мінімумів та максимумів, низхідний — через їх зниження.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які фази проходить тренд?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Тренд розвивається через чотири стадії: накопичення, прискорення, розподіл та розворот. Кожна фаза має характерні ознаки за обсягами та волатильністю.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які індикатори визначають тренд?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основні індикатори: ковзні середні (MA50, MA200), MACD для визначення моментів зміни напрямку, RSI для оцінки сили руху, ADX для вимірювання сили тренду.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому небезпечно торгувати проти тренду?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Торгівля проти тренду без підтверджуючих сигналів збільшує ризик збитків. Тренд може тривати значно довше очікувань трейдера.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як обсяги допомагають в аналізі?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Обсяги підтверджують силу тренду: зростання обсягів при русі ціни за трендом підтверджує його силу. Дивергенція між ціною та обсягом часто передує розвороту.',
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
      name: 'Як визначити та торгувати за трендом',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Визначте напрямок',
          text: 'Використовуйте ковзні середні MA50 та MA200. Ціна вище обох ліній — висхідний тренд, нижче — низхідний.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Визначте фазу тренду',
          text: 'Проаналізуйте обсяги та волатильність для розуміння поточної стадії розвитку руху.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Знайдіть точку входу',
          text: 'Входьте на відкатах до рівнів підтримки або до ковзних середніх. Використовуйте рівні Фібоначчі.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Встановіть стоп-лос',
          text: 'Розміщуйте захисний ордер за ключовим рівнем з урахуванням ATR. Ризик — максимум 1-2% депозиту.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Керуйте позицією',
          text: 'Переносьте стоп-лос у беззбиток, частково фіксуйте прибуток на ключових рівнях.',
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
      name: 'Глосарій трейдингових термінів',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Тренд',
          description:
            'Стійкий напрямок руху ціни активу протягом певного періоду часу.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Висхідний тренд',
          description:
            'Бичачий ринок з послідовним підвищенням мінімумів та максимумів ціни.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Низхідний тренд',
          description:
            'Ведмежий ринок з послідовним зниженням максимумів та мінімумів.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Флет',
          description:
            'Бокове переміщення ціни в горизонтальному коридорі без вираженого напрямку.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ковзна середня',
          description:
            'Індикатор, що згладжує цінові коливання та показує середню ціну за обраний період.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'MACD',
          description:
            'Індикатор сходження-розходження ковзних середніх для визначення сили та напрямку тренду.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'RSI',
          description:
            'Індекс відносної сили, що показує перекупленість або перепроданість активу.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фаза накопичення',
          description:
            'Початковий етап тренду, коли великі гравці формують позиції при низькій волатильності.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лос',
          description:
            'Захисний ордер для автоматичного закриття позиції при досягненні рівня збитку.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Обсяговий аналіз',
          description:
            'Метод аналізу ринку на основі торгових обсягів для підтвердження сили цінового руху.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
