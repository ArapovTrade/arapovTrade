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
  selector: 'app-home-uk-blog-twenty-two',
  templateUrl: './home-uk-blog-twenty-two.component.html',
  styleUrl: './home-uk-blog-twenty-two.component.scss',
})
export class HomeUkBlogTwentyTwoComponent implements OnInit {
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

    this.ukrGroups = this.artickleServ.getUkrainianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;
    this.titleService.setTitle(
      'Арбітраж криптовалют: що це і як заробити | Arapov.trade'
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({
      name: 'description',
      content:
        'Арбітраж криптовалют: повне керівництво по заробітку на різниці цін між біржами. Види арбітражу, стратегії, ризики та практичні приклади.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-21' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cryptoarbitrage.webp',
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
          headline: 'Арбітраж криптовалют: що це і як заробити',
          description:
            'Повне керівництво з криптовалютного арбітражу: види, стратегії, ризики та практичні приклади',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-11-29T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/cryptoarbitrage',
          },
          image:
            'https://arapov.trade/assets/img/content/cryptoarbitrage1.webp',
          articleSection: 'Навчання трейдингу',
          keywords:
            'арбітраж криптовалют, криптоарбітраж, міжбіржовий арбітраж, трикутний арбітраж, заробіток на криптовалюті',
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
          name: 'Що таке арбітраж криптовалют?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Арбітраж криптовалют — це стратегія заробітку на різниці цін одного й того ж активу на різних біржах. Трейдер купує криптовалюту на майданчику з низькою ціною і продає на біржі з вищою.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які види криптоарбітражу існують?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основні види: міжбіржовий арбітраж, трикутний арбітраж, міжринковий арбітраж та регіональний арбітраж.',
          },
        },
        {
          '@type': 'Question',
          name: 'Скільки можна заробити на арбітражі?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Типовий прибуток становить 0.5-3% на угоду. При активній торгівлі місячна дохідність може сягати 5-15%.',
          },
        },
        {
          '@type': 'Question',
          name: "Які ризики пов'язані з криптоарбітражем?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основні ризики: затримки транзакцій, високі комісії, волатильність цін, блокування акаунтів біржами та технічні збої.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи потрібні боти для арбітражу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Боти значно підвищують ефективність, автоматизуючи пошук можливостей та виконання угод.',
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
      name: 'Як почати заробляти на арбітражі криптовалют',
      description: 'Покрокове керівництво з криптовалютного арбітражу',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Зареєструйтесь на біржах',
          text: 'Створіть акаунти на кількох надійних біржах та пройдіть верифікацію.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Поповніть рахунки',
          text: 'Розподіліть капітал між біржами. Тримайте кошти у стейблкоїнах для швидкого реагування.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Налаштуйте моніторинг цін',
          text: 'Використовуйте інструменти відстеження цін або спеціалізовані арбітражні сканери.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Розрахуйте комісії',
          text: 'Врахуйте всі витрати: комісії за торгівлю, введення та виведення коштів.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Виконайте угоду',
          text: 'При виявленні вигідної можливості швидко купіть актив на одній біржі та продайте на іншій.',
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
      name: 'Глосарій криптовалютного арбітражу',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Арбітраж',
          description:
            'Стратегія заробітку на різниці цін одного активу на різних ринках',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Міжбіржовий арбітраж',
          description:
            'Купівля криптовалюти на одній біржі та продаж на іншій з вищою ціною',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Трикутний арбітраж',
          description:
            'Послідовний обмін трьох валют на одній біржі для отримання прибутку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спред',
          description: 'Різниця між ціною купівлі та продажу активу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ліквідність',
          description:
            'Здатність швидко купити або продати актив без суттєвого впливу на ціну',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стейблкоїн',
          description: "Криптовалюта з прив'язкою курсу до стабільного активу",
        },
        {
          '@type': 'DefinedTerm',
          name: 'DEX',
          description: 'Децентралізована біржа без посередників',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Арбітражний бот',
          description:
            'Програма для автоматичного пошуку та виконання арбітражних угод',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Сліпедж',
          description:
            'Різниця між очікуваною та фактичною ціною виконання ордера',
        },
        {
          '@type': 'DefinedTerm',
          name: 'P2P-арбітраж',
          description: 'Арбітраж з використанням peer-to-peer платформ',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
