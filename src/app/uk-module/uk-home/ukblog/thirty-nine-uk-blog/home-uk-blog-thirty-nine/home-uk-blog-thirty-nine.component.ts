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
  selector: 'app-home-uk-blog-thirty-nine',
  templateUrl: './home-uk-blog-thirty-nine.component.html',
  styleUrl: './home-uk-blog-thirty-nine.component.scss',
})
export class HomeUkBlogThirtyNineComponent implements OnInit {
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
      'Де безпечно зберігати криптовалюту | Повний посібник'
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({
      name: 'description',
      content:
        'Повний посібник із безпечного зберігання криптовалют. Порівняння гарячих та холодних гаманців, захист приватних ключів, комбіновані стратегії для збереження цифрових активів.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-23' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/safetostorecrypto.webp',
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
            '@id': 'https://arapov.trade/uk/freestudying/safetostorecrypto',
          },
          headline:
            'Де безпечно зберігати криптовалюту: повний посібник із захисту цифрових активів',
          description:
            'Повний посібник із безпечного зберігання криптовалют. Порівняння гарячих та холодних гаманців, захист приватних ключів, комбіновані стратегії для збереження цифрових активів.',
          image:
            'https://arapov.trade/assets/img/content/safetostorecrypto.webp',
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
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/content/favicon.ico',
            },
          },
          datePublished: '2024-06-15T00:00:00Z',
          dateModified: '2025-01-04T00:00:00Z',
          articleBody:
            'Збереження криптовалютних активів вимагає усвідомленого підходу до безпеки та глибокого розуміння ризиків цифрового простору. На відміну від традиційних фінансів, де банк може відновити втрачену картку або скасувати шахрайську транзакцію, світ криптовалют функціонує за принципом повної персональної відповідальності.',
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
          name: 'Який тип гаманця обрати для зберігання криптовалюти?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для активного трейдингу підійдуть гарячі гаманці з миттєвим доступом до коштів. Для довгострокового зберігання значних сум рекомендуються апаратні гаманці (Ledger, Trezor), які ізолюють приватні ключі від інтернету та забезпечують максимальний рівень захисту.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке сід-фраза і як її правильно зберігати?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Сід-фраза — це послідовність з 12 або 24 слів, яка дозволяє відновити доступ до криптогаманця. Її потрібно записати на папері або металевій пластині та зберігати в безпечному місці офлайн. Категорично не можна фотографувати фразу, зберігати в хмарних сервісах або передавати іншим особам.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи безпечно тримати криптовалюту на біржі?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Біржі зручні для активної торгівлі, але несуть підвищені ризики: можливі зломи, банкрутства або заморожування коштів. На біржових гаманцях варто тримати лише суми для поточних операцій, основні активи краще переводити на особисті гаманці під власним контролем.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке мультипідпис та коли він потрібен?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Мультипідпис (multisig) — це технологія, що вимагає кількох незалежних підписів для підтвердження транзакції. Вона корисна для корпоративного управління криптоактивами, сімейних інвестицій та ситуацій, де потрібно розподілити контроль між учасниками для підвищення безпеки.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як захиститися від фішингових атак у криптосфері?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Перевіряйте URL-адреси перед введенням даних, завантажуйте додатки виключно з офіційних джерел, використовуйте закладки для доступу до бірж, не переходьте за посиланнями з листів, увімкніть двофакторну автентифікацію через додатки (Google Authenticator, Authy) замість SMS.',
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
      name: 'Як налаштувати безпечне зберігання криптовалюти',
      description:
        'Покрокова інструкція з організації надійної системи зберігання криптовалютних активів із використанням комбінованих стратегій.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Аналіз портфеля та планування розподілу',
          text: 'Оцініть обсяг ваших криптоактивів та визначте їх призначення: кошти для активної торгівлі (5-10%), оперативний резерв (10-20%), довгострокові інвестиції (70-85%). Цей розподіл визначить вибір типів гаманців.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Придбання та налаштування апаратного гаманця',
          text: 'Придбайте апаратний гаманець (Ledger, Trezor, SafePal) виключно у офіційного виробника. Перевірте цілісність упаковки та захисні пломби. Виконайте початкове налаштування згідно з інструкціями.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Створення та захист резервних копій',
          text: 'Запишіть сід-фразу на фізичний носій (папір, металева пластина). Створіть кілька копій та розмістіть їх у різних безпечних місцях (сейф, банківська комірка). Ніколи не зберігайте цифрові копії.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Налаштування багаторівневого захисту',
          text: 'Активуйте двофакторну автентифікацію на всіх платформах через додатки (Google Authenticator). Встановіть унікальні складні паролі для кожного сервісу. За потреби налаштуйте мультипідпис для великих сум.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Регулярний аудит та оновлення системи безпеки',
          text: 'Періодично перевіряйте актуальність прошивок гаманців, аналізуйте історію транзакцій на підозрілу активність, оновлюйте паролі, контролюйте збереження резервних копій та слідкуйте за новими загрозами.',
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
      name: 'Глосарій термінів безпеки криптовалют',
      description:
        "Основні терміни, пов'язані з безпечним зберіганням криптовалютних активів",
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Приватний ключ',
          description:
            "Криптографічний код, що забезпечує повний контроль над криптовалютними коштами на пов'язаній адресі блокчейну.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Сід-фраза',
          description:
            'Мнемонічна послідовність з 12-24 слів для відновлення доступу до криптовалютного гаманця.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Гарячий гаманець',
          description:
            'Криптовалютний гаманець з постійним підключенням до інтернету, що забезпечує швидкий доступ до активів.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Холодний гаманець',
          description:
            'Спосіб зберігання криптовалюти без підключення до мережі, що забезпечує максимальний захист від віддалених атак.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Апаратний гаманець',
          description:
            'Фізичний пристрій для зберігання приватних ключів в ізольованому середовищі, захищеному від шкідливого ПЗ.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Мультипідпис',
          description:
            'Технологія, що вимагає кількох незалежних підписів для авторизації криптовалютної транзакції.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Двофакторна автентифікація',
          description:
            'Метод захисту акаунту, що вимагає підтвердження особи двома незалежними способами.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фішингова атака',
          description:
            'Шахрайська схема отримання конфіденційних даних через підроблені сайти або повідомлення.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кастодіальне зберігання',
          description:
            'Модель зберігання криптовалюти, при якій приватні ключі контролюються третьою стороною (біржею, сервісом).',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Некастодіальне зберігання',
          description:
            'Спосіб зберігання, при якому власник повністю контролює приватні ключі та несе відповідальність за безпеку.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
