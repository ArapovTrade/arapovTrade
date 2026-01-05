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
  selector: 'app-home-uk-blog-thirty-eight',
  templateUrl: './home-uk-blog-thirty-eight.component.html',
  styleUrl: './home-uk-blog-thirty-eight.component.scss',
})
export class HomeUkBlogThirtyEightComponent implements OnInit {
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
      'Безпечне зберігання криптовалюти: повний посібник | ArapovTrade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Дізнайтеся, як безпечно зберігати криптовалюту. Холодні та гарячі гаманці, апаратні пристрої, захист приватних ключів та найкращі практики безпеки.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-23' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cryptostoring.webp',
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
          headline:
            'Безпечне зберігання криптовалюти: повний посібник із захисту цифрових активів',
          description:
            'Детальний посібник з безпечного зберігання криптовалют. Типи гаманців, захист приватних ключів, апаратні пристрої та поширені помилки.',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-11T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/cryptostoring',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/cryptostoring1.webp',
          },
          articleSection: 'Криптовалюти',
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
          name: 'Що таке холодний гаманець?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Холодний гаманець — це спосіб зберігання криптовалюти без постійного підключення до інтернету. До них належать апаратні гаманці (Ledger, Trezor), паперові гаманці та металеві пластини. Вони забезпечують максимальний захист від хакерських атак.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чим відрізняється гарячий гаманець від холодного?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Гарячий гаманець підключений до інтернету і зручний для частих транзакцій. Холодний гаманець зберігає ключі офлайн і забезпечує максимальну безпеку. Для довгострокового зберігання рекомендуються холодні гаманці.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке seed-фраза і навіщо вона потрібна?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Seed-фраза — це набір з 12-24 слів, що генерується при створенні гаманця. Вона дозволяє відновити доступ до коштів при втраті пристрою. Фразу потрібно зберігати в безпечному місці і ніколи не зберігати в цифровому вигляді.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи безпечно зберігати криптовалюту на біржі?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Зберігання на біржі зручне для активної торгівлі, але несе ризики: біржі можуть бути зламані, заблоковані або збанкрутувати. Для довгострокового зберігання рекомендується використовувати особисті гаманці.',
          },
        },
        {
          '@type': 'Question',
          name: 'Який апаратний гаманець обрати?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Популярні апаратні гаманці: Ledger Nano X/S, Trezor Model T/One, SafePal. При виборі враховуйте підтримку потрібних криптовалют та репутацію виробника. Купуйте лише у офіційних продавців.',
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
      '@id': 'https://arapov.trade/uk/freestudying/cryptostoring#howto',
      name: 'Як безпечно зберігати криптовалюту',
      description:
        'Крок за кроком інструкція з безпечного зберігання криптоактивів та захисту від взломів',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Визначте розмір та горизонт зберігання',
          text: 'Оцініть суму криптовалют, яку ви плануєте зберігати, та строки зберігання. Якщо це довгострокове зберігання великої суми, віддайте перевагу холодним гаманцям. Для активної торгівлі малими сумами підійдуть гарячі гаманці.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Виберіть тип гаманця',
          text: 'Для довгострокового зберігання використовуйте холодні гаманці: апаратні (Ledger, Trezor), паперові або металеві пластини. Для частих транзакцій - гарячі гаманці: мобільні додатки або веб-гаманці. Комбінуйте обидва типи для максимальної безпеки.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Придбайте апаратний гаманець у офіційного продавця',
          text: 'Виберіть перевіреного виробника (Ledger, Trezor, SafePal). Купуйте лише у офіційних дилерів або сертифікованих магазинів. Уникайте б/в пристроїв. Перевірте цілісність упаковки при отриманні.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Генеруйте seed-фразу під час першого використання',
          text: "Під час ініціалізації гаманця буде згенерована 12-24 словна seed-фраза. Запишіть її на папір у правильному порядку. Ніколи не фотографуйте, не зберігайте в хмарі чи на комп'ютері. Зберігайте в надійному місці - сейфі, скриньці.",
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Встановіть надійний пароль та PIN-код',
          text: "Встановіть складний пароль для пристрою (якщо підтримується). Встановіть 4-8 значний PIN для апаратного гаманця. Запам'ятайте PIN, але нікому його не повідомляйте. Не використовуйте прості послідовності (1234, 0000).",
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Перевірте адреси та відправте тестову суму',
          text: 'Перед першим великим переводом відправте мінімальну суму криптовалюти. Переконайтеся, що адреси збігаються та транзакція пройшла успішно. Це підтвердить, що гаманець працює коректно.',
        },
        {
          '@type': 'HowToStep',
          position: 7,
          name: 'Зберігайте seed-фразу у кількох місцях',
          text: 'Зробіть 2-3 копії записаної seed-фрази. Зберігайте їх у різних безпечних місцях: вдома в сейфі, у довіреної людини, в банку. Це захистить від втрати доступу при пожежі, крадіжці чи інших НС.',
        },
        {
          '@type': 'HowToStep',
          position: 8,
          name: 'Використовуйте багаторівневий захист',
          text: 'Розділіть велику суму між кількома гаманцями. Використовуйте різні паролі для кожного. Подумайте про multi-sig гаманці, які потребують кількох підписів для транзакції. Це запобіжить втраті всіх коштів при компрометації одного гаманця.',
        },
        {
          '@type': 'HowToStep',
          position: 9,
          name: 'Оновлюйте ПО та використовуйте безпечну мережу',
          text: "Тримайте ПО гаманця та пристрою в актуальному стані. При підключенні апаратного гаманця використовуйте чистий комп'ютер без вірусів. Уникайте публічного Wi-Fi при проведенні транзакцій. Перевіряйте scam-сайти перед введенням приватних ключів.",
        },
        {
          '@type': 'HowToStep',
          position: 10,
          name: 'Перевіряйте адреси перед кожною відправкою',
          text: 'Завжди перевіряйте адресу отримувача перед підтвердженням. Використовуйте функцію перевірки на пристрої (якщо є). Відправляйте спочатку невелику суму, а потім залишок. Остерігайтесь фішингу та підміненихадрес.',
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
      name: 'Глосарій зберігання криптовалют',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Приватний ключ',
          description:
            'Криптографічна послідовність, що дає повний контроль над криптовалютними коштами.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Публічний ключ',
          description:
            'Адреса гаманця, яку можна передавати для отримання криптовалюти.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Seed-фраза',
          description:
            'Мнемонічна фраза з 12-24 слів для відновлення доступу до гаманця.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Холодний гаманець',
          description:
            'Спосіб зберігання криптовалюти без підключення до інтернету.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Гарячий гаманець',
          description:
            'Гаманець з постійним підключенням до інтернету для швидких транзакцій.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Апаратний гаманець',
          description:
            'Фізичний пристрій для безпечного зберігання приватних ключів офлайн.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Мультисиг',
          description:
            'Гаманець, що вимагає декількох підписів для проведення транзакції.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кастодіальний гаманець',
          description:
            'Гаманець, де приватні ключі зберігаються третьою стороною.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Некастодіальний гаманець',
          description:
            'Гаманець з повним контролем користувача над приватними ключами.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'MFA',
          description:
            'Багатофакторна автентифікація для додаткового захисту акаунта.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
