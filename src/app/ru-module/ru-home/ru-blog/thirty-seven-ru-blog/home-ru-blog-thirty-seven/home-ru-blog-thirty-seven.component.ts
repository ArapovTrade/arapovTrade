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
  selector: 'app-home-ru-blog-thirty-seven',
  templateUrl: './home-ru-blog-thirty-seven.component.html',
  styleUrl: './home-ru-blog-thirty-seven.component.scss',
})
export class HomeRuBlogThirtySevenComponent implements OnInit {
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
      'Просадка в трейдинге: управление рисками и восстановление капитала | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Просадка в трейдинге: виды drawdown, причины возникновения, методы анализа и минимизации. Практическое руководство по управлению рисками и восстановлению капитала.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-02' });this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/drawdowns.webp',
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
          headline:
            'Просадка в трейдинге: управление рисками и восстановление капитала',
          description:
            'Комплексное руководство по управлению просадками: виды drawdown, причины возникновения, методы анализа, минимизации и восстановления торгового капитала.',
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
          datePublished: '2026-03-25T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',

          image: 'https://arapov.trade/assets/img/content/drawdowns1.webp',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/drawdowns',
          },
          articleSection: 'Трейдинг',
          keywords: [
            'просадка',
            'drawdown',
            'риск-менеджмент',
            'управление капиталом',
            'восстановление счёта',
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
          name: 'Что такое просадка в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Просадка (drawdown) — это временное снижение торгового капитала от максимального значения до текущего или минимального уровня. Показатель выражается в процентах или абсолютных величинах и служит ключевой метрикой оценки рисков торговой стратегии.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какой уровень просадки считается допустимым?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для консервативных стратегий допустимой считается просадка до 10-15%, для умеренных — до 20-25%, для агрессивных — до 30-35%. Просадка свыше 50% критически опасна, поскольку требует 100% прибыли для восстановления капитала.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как минимизировать просадки в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основные методы минимизации: ограничение риска на сделку до 1-2% капитала, обязательное использование стоп-лоссов, диверсификация портфеля, уменьшение размера позиций при нарастании убытков и соблюдение торгового плана.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как восстановить капитал после глубокой просадки?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Восстановление требует снижения рисков, анализа причин убытков, фокуса на качестве сделок вместо их количества и постепенного увеличения позиций по мере роста счёта. Важно не пытаться отыграться агрессивной торговлей.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем отличается максимальная просадка от текущей?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Максимальная просадка — наибольшее падение капитала от пика до дна за всю историю торговли. Текущая просадка — моментальное снижение от последнего максимума, динамический показатель, меняющийся с каждой сделкой.',
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
      name: 'Как управлять просадками в трейдинге',
      description:
        'Пошаговое руководство по контролю просадок и восстановлению торгового капитала',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Определите допустимый уровень риска',
          text: 'Установите максимально допустимую просадку для вашей стратегии и ограничьте риск на одну сделку до 1-2% от капитала.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Настройте защитные ордера',
          text: 'Размещайте стоп-лоссы для каждой позиции на основе технического анализа, а не комфортной суммы убытка.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Ведите мониторинг просадок',
          text: 'Отслеживайте текущую, среднюю и максимальную просадку, анализируйте время восстановления и коэффициент восстановленности.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Применяйте правила снижения рисков',
          text: 'При достижении 5% просадки сократите объём сделок вдвое, при 10% — приостановите торговлю для анализа.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Восстанавливайте капитал системно',
          text: 'После просадки снизьте риски, проанализируйте ошибки, фокусируйтесь на качественных сетапах и постепенно увеличивайте позиции.',
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
      name: 'Глоссарий терминов управления просадками',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Просадка',
          description:
            'Временное снижение торгового капитала от максимального значения до текущего или минимального уровня',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Drawdown',
          description:
            'Английский термин для обозначения просадки, широко используемый в международной торговой практике',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Максимальная просадка',
          description:
            'Наибольшее падение капитала от пика до дна за определённый период торговли',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Коэффициент восстановления',
          description:
            'Отношение накопленной прибыли к максимальной просадке, показывающее эффективность стратегии',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Риск-менеджмент',
          description:
            'Система управления торговыми рисками, включающая контроль размера позиций и защитные ордера',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Защитный ордер, автоматически закрывающий позицию при достижении заданного уровня убытка',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Время восстановления',
          description:
            'Период, необходимый для возврата капитала к предыдущему максимуму после просадки',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Диверсификация',
          description:
            'Распределение капитала между различными активами для снижения общего риска портфеля',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильность',
          description:
            'Степень изменчивости цены актива, влияющая на размер потенциальных просадок',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Винрейт',
          description:
            'Процент прибыльных сделок от общего числа, влияющий на частоту и глубину просадок',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
