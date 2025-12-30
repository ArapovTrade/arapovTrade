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
  selector: 'app-home-uk-blog-fifty-nine',
  templateUrl: './home-uk-blog-fifty-nine.component.html',
  styleUrl: './home-uk-blog-fifty-nine.component.scss',
})
export class HomeUkBlogFiftyNineComponent implements OnInit {
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
      'Як торгувати пробій рівня в трейдингу | Стратегія пробою'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Детальний посібник з торгівлі на пробій рівнів підтримки та опору. Дізнайтеся, як визначати справжні пробої, використовувати ретести та пін-бари для входу в угоди.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-18' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/levelbreakoutstrategy.webp',
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
          headline: 'Як торгувати пробій рівня в трейдингу — повний посібник',
          description:
            'Детальний посібник з торгівлі на пробій рівнів підтримки та опору. Дізнайтеся, як визначати справжні пробої, використовувати ретести та пін-бари для входу в угоди.',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          image: [
            'https://arapov.trade/assets/img/content/levelbreakoutstrategy.webp',
          ],
          publisher: {
            '@type': 'Organization',
            name: 'Arapov Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-11-29T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/levelbreakoutstrategy',
          },
          articleSection: 'Трейдинг',
          keywords: [
            'пробій рівня',
            'торгівля на пробій',
            'рівні підтримки',
            'рівні опору',
            'ретест',
            'пін-бар',
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
          name: 'Що таке пробій рівня у трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Пробій рівня — це ситуація, коли ціна активу долає важливий рівень підтримки або опору та продовжує рух у напрямку пробою. Це технічний сигнал про зміну балансу сил між покупцями та продавцями.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як відрізнити справжній пробій від хибного?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Справжній пробій супроводжується високим обсягом торгів, стійким рухом ціни за рівень та успішним ретестом пробитого рівня. Хибний пробій характеризується швидким поверненням ціни назад при низькому обсязі.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке ретест рівня і навіщо його чекати?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ретест — це повернення ціни до пробитого рівня для його перевірки. Після ретесту колишній опір стає підтримкою і навпаки. Очікування ретесту знижує ризик входу на хибному пробої.',
          },
        },
        {
          '@type': 'Question',
          name: 'Яку роль відіграє пін-бар у торгівлі на пробій?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Пін-бар на ретесті пробитого рівня підтверджує силу пробою та показує відхилення ціни однією зі сторін ринку. Довга тінь пін-бара вказує на невдалу спробу розвернути рух.',
          },
        },
        {
          '@type': 'Question',
          name: 'Яке співвідношення ризику до прибутку оптимальне при торгівлі на пробій?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Рекомендується обирати угоди зі співвідношенням ризику до прибутку не менше 1:2, а в ідеалі 1:3 або вище. Це забезпечує стабільний прибуток навіть при 40-50% успішних угод.',
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
      name: 'Як торгувати пробій рівня',
      description:
        'Покрокова інструкція з торгівлі на пробій рівнів підтримки та опору',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Визначення рівнів',
          text: 'Знайдіть ключові рівні підтримки та опору на старших таймфреймах. Аналізуйте історичні дані та звертайте увагу на зони з багаторазовими дотиками ціни.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Очікування пробою',
          text: 'Дочекайтеся чіткого пробою рівня з високим обсягом торгів. Переконайтеся, що свічка закрилася за рівнем — це підтверджує силу руху.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Ретест рівня',
          text: 'Після пробою дочекайтеся повернення ціни до пробитого рівня. Успішний ретест підтверджує зміну ролі рівня.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Пошук підтверджуючого сигналу',
          text: 'Шукайте свічкові патерни на ретесті: пін-бар, поглинання або молот. Ці формації показують відхилення ціни та підтверджують продовження руху.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Вхід в угоду з управлінням ризиками',
          text: 'Входьте в позицію після підтвердження сигналу. Встановіть стоп-лосс за межами патерну та тейк-профіт на наступному значущому рівні зі співвідношенням ризику до прибутку не менше 1:2.',
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
      name: 'Термінологія торгівлі на пробій',
      description: 'Основні терміни стратегії пробою рівнів',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Пробій рівня',
          description:
            'Подолання ціною значущого рівня підтримки або опору з продовженням руху в напрямку пробою',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ретест',
          description:
            'Повернення ціни до пробитого рівня для його перевірки, після чого рівень змінює свою роль',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Пін-бар',
          description:
            'Свічковий патерн з довгою тінню та маленьким тілом, що вказує на відхилення ціни',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Хибний пробій',
          description:
            'Ситуація, коли ціна перетинає рівень, але швидко повертається назад без продовження руху',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Рівень підтримки',
          description:
            'Цінова зона, де покупці активно входять у ринок, зупиняючи падіння ціни',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Рівень опору',
          description:
            'Цінова зона, де продавці починають домінувати, зупиняючи зростання ціни',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Імпульс',
          description:
            'Різке прискорення цінового руху після пробою, спричинене активацією ордерів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Обсяг торгів',
          description:
            'Кількість угод за певний період, що підтверджує силу або слабкість цінового руху',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Співвідношення ризику до прибутку',
          description:
            'Відношення потенційного збитку до потенційного прибутку в угоді',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Трейлінг-стоп',
          description:
            'Динамічний стоп-лосс, що переміщується слідом за ціною для фіксації прибутку',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
