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
  selector: 'app-home-ru-blog-one',
  templateUrl: './home-ru-blog-one.component.html',
  styleUrl: './home-ru-blog-one.component.scss',
})
export class HomeRuBlogOneComponent implements OnInit {
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
      'Фазы рынка в трейдинге: как определить текущий этап цикла | Игорь Арапов',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Фазы рынка в трейдинге: накопление, восходящий тренд, распределение и нисходящий тренд. Узнайте, как определять текущую фазу цикла и адаптировать торговую стратегию.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-13' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/blogmarketphases.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.artickleServ.getRandomUkArticles();
  }

  hoveredIndex: number | null = null;

  projects = [
    { title: 'Книги по трейдингу', link: 'https://arapov.trade/ru/books' },
    {
      title: 'Профессиональные курсы',
      link: 'https://arapov.trade/ru/studying',
    },
    {
      title: 'Базовый курс',
      link: 'https://arapov.trade/ru/freestudying/freeeducation',
    },
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
          headline: 'Фазы рынка в трейдинге: как определить текущий этап цикла',
          description:
            'Подробное руководство по четырём фазам рыночного цикла: накопление, восходящий тренд, распределение и нисходящий тренд. Стратегии торговли для каждой фазы.',
          image:
            'https://arapov.trade/assets/img/content/blogmarketphases.webp',
          datePublished: '2026-03-25T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov Trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/blogmarketphases',
          },
          articleSection: 'Обучение трейдингу',
          keywords: [
            'фазы рынка',
            'рыночные циклы',
            'накопление',
            'распределение',
            'тренд',
            'технический анализ',
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
      alternateName: [
        'Igor Arapov',
        'Арапов Игорь',
        'I. Arapov',
        'Ігор Арапов',
        'І. В. Арапов',
        'Арапов Ігор',
        'Arapov Igor',
      ],
      url: 'https://arapov.trade/ru',
      image:
        'https://arapov.trade/assets/redesignArapovTrade/img/imageAuthor-light.png',
      sameAs: [
        'https://www.wikidata.org/wiki/Q137454477',
        'https://scholar.google.com/citations?user=N440tWQAAAAJ',
        'https://orcid.org/0009-0003-0430-778X',
        'https://isni.org/isni/0000000529518564',
        'https://www.amazon.com/stores/author/B0GBRFY457',
        'https://github.com/ArapovTrade',
        'https://ua.linkedin.com/in/arapovtrade',
        'https://www.youtube.com/@ArapovTrade',
        'https://t.me/ArapovTrade',
      ],
      jobTitle: [
        'Независимый исследователь',
        'трейдер',
        'автор и основатель arapov.trade',
      ],
      description:
        'Независимый исследователь, практикующий трейдер, автор книг по трейдингу и научных публикаций. Специализируется на психологии трейдинга и когнитивных искажениях на финансовых рынках.',
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
          name: 'Какие существуют основные фазы рынка?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Существуют четыре основные фазы рыночного цикла: фаза накопления (консолидация после падения), фаза восходящего тренда (период роста), фаза распределения (консолидация на вершине) и фаза нисходящего тренда (период снижения). Эти фазы циклически сменяют друг друга.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как определить фазу накопления на графике?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Фаза накопления характеризуется горизонтальным движением цены в узком диапазоне после продолжительного падения. Признаки включают: низкую волатильность, многократное тестирование уровня поддержки без его пробоя, рост объёмов на движениях вверх, бычьи дивергенции на RSI и MACD.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие индикаторы помогают определить текущую фазу рынка?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для определения фазы рынка используются: скользящие средние (направление тренда), RSI и MACD (дивергенции и импульс), Bollinger Bands (волатильность), ADX (сила тренда), Volume Profile (распределение объёмов). Комплексный анализ нескольких индикаторов повышает точность.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем отличается фаза распределения от фазы накопления?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Фаза накопления происходит на минимумах после падения — крупные игроки скупают актив. Фаза распределения происходит на максимумах после роста — крупные игроки продают актив. В накоплении объёмы растут на росте цены, в распределении — на падении. Психология также противоположна: пессимизм в накоплении и эйфория в распределении.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как торговать в разных фазах рынка?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'В фазе накопления: готовиться к покупке при пробое сопротивления. В восходящем тренде: покупать на откатах, использовать трейлинг-стопы. В фазе распределения: фиксировать прибыль, ужесточать стопы. В нисходящем тренде: продавать на отскоках или использовать короткие позиции. Во всех фазах важен риск-менеджмент.',
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
      name: 'Как определить текущую фазу рыночного цикла',
      description:
        'Пошаговое руководство по определению текущей фазы рынка для принятия торговых решений',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Определите общий контекст',
          text: 'Проанализируйте график на старшем таймфрейме (дневной, недельный). Определите, находится ли рынок в восходящем или нисходящем тренде, либо в боковом движении после сильного импульса.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Оцените структуру цены',
          text: 'Изучите последовательность максимумов и минимумов. Повышающиеся максимумы и минимумы указывают на восходящий тренд, понижающиеся — на нисходящий, горизонтальные — на фазу накопления или распределения.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Проанализируйте объёмы торгов',
          text: 'Сравните объёмы на восходящих и нисходящих движениях. В накоплении объёмы растут на росте цены. В распределении объёмы увеличиваются при падении. В трендах объёмы подтверждают направление движения.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Проверьте индикаторы',
          text: 'Используйте RSI и MACD для выявления дивергенций, которые предупреждают о потенциальном развороте. Примените ADX для оценки силы текущего тренда. Bollinger Bands покажет сжатие волатильности перед сильным движением.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Примите торговое решение',
          text: 'На основе определённой фазы выберите соответствующую стратегию: подготовка к входу в накоплении, следование тренду в трендовых фазах, фиксация прибыли в распределении. Установите параметры риск-менеджмента согласно текущей фазе.',
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
      name: 'Глоссарий терминов: фазы рынка',
      description:
        'Ключевые термины и понятия, связанные с фазами рыночного цикла в трейдинге',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Фаза накопления',
          description:
            'Период консолидации на минимумах рынка, когда крупные игроки планомерно выкупают актив после продолжительного снижения цены',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фаза распределения',
          description:
            'Период консолидации на максимумах рынка, когда крупные игроки фиксируют прибыль и передают позиции запоздавшим покупателям',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Восходящий тренд',
          description:
            'Фаза рынка с устойчивым ростом цены, характеризующаяся последовательностью повышающихся максимумов и минимумов',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Нисходящий тренд',
          description:
            'Фаза рынка с устойчивым снижением цены, характеризующаяся последовательностью понижающихся максимумов и минимумов',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Дивергенция',
          description:
            'Расхождение между движением цены и показаниями индикатора, сигнализирующее о потенциальном развороте тренда',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маркет-мейкер',
          description:
            'Крупный участник рынка, обеспечивающий ликвидность и способный влиять на формирование цены актива',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Консолидация',
          description:
            'Период бокового движения цены в ограниченном диапазоне, предшествующий сильному направленному импульсу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Рыночный цикл',
          description:
            'Последовательность повторяющихся фаз развития цены актива: накопление, рост, распределение, падение',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volume Profile',
          description:
            'Инструмент анализа, показывающий распределение торговых объёмов по ценовым уровням для выявления зон интереса участников рынка',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Капитуляция',
          description:
            'Массовая паническая продажа активов участниками рынка, обычно происходящая в финальной стадии нисходящего тренда',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
