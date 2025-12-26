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
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-uk-blog-sixty-four',
  templateUrl: './home-uk-blog-sixty-four.component.html',
  styleUrl: './home-uk-blog-sixty-four.component.scss',
})
export class HomeUkBlogSixtyFourComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
    private artickleServ: ArticlesService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute
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
      'Торгова система трейдера — практичний посібник з прикладами угод'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Торгова система трейдера — покрокова інструкція з реальними прикладами угод. Як знаходити точки входу, виставляти стоп-лос та фіксувати прибуток.',
    });

    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/prakticuk.jpg',
    });

    this.gerRandom();
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        setTimeout(() => {
          const element = document.getElementById(fragment);
          if (element) {
            // Отступ сверху в пикселях, например 80px (зависит от вашего меню)
            const offset = 80;

            // Позиция элемента относительно страницы
            const elementPosition =
              element.getBoundingClientRect().top + window.pageYOffset;

            // Скроллим с учётом отступа
            window.scrollTo({
              top: elementPosition - offset,
              behavior: 'smooth',
            });
          }
        }, 100);
      }
    });
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
          '@id': 'https://arapov.trade/uk/freestudying/practic#article',
          headline:
            'Торгова система трейдера — практичний посібник з прикладами угод',
          description:
            'Торгова система трейдера — покрокова інструкція з реальними прикладами угод. Як знаходити точки входу, виставляти стоп-лос та фіксувати прибуток.',
          datePublished: '2024-06-15T00:00:00+02:00',
          dateModified: '2025-01-04T00:00:00+02:00',
          author: {
            '@type': 'Person',
            '@id': 'https://arapov.trade/uk#person',
            name: 'Ігор Арапов',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/practic',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/prakticuk.jpg',
          },
          articleSection: 'Трейдинг',
          keywords: [
            'торгова система',
            'трейдинг',
            'точка входу',
            'стоп-лос',
            'Price Action',
            'хибний пробій',
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
      '@id': 'https://arapov.trade/uk/freestudying/practic#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Навіщо потрібна торгова система?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Система замінює хаотичні рішення на чіткий алгоритм дій. Без неї торгівля перетворюється на азартну гру з негативним математичним очікуванням — гарантовану втрату грошей на дистанції.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що входить до торгової системи?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Чотири компоненти: правила входу (коли відкривати угоду), правила виходу (стоп-лос і тейк-профіт), управління капіталом (скільки ризикувати) та психологічна дисципліна (як дотримуватися правил).',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому важливе співвідношення 3 до 1?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'При співвідношенні прибутку до ризику 3:1 вам достатньо виграти лише 30-40% угод, щоб залишатися в плюсі. Кожна виграшна угода перекриває три програшні. Це математична основа прибуткової торгівлі.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як розпізнати хибний пробій?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Ознаки: ціна виходить за рівень на підвищеному обсязі, формується свічка з довгою тінню (пін-бар), потім з'являється протилежна свічка поглинання. Після цього ціна повертається в діапазон і рухається у зворотному напрямку.",
          },
        },
        {
          '@type': 'Question',
          name: 'Скільки угод потрібно для оцінки системи?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Мінімум 40-50 угод для базової статистики, оптимально — 100+. Менша вибірка не дає достовірної картини через випадкові коливання. Саме тому важливо спочатку торгувати на демо-рахунку.',
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
      '@id': 'https://arapov.trade/uk/freestudying/practic#howto',
      name: 'Алгоритм пошуку точки входу',
      description:
        'Покрокова інструкція для знаходження торгових сигналів за методом хибних пробоїв.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Знайдіть ключовий рівень',
          text: 'На старшому таймфреймі (4H) визначте зону, де ціна раніше зупинялася — це ваш рівень опору або підтримки.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Чекайте підхід ціни',
          text: 'Спостерігайте, як ціна наближається до рівня. Шукайте ознаки слабкості: пін-бари, зменшення обсягів.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Ідентифікуйте хибний пробій',
          text: 'Ціна виходить за рівень, але не закріплюється. Обсяг високий, але результату немає — ознака поглинання.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Чекайте підтвердження',
          text: 'Формування свічки поглинання підтверджує хибність пробою. Вхід — при пробої екстремуму цієї свічки.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Виставте захисні ордери',
          text: 'Стоп-лос — за максимум хибного пробою. Тейк-профіт — протилежний рівень. Перевірте співвідношення мінімум 3:1.',
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
      '@id': 'https://arapov.trade/uk/freestudying/practic#terms',
      name: 'Термінологія торгової системи',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Торгова система',
          description:
            'Комплекс правил, що визначає умови входу, виходу та управління ризиками в торгівлі.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Точка входу',
          description: 'Момент відкриття торгової позиції за сигналом системи.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лос',
          description:
            'Захисний ордер для автоматичного закриття збиткової позиції.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тейк-профіт',
          description:
            'Ордер для автоматичної фіксації прибутку при досягненні цілі.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Хибний пробій',
          description:
            'Вихід ціни за рівень без закріплення з подальшим розворотом.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Пін-бар',
          description:
            'Свічка з довгою тінню і коротким тілом — сигнал відторгнення ціни.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Поглинання',
          description:
            'Патерн з двох свічок, де друга повністю перекриває тіло першої.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'WinRate',
          description: 'Відсоток прибуткових угод від загальної кількості.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Profit Factor',
          description:
            'Співвідношення загального прибутку до загального збитку.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'DrawDown',
          description: 'Максимальна просадка рахунку від пікового значення.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
