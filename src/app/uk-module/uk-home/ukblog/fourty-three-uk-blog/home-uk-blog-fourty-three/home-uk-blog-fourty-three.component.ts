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
  selector: 'app-home-uk-blog-fourty-three',
  templateUrl: './home-uk-blog-fourty-three.component.html',
  styleUrl: './home-uk-blog-fourty-three.component.scss',
})
export class HomeUkBlogFourtyThreeComponent implements OnInit {
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
      'Попит і пропозиція в криптовалютах | Повний посібник'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Як аналізувати попит і пропозицію на ринку криптовалют. Вивчіть методи оцінки балансу сил, обсяги торгів, ордербук та стратегії для прибуткового трейдингу.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-25' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cryptomarketanalysis.png',
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
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/cryptomarketanalysis',
          },
          headline:
            'Попит і пропозиція в криптовалютах: повний посібник з аналізу ринку',
          description:
            'Як аналізувати попит і пропозицію на ринку криптовалют. Вивчіть методи оцінки балансу сил, обсяги торгів, ордербук та стратегії для прибуткового трейдингу.',
          image:
            'https://arapov.trade/assets/img/content/cryptomarketanalysis1.webp',
          author: {
            '@type': 'Person',
            name: 'Ігор Арапов',
            url: 'https://arapov.trade/uk',
            sameAs: [
              'https://www.youtube.com/@ArapovTrade',
              'https://t.me/ArapovTrade',
            ],
          },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
          articleBody:
            'Криптовалютний ринок працює за базовими економічними законами, де взаємодія покупців і продавців визначає ціноутворення кожного активу...',
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
          name: 'Що таке попит і пропозиція на крипторинку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Попит — це готовність покупців придбати криптовалюту за певною ціною, а пропозиція — кількість монет, яку власники готові продати. Баланс цих сил визначає поточну ринкову ціну активу.',
          },
        },
        {
          '@type': 'Question',
          name: "Як обсяги торгів пов'язані з попитом і пропозицією?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Обсяги торгів показують інтенсивність ринкової активності. Зростаючі обсяги при зростанні ціни підтверджують сильний попит, а високі обсяги при падінні вказують на домінування продавців і надлишкову пропозицію.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які інструменти використовують для аналізу балансу попиту і пропозиції?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Трейдери застосовують ордербук для перегляду заявок, кластерний аналіз обсягів, індикатори OBV та A/D, профіль ринку, а також дані про потоки криптовалют між гаманцями та біржами.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому обмежена емісія впливає на ціну криптовалют?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Обмежений запас, як у Bitcoin з його 21 мільйоном монет, створює дефіцит. При зростанні попиту та фіксованій пропозиції ціна неминуче зростає згідно з законом економіки.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як дії китів впливають на баланс ринку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Великі власники (кити) здатні різко змінювати баланс попиту і пропозиції. Масовий продаж створює надлишок монет і тисне на ціну вниз, а великі покупки поглинають пропозицію і штовхають ціну вгору.',
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
      name: 'Як аналізувати попит і пропозицію на крипторинку',
      description:
        'Покрокова інструкція з оцінки балансу покупців і продавців для прийняття торгових рішень',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Вивчіть ордербук',
          text: 'Відкрийте книгу ордерів на біржі та проаналізуйте співвідношення заявок на купівлю і продаж. Великі кластери ордерів вказують на значущі цінові рівні.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Проаналізуйте обсяги торгів',
          text: 'Зіставте динаміку ціни з обсягами. Зростання ціни на високих обсягах підтверджує силу попиту, падіння обсягів при зростанні попереджає про слабкість руху.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Визначте ключові рівні',
          text: 'Знайдіть зони підтримки, де покупці активно захищають ціну, та опору, де продавці створюють тиск. Ці рівні відображають баланс сил.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Відстежуйте потоки криптовалют',
          text: 'Моніторте рух монет між гаманцями та біржами. Приплив на біржі сигналізує про готовність до продажу, виведення — про накопичення.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Враховуйте ринкові настрої',
          text: 'Аналізуйте індекс страху та жадібності, активність у соціальних мережах та новинний фон. Емоції учасників посилюють дисбаланс попиту і пропозиції.',
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
      name: 'Терміни аналізу попиту і пропозиції криптовалют',
      description: 'Ключові поняття для розуміння ринкової динаміки',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Ордербук',
          description:
            'Книга заявок, що відображає всі поточні ордери на купівлю і продаж із зазначенням ціни та обсягу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ліквідність',
          description:
            'Здатність ринку забезпечувати швидке виконання угод без суттєвого впливу на ціну',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кити',
          description:
            'Великі власники криптовалют, чиї угоди здатні значно впливати на ринкову ціну',
        },
        {
          '@type': 'DefinedTerm',
          name: 'On-chain аналіз',
          description:
            'Вивчення даних блокчейну для оцінки активності мережі, потоків коштів та поведінки учасників',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кластерний аналіз обсягів',
          description:
            'Метод візуалізації торгової активності на кожному ціновому рівні для виявлення зон накопичення',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Індекс страху та жадібності',
          description:
            'Індикатор ринкових настроїв, що вимірює емоційний стан учасників ринку за шкалою від 0 до 100',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Халвінг',
          description:
            'Скорочення вдвічі винагороди майнерам, що зменшує темпи емісії нових монет і впливає на пропозицію',
        },
        {
          '@type': 'DefinedTerm',
          name: 'DeFi',
          description:
            'Децентралізовані фінанси — екосистема фінансових застосунків на блокчейні без посередників',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стейкінг',
          description:
            'Блокування криптовалюти для підтримки роботи мережі з отриманням винагороди, що впливає на доступну пропозицію',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
