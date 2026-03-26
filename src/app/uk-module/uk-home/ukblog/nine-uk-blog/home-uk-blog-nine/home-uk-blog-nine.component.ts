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
  selector: 'app-home-uk-blog-nine',
  templateUrl: './home-uk-blog-nine.component.html',
  styleUrl: './home-uk-blog-nine.component.scss',
})
export class HomeUkBlogNineComponent implements OnInit {
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
      'Як прогнозувати ціну в трейдингу | ArapovTrade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Методи прогнозування ціни на фінансових ринках. Технічний та фундаментальний аналіз, індикатори, об`ємний аналіз та стратегії передбачення руху ціни для трейдерів.',
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
          headline: 'Як прогнозувати ціну в трейдингу: повний посібник',
          description:
            "Методи прогнозування ціни на фінансових ринках. Технічний та фундаментальний аналіз, індикатори, об'ємний аналіз та стратегії передбачення руху ціни для трейдерів.",
          author: {
            '@id': 'https://arapov.trade/uk#person',
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
            '@id': 'https://arapov.trade/uk/freestudying/predictmarketprice',
          },
          image:
            'https://arapov.trade/assets/img/content/predictmarketprice1.webp',
          articleSection: 'Трейдинг',
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
        'https://t.me/ArapovTrade'
      ],
       jobTitle: ['Незалежний дослідник', 'трейдер', 'автор і засновник arapov.trade'],
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
          name: 'Який метод прогнозування ціни найефективніший?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Найефективніший підхід — комбінування технічного та фундаментального аналізу з об'ємним аналізом. Технічний аналіз визначає точки входу, фундаментальний — загальний напрямок, об'ємний — підтверджує достовірність сигналів.",
          },
        },
        {
          '@type': 'Question',
          name: 'Які індикатори найкращі для прогнозування ціни?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Найпопулярніші індикатори: ковзні середні (MA, EMA) для визначення тренду, RSI для перекупленості/перепроданості, MACD для імпульсу та розворотів, смуги Боллінджера для волатильності, Ichimoku для комплексного аналізу.',
          },
        },
        {
          '@type': 'Question',
          name: "Як об'ємний аналіз допомагає у прогнозуванні?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Об'єм підтверджує силу цінового руху. Зростання ціни на високих об'ємах підтверджує тренд. Дивергенція об'єму та ціни попереджає про можливий розворот. Аномальні об'єми сигналізують про дії великих гравців.",
          },
        },
        {
          '@type': 'Question',
          name: 'Чому важливо комбінувати різні таймфрейми?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Мультитаймфреймовий аналіз дозволяє бачити загальну картину на старшому таймфреймі та знаходити точні входи на молодшому. Це підвищує ймовірність успішних угод та покращує співвідношення ризик/прибуток.',
          },
        },
        {
          '@type': 'Question',
          name: 'Яка головна помилка при прогнозуванні ціни?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Головна помилка — торгівля проти тренду без вагомих підстав та ігнорування управління ризиками. Навіть точний прогноз не гарантує прибутку, якщо трейдер ризикує занадто великою частиною капіталу.',
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
      name: 'Як прогнозувати ціну на фінансових ринках',
      description:
        'Покроковий процес прогнозування цінових рухів для прийняття торгових рішень',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Визначте загальний тренд',
          text: 'Використовуйте ковзні середні та аналіз максимумів/мінімумів на старшому таймфреймі для визначення напрямку основного тренду.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Знайдіть ключові рівні',
          text: "Визначте рівні підтримки та опору, рівні Фібоначчі та зони концентрації об'єму, де ціна може зупинитися або розвернутися.",
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Проаналізуйте індикатори',
          text: 'Застосуйте технічні індикатори (RSI, MACD, Bollinger Bands) для підтвердження сигналів та визначення імпульсу ринку.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: "Перевірте об'єми",
          text: "Переконайтеся, що об'єм підтверджує ціновий рух. Високий об'єм на пробої підтверджує його достовірність.",
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Врахуйте фундаментальні фактори',
          text: 'Перевірте економічний календар та новинний фон. Уникайте входу перед важливими новинами або враховуйте їх потенційний вплив.',
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
      name: 'Терміни прогнозування ціни в трейдингу',
      description:
        'Глосарій ключових термінів для прогнозування цін на фінансових ринках',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Технічний аналіз',
          description:
            'Метод прогнозування ціни на основі вивчення історичних цінових даних, графічних патернів та технічних індикаторів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фундаментальний аналіз',
          description:
            'Метод аналізу, що базується на економічних, політичних та фінансових факторах, які впливають на вартість активу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ковзна середня',
          description:
            'Індикатор, що розраховує середню ціну за визначений період для згладжування коливань та визначення тренду',
        },
        {
          '@type': 'DefinedTerm',
          name: 'RSI',
          description:
            'Relative Strength Index — індикатор відносної сили, що вимірює швидкість та величину цінових змін для визначення перекупленості або перепроданості',
        },
        {
          '@type': 'DefinedTerm',
          name: 'MACD',
          description:
            "Moving Average Convergence Divergence — індикатор, що показує взаємозв'язок між двома ковзними середніми для визначення імпульсу та розворотів",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Рівень підтримки',
          description:
            'Ціновий рівень, на якому попит достатньо сильний, щоб зупинити падіння ціни та викликати відскок вгору',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Рівень опору',
          description:
            'Ціновий рівень, на якому пропозиція достатньо сильна, щоб зупинити зростання ціни та викликати відкат вниз',
        },
        {
          '@type': 'DefinedTerm',
          name: "Об'ємний аналіз",
          description:
            'Метод аналізу, що вивчає обсяг торгів для підтвердження цінових рухів та виявлення активності великих гравців',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Дивергенція',
          description:
            'Розбіжність між рухом ціни та показаннями індикатора, що часто сигналізує про можливий розворот тренду',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Смуги Боллінджера',
          description:
            'Індикатор волатильності, що складається з ковзної середньої та двох ліній стандартного відхилення для визначення екстремальних цінових рівнів',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
