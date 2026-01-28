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
  selector: 'app-home-ru-blog-fifty-three',
  templateUrl: './home-ru-blog-fifty-three.component.html',
  styleUrl: './home-ru-blog-fifty-three.component.scss',
})
export class HomeRuBlogFiftyThreeComponent implements OnInit {
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

    this.ukrGroups = this.artickleServ.getRussianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;

    this.titleService.setTitle(
      'Order Block в трейдинге: полное руководство | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Order Block в трейдинге: полное руководство. Узнайте, как находить и торговать ордерные блоки. Типы блоков, стратегии входа, управление риском.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-03-30' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/orderblockintrading.webp',
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

    this.router.navigate(['/ru/freestudying', nextpage]);
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
          '@id':
            'https://arapov.trade/ru/freestudying/orderblockintrading#article',
          headline: 'Order Block в трейдинге: полное руководство по торговле',
          description:
            'Полное руководство по ордерным блокам в трейдинге. Как находить Order Block, типы блоков, стратегии торговли и управление риском.',
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/orderblocks.png',
            width: 1200,
            height: 630,
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/orderblockintrading',
          },
          articleSection: 'Трейдинг',
          keywords: [
            'Order Block',
            'ордерный блок',
            'Smart Money',
            'бычий блок',
            'медвежий блок',
          ],
          wordCount: 1332,
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
      '@id': 'https://arapov.trade/ru/freestudying/orderblockintrading#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Что такое Order Block в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Order Block — это специфическая ценовая зона, отражающая действия крупных институциональных участников рынка. Банки и хедж-фонды используют эти области для накопления или распределения позиций перед запуском направленных движений.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как определить бычий ордерный блок?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Бычий ордерный блок определяется как последняя медвежья свеча или группа свечей перед сильным восходящим импульсом. Границами блока служат максимум и минимум этой свечи.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем ордерный блок отличается от уровня поддержки?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'В отличие от стандартных уровней поддержки и сопротивления, ордерные блоки указывают на конкретные точки входа крупных участников в рынок и всегда предшествуют импульсному движению.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какая лучшая стратегия торговли на ордерных блоках?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Классическая стратегия — торговля на ретесте блока. При возвращении цены к ордерному блоку ожидается сильная реакция. Вход с подтверждением свечным паттерном повышает вероятность успеха.',
          },
        },
        {
          '@type': 'Question',
          name: 'Где размещать стоп-лосс при торговле на ордерном блоке?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Стоп-лосс размещается за границей ордерного блока с буферной зоной. Для бычьего блока это уровень ниже минимума зоны, для медвежьего — выше максимума.',
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
      '@id': 'https://arapov.trade/ru/freestudying/orderblockintrading#howto',
      name: 'Как торговать на ордерных блоках',
      description:
        'Пошаговое руководство по определению и торговле ордерных блоков',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Анализ структуры',
          text: 'Определите текущий тренд через последовательность максимумов и минимумов. В восходящем тренде ищите бычьи блоки, в нисходящем — медвежьи.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Поиск импульса',
          text: 'Найдите сильное направленное движение, создающее новые структурные точки или пробивающее значимые уровни.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Определение блока',
          text: 'Отметьте последнюю противоположную свечу перед импульсом. Для бычьего блока — медвежью свечу, для медвежьего — бычью.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Ожидание ретеста',
          text: 'Дождитесь возвращения цены к зоне блока. Ищите подтверждающие свечные паттерны или объёмные сигналы.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Вход и управление',
          text: 'Входите в направлении импульса со стоп-лоссом за границей блока. Фиксируйте прибыль частями на структурных уровнях.',
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
      '@id':
        'https://arapov.trade/ru/freestudying/orderblockintrading#glossary',
      name: 'Глоссарий терминов Order Block',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Order Block',
          description:
            'Ценовая зона институционального накопления или распределения позиций перед импульсным движением.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Бычий ордерный блок',
          description:
            'Последняя медвежья свеча перед сильным восходящим импульсом, зона накопления длинных позиций.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Медвежий ордерный блок',
          description:
            'Последняя бычья свеча перед сильным нисходящим импульсом, зона распределения позиций.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Брейкер блок',
          description:
            'Ордерный блок, структура которого нарушена пробоем, меняющий роль с поддержки на сопротивление или наоборот.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Митигейшн блок',
          description:
            'Зона неэффективного ценообразования, к которой рынок стремится вернуться для заполнения дисбаланса.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ретест',
          description:
            'Возвращение цены к ранее пробитому уровню или зоне для проверки её значимости.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Импульсное движение',
          description:
            'Сильное однонаправленное движение цены с высоким моментумом.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Зона ликвидности',
          description:
            'Область скопления стоп-ордеров, привлекающая цену перед разворотом.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Smart Money',
          description:
            'Институциональные участники рынка — банки, хедж-фонды, маркет-мейкеры.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Свечной паттерн',
          description:
            'Комбинация свечей, сигнализирующая о вероятном направлении движения цены.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
