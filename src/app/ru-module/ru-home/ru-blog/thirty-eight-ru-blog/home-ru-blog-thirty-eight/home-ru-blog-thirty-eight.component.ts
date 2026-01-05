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
  selector: 'app-home-ru-blog-thirty-eight',
  templateUrl: './home-ru-blog-thirty-eight.component.html',
  styleUrl: './home-ru-blog-thirty-eight.component.scss',
})
export class HomeRuBlogThirtyEightComponent implements OnInit {
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

    this.ukrGroups = this.artickleServ.getRussianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;

    this.titleService.setTitle(
      'Безопасное хранение криптовалюты: полное руководство | ArapovTrade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Узнайте, как безопасно хранить криптовалюту. Холодные и горячие кошельки, аппаратные устройства, защита приватных ключей и лучшие практики безопасности.',
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
    { title: 'Быстрый старт', link: 'https://arapov.education/course/' },
    {
      title: 'Введение в трейдинг',
      link: 'https://arapov.education/reg-workshop/',
    },
    {
      title: 'Профессиональные курсы',
      link: 'https://arapov.trade/ru/studying',
    },
    {
      title: 'Базовый курс',
      link: 'https://arapov.trade/ru/freestudying/freeeducation',
    },
    { title: 'Копитрейдинг', link: 'https://arapovcopytrade.com' },
  ];

  onGroupChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    this.router.navigate(['/ru/freestudying'], {
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
      article.groupsRus.forEach((group) => {
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

    this.router.navigate(['/ru/freestudying', nextpage]);
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

    this.router.navigate(['/ru/freestudying', nextpage]);
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
            'Безопасное хранение криптовалюты: полное руководство по защите цифровых активов',
          description:
            'Подробное руководство по безопасному хранению криптовалют. Типы кошельков, защита приватных ключей, аппаратные устройства и распространённые ошибки.',
          author: {
            '@id': 'https://arapov.trade/ru#person',
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
            '@id': 'https://arapov.trade/ru/freestudying/cryptostoring',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/cryptostoring1.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Криптовалюты',
          keywords:
            'хранение криптовалюты, криптокошелек, холодный кошелек, аппаратный кошелек',
          inLanguage: 'ru',
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
      '@id': 'https://arapov.trade/ru#person',
      name: 'Игорь Арапов',
      url: 'https://arapov.trade/ru',
      image:
        'https://arapov.trade/assets/redesignArapovTrade/img/imageAuthor-light.png',
      sameAs: [
        'https://www.youtube.com/@ArapovTrade',
        'https://t.me/ArapovTrade',
      ],
      jobTitle: 'Профессиональный трейдер',
      description:
        'Активно торгую на финансовых рынках с 2013 года. Автор бесплатного курса по трейдингу.',
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
          name: 'Что такое холодный кошелёк?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Холодный кошелёк — это способ хранения криптовалюты без постоянного подключения к интернету. К ним относятся аппаратные кошельки (Ledger, Trezor), бумажные кошельки и металлические пластины. Они обеспечивают максимальную защиту от хакерских атак.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем отличается горячий кошелёк от холодного?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Горячий кошелёк подключён к интернету и удобен для частых транзакций. Холодный кошелёк хранит ключи офлайн и обеспечивает максимальную безопасность. Для долгосрочного хранения рекомендуются холодные кошельки.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое seed-фраза и зачем она нужна?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Seed-фраза (мнемоническая фраза) — это набор из 12-24 слов, генерируемый при создании кошелька. Она позволяет восстановить доступ к средствам при утере устройства. Фразу нужно хранить в безопасном месте и никогда не сохранять в цифровом виде.',
          },
        },
        {
          '@type': 'Question',
          name: 'Безопасно ли хранить криптовалюту на бирже?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Хранение на бирже удобно для активной торговли, но несёт риски: биржи могут быть взломаны, заблокированы или обанкротиться. Для долгосрочного хранения рекомендуется использовать личные кошельки, где вы контролируете приватные ключи.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какой аппаратный кошелёк выбрать?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Популярные аппаратные кошельки: Ledger Nano X/S, Trezor Model T/One, SafePal. При выборе учитывайте поддержку нужных криптовалют, удобство интерфейса и репутацию производителя. Покупайте только у официальных продавцов.',
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
      '@id': 'https://arapov.trade/ru/freestudying/cryptostoring#howto',
      name: 'Как безопасно хранить криптовалюту',
      description:
        'Пошаговое руководство по безопасному хранению криптоактивов и защите от взломов',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Определите размер и горизонт хранения',
          text: 'Оцените сумму криптовалют, которые вы планируете хранить, и сроки хранения. Если это долгосрочное хранение крупной суммы, отдайте предпочтение холодным кошелькам. Для активной торговли малыми суммами подойдут горячие кошельки.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Выберите тип кошелька',
          text: 'Для долгосрочного хранения используйте холодные кошельки: аппаратные (Ledger, Trezor), бумажные или металлические пластины. Для частых транзакций - горячие кошельки: мобильные приложения или веб-кошельки. Комбинируйте оба типа для максимальной безопасности.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Приобретите аппаратный кошелёк у официального продавца',
          text: 'Выберите проверенного производителя (Ledger, Trezor, SafePal). Покупайте только у официальных дилеров или сертифицированных магазинов. Избегайте б/у устройств. Проверьте целостность упаковки при получении.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Генерируйте seed-фразу при первом использовании',
          text: 'Во время инициализации кошелька сгенерируется 12-24 словная seed-фраза. Запишите её на бумаге в правильном порядке. Никогда не фотографируйте, не сохраняйте в облаке или на компьютере. Храните в надёжном месте - сейфе, шкатулке, сундуке.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Установите надёжный пароль и PIN-код',
          text: 'Установите сложный пароль для устройства (если поддерживается). Установите 4-8 значный PIN для аппаратного кошелька. Запомните PIN, но никому его не сообщайте. Не используйте простые последовательности (1234, 0000).',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Проверьте адреса и отправьте тестовую сумму',
          text: 'Перед первым крупным переводом отправьте минимальную сумму криптовалюты. Убедитесь, что адреса совпадают и транзакция прошла успешно. Это подтвердит, что кошелёк работает корректно.',
        },
        {
          '@type': 'HowToStep',
          position: 7,
          name: 'Резервируйте seed-фразу в нескольких местах',
          text: 'Сделайте 2-3 копии записанной seed-фразы. Храните их в разных безопасных местах: дома в сейфе, у доверенного человека, в банке. Это защитит от потери доступа при пожаре, краже или других ЧП.',
        },
        {
          '@type': 'HowToStep',
          position: 8,
          name: 'Используйте многоуровневую защиту',
          text: 'Разделите крупную сумму между несколькими кошельками. Используйте разные пароли для каждого. Подумайте о multi-sig кошельках, требующих несколько подписей для транзакции. Это предотвратит потерю всех средств при компрометации одного кошелька.',
        },
        {
          '@type': 'HowToStep',
          position: 9,
          name: 'Обновляйте ПО и используйте безопасную сеть',
          text: 'Держите ПО кошелька и устройства в актуальном состоянии. При подключении аппаратного кошелька используйте чистый компьютер без вирусов. Избегайте публичного Wi-Fi при проведении транзакций. Проверяйте скам-сайты перед вводом приватных ключей.',
        },
        {
          '@type': 'HowToStep',
          position: 10,
          name: 'Проверяйте адреса перед каждой отправкой',
          text: 'Всегда проверяйте адрес получателя перед подтверждением. Используйте функцию проверки на устройстве (если есть). Отправляйте сначала небольшую сумму, а потом остаток. Остерегайтесь фишинга и подменённых адресов.',
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
      name: 'Глоссарий хранения криптовалют',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Приватный ключ',
          description:
            'Криптографическая последовательность, дающая полный контроль над криптовалютными средствами.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Публичный ключ',
          description:
            'Адрес кошелька, который можно передавать для получения криптовалюты.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Seed-фраза',
          description:
            'Мнемоническая фраза из 12-24 слов для восстановления доступа к кошельку.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Холодный кошелёк',
          description:
            'Способ хранения криптовалюты без подключения к интернету.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Горячий кошелёк',
          description:
            'Кошелёк с постоянным подключением к интернету для быстрых транзакций.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Аппаратный кошелёк',
          description:
            'Физическое устройство для безопасного хранения приватных ключей офлайн.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Мультисиг',
          description:
            'Кошелёк, требующий нескольких подписей для проведения транзакции.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кастодиальный кошелёк',
          description:
            'Кошелёк, где приватные ключи хранятся третьей стороной.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Некастодиальный кошелёк',
          description:
            'Кошелёк с полным контролем пользователя над приватными ключами.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'MFA',
          description:
            'Многофакторная аутентификация для дополнительной защиты аккаунта.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
