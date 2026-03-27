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
  selector: 'app-home-uk-blog-twenty-one',
  templateUrl: './home-uk-blog-twenty-one.component.html',
  styleUrl: './home-uk-blog-twenty-one.component.scss',
})
export class HomeUkBlogTwentyOneComponent implements OnInit {
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
      'Маркет-мейкер у трейдингу: повний посібник | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Маркет-мейкер у трейдингу: хто це, як працює та як використовувати їхні стратегії у власній торгівлі. Повний посібник від Ігоря Арапова.',
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
          headline: 'Маркет-мейкер у трейдингу: повний посібник',
          description:
            'Маркет-мейкер у трейдингу: хто це, як працює та як використовувати їхні стратегії у власній торгівлі.',
          image: 'https://arapov.trade/assets/img/content/marketmaker1.webp',
          datePublished: '2026-03-15T00:00:00Z',
          dateModified: '2026-03-22T00:00:00Z',

          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov Trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/marketmaker',
          },
          articleSection: 'Навчання трейдингу',
          keywords: [
            'маркет мейкер',
            'market maker',
            'ліквідність',
            'маніпуляції ринку',
            'Smart Money',
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
          name: 'Хто такий маркет-мейкер простими словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Маркет-мейкер — це великий учасник ринку, який забезпечує ліквідність, постійно виставляючи заявки на купівлю та продаж. Завдяки маркет-мейкерам трейдери можуть швидко укладати угоди за справедливими цінами.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як маркет-мейкери заробляють гроші?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Маркет-мейкери отримують прибуток зі спреду між ціною купівлі та продажу, комісій від бірж за підтримку ліквідності, а також від напрямлених угод на основі аналізу потоку ордерів.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи маніпулюють маркет-мейкери ринком?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Маркет-мейкери використовують техніки управління ліквідністю: хибні пробої, полювання на стопи, спуфінг. Однак їхня основна функція — забезпечення ліквідності.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як визначити присутність маркет-мейкера на графіку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ознаки активності: сплески обсягу без руху ціни, хибні пробої зі швидким поверненням, довгі тіні свічок на важливих рівнях, аномальна активність у періоди низької ліквідності.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як торгувати разом з маркет-мейкерами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Аналізуйте обсяги для виявлення накопичення позицій, уникайте входів на очевидних рівнях, чекайте підтвердження після хибних пробоїв, розміщуйте стопи за межами зон полювання.',
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
      name: 'Як виявити та використовувати активність маркет-мейкера',
      description:
        'Покрокова інструкція з визначення дій маркет-мейкерів та використання цієї інформації для покращення торгових результатів.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Аналіз обсягів',
          text: "Вивчіть об'ємні показники за допомогою Volume Profile та Delta Volume. Шукайте аномалії: високий обсяг без руху ціни вказує на накопичення позицій.",
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Визначення ключових рівнів',
          text: 'Відзначте зони ліквідності: області за рівнями підтримки та опору, де розміщують стоп-ордери.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Спостереження за хибними пробоями',
          text: 'Якщо ціна швидко повертається в діапазон після пробою, це ознака збору ліквідності маркет-мейкером.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Підтвердження входу',
          text: 'Дочекайтеся свічкових патернів, зміни дельти обсягу, тесту рівня без нового пробою.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Управління позицією',
          text: 'Розміщуйте стоп-лоси за межами очевидних зон ліквідності. Використовуйте ATR для розрахунку відстані.',
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
      name: 'Глосарій термінів маркет-мейкінгу',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Маркет-мейкер',
          description:
            'Великий учасник ринку, що забезпечує ліквідність шляхом постійного виставлення заявок на купівлю та продаж',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ліквідність',
          description:
            'Здатність ринку забезпечувати швидке виконання угод без суттєвого впливу на ціну',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спред',
          description:
            'Різниця між найкращою ціною купівлі та найкращою ціною продажу активу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Хибний пробій',
          description:
            'Короткочасний рух ціни за ключовий рівень з подальшим швидким поверненням',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Полювання на стопи',
          description:
            'Рух ціни до зон скупчення стоп-ордерів для їх активації та збору ліквідності',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спуфінг',
          description:
            'Розміщення великих фіктивних ордерів для створення ілюзії попиту або пропозиції',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Order Flow',
          description:
            'Потік ордерів — аналіз послідовності та обсягу ринкових заявок',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volume Profile',
          description:
            'Інструмент аналізу розподілу обсягу торгів за ціновими рівнями',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Delta Volume',
          description:
            'Різниця між обсягом покупок та продажів на ціновому рівні',
        },
        {
          '@type': 'DefinedTerm',
          name: 'HFT',
          description:
            'High-Frequency Trading — високочастотний трейдинг з алгоритмами',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
