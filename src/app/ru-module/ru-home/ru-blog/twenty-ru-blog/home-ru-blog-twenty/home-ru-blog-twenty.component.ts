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
  selector: 'app-home-ru-blog-twenty',
  templateUrl: './home-ru-blog-twenty.component.html',
  styleUrl: './home-ru-blog-twenty.component.scss',
})
export class HomeRuBlogTwentyComponent implements OnInit {
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
    this.titleService.setTitle('Что такое скам в криптовалюте | Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Что такое скам в криптовалюте: виды мошенничества, признаки фейковых проектов, фишинг, пирамиды и способы защиты ваших криптоактивов от мошенников.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-21' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cryptoscam.webp',
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
            'Что такое скам в криптовалюте: виды мошенничества и защита',
          description:
            'Что такое скам в криптовалюте: виды мошенничества, признаки фейковых проектов, фишинг, пирамиды и способы защиты ваших криптоактивов от мошенников.',
          author: {
            '@id': 'https://arapov.trade/ru#person',
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
          dateModified: '2025-12-29T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/cryptoscam',
          },
          image: 'https://arapov.trade/assets/img/content/cryptoscam1.webp',
          articleSection: 'Обучение трейдингу',
          keywords: [
            'скам криптовалюта',
            'мошенничество',
            'фишинг',
            'криптопирамиды',
            'безопасность',
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
          name: 'Что такое скам в криптовалюте?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Скам в криптовалюте — это мошенничество, направленное на кражу средств или личных данных пользователей. Включает фейковые ICO, фишинговые атаки, пирамидальные схемы и поддельные биржи. Мошенники используют доверчивость и недостаток знаний для обмана как новичков, так и опытных инвесторов.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как распознать криптовалютный скам?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Признаки скама: нереалистичные обещания гарантированной прибыли, анонимная команда без публичных профилей, отсутствие White Paper или дорожной карты, давление на срочное принятие решений, уклонение от вопросов о структуре проекта.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие виды криптоскама наиболее распространены?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основные виды: фейковые ICO с профессиональными сайтами без реального продукта, фишинговые сайты копирующие биржи, пирамиды Понци с выплатами за счёт новых участников, поддельные биржи не позволяющие вывести средства, rug pull в DeFi проектах.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как защитить свои криптоактивы от мошенников?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Используйте аппаратные кошельки для хранения, включите двухфакторную аутентификацию, проверяйте URL сайтов перед вводом данных, изучайте проекты через независимые источники, никогда не делитесь приватными ключами и seed-фразами.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что делать если стал жертвой криптоскама?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Немедленно смените пароли на всех связанных аккаунтах, сообщите о мошенничестве в правоохранительные органы и на платформу где произошёл инцидент, предупредите сообщество в социальных сетях, сохраните все доказательства для возможного расследования.',
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
      name: 'Как защититься от криптовалютного скама',
      description:
        'Пошаговое руководство по защите ваших криптоактивов от мошенников',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Проверьте проект перед инвестированием',
          text: 'Изучите White Paper, команду разработчиков, их публичные профили в LinkedIn. Проверьте историю проекта и отзывы на независимых платформах вроде Reddit и BitcoinTalk.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Используйте надёжные кошельки и биржи',
          text: 'Храните криптовалюту на аппаратных кошельках Ledger или Trezor. Используйте только проверенные биржи с лицензиями и хорошей репутацией.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Включите двухфакторную аутентификацию',
          text: 'Активируйте 2FA на всех криптовалютных платформах. Используйте приложения-аутентификаторы вместо SMS для большей безопасности.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Проверяйте URL-адреса сайтов',
          text: 'Всегда проверяйте адрес сайта перед вводом данных. Добавляйте официальные сайты в закладки. Остерегайтесь ссылок из непроверенных источников.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Никогда не делитесь приватными ключами',
          text: 'Храните seed-фразы и приватные ключи офлайн. Никогда не вводите их на сайтах и не сообщайте третьим лицам, даже если они представляются службой поддержки.',
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
      name: 'Термины криптовалютного мошенничества',
      description: 'Глоссарий ключевых понятий в сфере криптоскама',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Скам',
          description:
            'Мошенничество, направленное на кражу денежных средств или конфиденциальной информации пользователей криптовалют',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фишинг',
          description:
            'Вид мошенничества, при котором злоумышленники создают поддельные сайты или приложения для кражи учётных данных пользователей',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Пирамида Понци',
          description:
            'Мошенническая схема, где доход ранних инвесторов выплачивается за счёт вложений новых участников',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ICO (Initial Coin Offering)',
          description:
            'Первичное размещение токенов для привлечения инвестиций в криптовалютный проект',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Rug Pull',
          description:
            'Мошенничество в DeFi, когда разработчики забирают ликвидность из пула и исчезают со средствами инвесторов',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Социальная инженерия',
          description:
            'Методы психологического манипулирования для получения конфиденциальной информации от жертв',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Seed-фраза',
          description:
            'Набор слов для восстановления доступа к криптокошельку, который никогда нельзя раскрывать третьим лицам',
        },
        {
          '@type': 'DefinedTerm',
          name: '2FA (двухфакторная аутентификация)',
          description:
            'Метод защиты аккаунта, требующий подтверждения входа через второй канал помимо пароля',
        },
        {
          '@type': 'DefinedTerm',
          name: 'White Paper',
          description:
            'Технический документ проекта, описывающий его концепцию, технологию и план развития',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Аппаратный кошелёк',
          description:
            'Физическое устройство для безопасного хранения приватных ключей криптовалют офлайн',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
