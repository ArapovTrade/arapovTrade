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
  selector: 'app-home-uk-blog-fifty-four',
  templateUrl: './home-uk-blog-fifty-four.component.html',
  styleUrl: './home-uk-blog-fifty-four.component.scss',
})
export class HomeUkBlogFiftyFourComponent implements OnInit {
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
      'Як забезпечити безпеку криптовалюти | Повний посібник'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Повний посібник із забезпечення безпеки криптовалюти. Захист від хакерів та фішингу, налаштування двофакторної автентифікації, безпечне зберігання великих сум цифрових активів.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-28' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cryptosafe.webp',
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
            '@id': 'https://arapov.trade/uk/freestudying/cryptosafe',
          },
          headline:
            'Як забезпечити безпеку криптовалюти: повний посібник із захисту цифрових активів',
          description:
            'Повний посібник із забезпечення безпеки криптовалюти. Захист від хакерів та фішингу, налаштування двофакторної автентифікації, безпечне зберігання великих сум цифрових активів.',
          image: 'https://arapov.trade/assets/img/content/cryptosafe1.webp',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/content/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-12T00:00:00Z',
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
          name: 'Які основні загрози існують для криптовалютних активів?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ключові загрози включають: хакерські атаки на біржі та гаманці, фішингові схеми з підробленими сайтами, втрату приватних ключів або сід-фраз, фізичну крадіжку пристроїв зберігання, помилки користувачів при переказах та шахрайські проєкти, що обіцяють високу прибутковість.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому двофакторна автентифікація важлива для захисту криптовалюти?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Двофакторна автентифікація створює додатковий бар'єр безпеки: навіть якщо зловмисник дізнається пароль, без другого фактора (коду з додатку-автентифікатора) доступ до акаунту неможливий. Рекомендується використовувати Google Authenticator або Authy замість SMS-кодів.",
          },
        },
        {
          '@type': 'Question',
          name: 'Як розпізнати фішингову атаку у криптосфері?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ознаки фішингу: незначні зміни в URL-адресі сайту, термінові вимоги ввести дані, листи з погрозами блокування акаунту, запити приватних ключів або сід-фраз. Легітимні сервіси ніколи не запитують приватні ключі за жодних обставин.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які заходи безпеки потрібні для зберігання великих сум криптовалюти?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Використовуйте апаратні гаманці для холодного зберігання, розподіляйте активи між кількома гаманцями, налаштуйте мультипідпис для транзакцій, регулярно проводьте аудит безпеки, зберігайте резервні копії ключів у фізично захищених місцях (сейф, банківська комірка).',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи безпечно використовувати публічні Wi-Fi мережі для криптовалютних операцій?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Категорично не рекомендується використовувати публічні Wi-Fi для доступу до криптовалютних акаунтів — такі мережі легко перехоплюються зловмисниками. При необхідності роботи поза домом використовуйте мобільний інтернет або VPN з надійним шифруванням.',
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
      name: 'Як налаштувати комплексний захист криптовалютних активів',
      description:
        'Покрокова інструкція зі створення багаторівневої системи безпеки для криптовалюти.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Аудит поточного стану безпеки',
          text: 'Проведіть інвентаризацію всіх криптоактивів та місць їх зберігання. Оцініть рівень захисту кожного гаманця та платформи, виявіть слабкі місця та складіть план їх усунення.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Налаштування двофакторної автентифікації',
          text: 'Встановіть додаток-автентифікатор (Google Authenticator, Authy) та активуйте 2FA на всіх криптовалютних платформах, біржах та електронній пошті. Збережіть резервні коди відновлення в безпечному місці.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Організація безпечного зберігання ключів',
          text: 'Переведіть основну частину активів на апаратний гаманець. Запишіть сід-фразу на фізичний носій (папір, металева пластина) та розмістіть копії в кількох захищених локаціях.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Створення системи паролів',
          text: 'Встановіть менеджер паролів та згенеруйте унікальні складні паролі для кожної криптоплатформи. Уникайте повторного використання паролів та регулярно оновлюйте їх.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Впровадження регулярного моніторингу',
          text: 'Налаштуйте сповіщення про входи в акаунти та транзакції. Періодично перевіряйте історію активності, оновлюйте прошивки гаманців та слідкуйте за новинами безпеки використовуваних платформ.',
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
      name: 'Глосарій криптовалютної безпеки',
      description:
        "Основні терміни, пов'язані із захистом криптовалютних активів",
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Двофакторна автентифікація',
          description:
            'Метод захисту акаунту, що вимагає підтвердження особи двома незалежними способами — паролем та тимчасовим кодом.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фішинг',
          description:
            'Шахрайська схема отримання конфіденційних даних через підроблені сайти, листи або повідомлення.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Холодне зберігання',
          description:
            'Метод зберігання криптовалюти на пристроях без підключення до інтернету для максимального захисту від віддалених атак.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Гарячий гаманець',
          description:
            'Криптовалютний гаманець з постійним інтернет-підключенням, зручний для оперативних транзакцій.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Мультипідпис',
          description:
            'Технологія, що вимагає кількох незалежних підписів для авторизації транзакції.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Сід-фраза',
          description:
            'Мнемонічна послідовність слів для відновлення доступу до криптовалютного гаманця.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Приватний ключ',
          description:
            'Криптографічний код, що забезпечує повний контроль над криптовалютними коштами.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Соціальна інженерія',
          description:
            'Методи психологічного маніпулювання людьми для отримання конфіденційної інформації.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'VPN',
          description:
            'Віртуальна приватна мережа, що шифрує інтернет-трафік та приховує реальну IP-адресу користувача.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Апаратний гаманець',
          description:
            'Фізичний пристрій для зберігання приватних ключів в ізольованому захищеному середовищі.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
