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
  selector: 'app-home-ru-blog-four',
  templateUrl: './home-ru-blog-four.component.html',
  styleUrl: './home-ru-blog-four.component.scss',
})
export class HomeRuBlogFourComponent implements OnInit {
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
      'Маржинальная торговля без потерь: как избежать убытков | ArapovTrade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Узнайте, как избежать потерь в маржинальной торговле. Управление рисками, кредитное плечо, стоп-лоссы, психология трейдинга и проверенные стратегии.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-24' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/reasonfordepositeloose.png',
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
            'Маржинальная торговля без потерь: полное руководство по управлению рисками',
          description:
            'Подробное руководство по избежанию потерь в маржинальной торговле. Управление капиталом, психология трейдинга, технические инструменты и проверенные стратегии.',
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
          dateModified: '2025-12-13T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/avoidlosingmoney',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/reasonfordepositeloose.png',
            width: 1200,
            height: 630,
          },
          articleSection: 'Риск-менеджмент',
          keywords:
            'маржинальная торговля, кредитное плечо, управление рисками, стоп-лосс',
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
          name: 'Что такое маржинальная торговля?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Маржинальная торговля — это форма торговли, при которой трейдер использует заёмные средства брокера для открытия позиций, превышающих его собственный капитал. Кредитное плечо увеличивает как потенциальную прибыль, так и риски убытков.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какой риск допустим на одну сделку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Рекомендуемый риск на одну сделку составляет 1-2% от общего депозита. Такой подход позволяет пережить серию убыточных сделок без критического ущерба для торгового счёта и сохранить капитал для будущих возможностей.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему важно использовать стоп-лоссы?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Стоп-лосс автоматически закрывает позицию при достижении заданного уровня убытков, защищая капитал от значительных потерь. Это позволяет сохранять эмоциональный контроль и избегать паники при неблагоприятном движении рынка.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какое кредитное плечо рекомендуется для начинающих?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Начинающим трейдерам рекомендуется использовать минимальное плечо 1:2 или 1:3. Высокое плечо значительно увеличивает риски: при плече 1:20 даже 5% изменение цены может привести к полной ликвидации позиции.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое ликвидация позиции?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ликвидация — это принудительное закрытие позиции брокером, когда убытки достигают уровня, при котором депозит не может их покрыть. Чтобы избежать ликвидации, важно оставлять достаточный запас средств и использовать стоп-лоссы.',
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
      '@id': 'https://arapov.trade/ru/freestudying/avoidlosingmoney#howto',
      name: 'Как избежать потерь в маржинальной торговле',
      description: 'Пошаговое руководство по управлению рисками и защите капитала при маржинальной торговле',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Определите допустимый уровень риска',
          text: 'Перед началом торговли установите, какую часть капитала вы готовы потерять. Рекомендуется рисковать не более 1-2% депозита на одну сделку и максимум 5% в день. Это защитит ваш счёт от разорения при серии убыточных сделок.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Установите стоп-лоссы на каждую позицию',
          text: 'Перед открытием позиции заранее определите уровень стоп-лосса ниже ключевых уровней поддержки. Стоп-лосс автоматически закроет позицию при убытке, сохраняя ваш капитал от дальнейших потерь.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Используйте консервативное кредитное плечо',
          text: 'Начинающим трейдерам рекомендуется использовать плечо 1:2 или 1:3. Опытные трейдеры могут увеличивать плечо в зависимости от волатильности актива и рыночных условий, но избегайте максимального плеча.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Проведите анализ перед сделкой',
          text: 'Изучите технический анализ (графики, уровни поддержки/сопротивления), фундаментальный анализ (новости, события) и рыночный сентимент. Чем больше данных вы анализируете, тем обоснованнее ваши решения.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Диверсифицируйте портфель',
          text: 'Распределяйте капитал между несколькими активами и стратегиями. Никогда не открывайте все позиции по одному инструменту — это уменьшит риск полной потери при неблагоприятном движении одного актива.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Уменьшайте позицию при приближении к лимиту потерь',
          text: 'Если за день вы потеряли 3-4% депозита, закройте оставшиеся позиции и прекратите торговлю. Это предотвратит эмоциональные решения и защитит капитал от критических убытков.',
        },
        {
          '@type': 'HowToStep',
          position: 7,
          name: 'Ведите дневник сделок',
          text: 'Записывайте каждую сделку: дату, актив, размер позиции, причину входа, результат. Анализируйте ошибки и успехи, чтобы постоянно совершенствовать стратегию.',
        },
        {
          '@type': 'HowToStep',
          position: 8,
          name: 'Контролируйте эмоции',
          text: 'Маржинальная торговля требует психологической устойчивости. Не открывайте позиции в спешке, не увеличивайте плечо при убытках и соблюдайте свой торговый план, даже если рынок движется против вас.',
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
      name: 'Глоссарий маржинальной торговли',
      description:
        'Основные термины и определения, связанные с маржинальной торговлей и управлением рисками',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Маржинальная торговля',
          description:
            'Торговля с использованием заёмных средств брокера, позволяющая открывать позиции, превышающие собственный капитал трейдера.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кредитное плечо',
          description:
            'Соотношение заёмных средств к собственному капиталу трейдера. Плечо 1:10 позволяет торговать суммой в 10 раз больше депозита.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маржа',
          description:
            'Сумма собственных средств трейдера, которая предоставляется в качестве залога для открытия маржинальной позиции.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ликвидация',
          description:
            'Принудительное закрытие позиции брокером при достижении критического уровня убытков для защиты заёмных средств.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Защитный ордер, автоматически закрывающий позицию при достижении заданного уровня убытков.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тейк-профит',
          description:
            'Ордер на автоматическое закрытие позиции при достижении целевого уровня прибыли.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Трейлинг-стоп',
          description:
            'Динамический стоп-лосс, который автоматически перемещается вслед за ценой, фиксируя прибыль при развороте.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Риск-менеджмент',
          description:
            'Система управления рисками, включающая определение размера позиции, установку стоп-лоссов и диверсификацию портфеля.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Проскальзывание',
          description:
            'Разница между ожидаемой и фактической ценой исполнения ордера, возникающая при высокой волатильности или низкой ликвидности.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маржин-колл',
          description:
            'Требование брокера внести дополнительные средства на счёт для поддержания открытых позиций при достижении критического уровня убытков.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
