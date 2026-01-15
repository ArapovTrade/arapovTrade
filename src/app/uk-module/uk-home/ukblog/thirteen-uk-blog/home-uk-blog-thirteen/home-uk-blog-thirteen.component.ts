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
  selector: 'app-home-uk-blog-thirteen',
  templateUrl: './home-uk-blog-thirteen.component.html',
  styleUrl: './home-uk-blog-thirteen.component.scss',
})
export class HomeUkBlogThirteenComponent implements OnInit {
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
      'Хвилі Елліотта: Повний посібник з хвильового аналізу | Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Хвилі Елліотта — повний посібник з хвильового аналізу для трейдерів. Імпульсні та корекційні хвилі, правила розмітки, практичне застосування з рівнями Фібоначчі.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/wavesofelliott.webp',
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
          '@id': 'https://arapov.trade/uk/freestudying/wavesofelliott#article',
          headline: 'Хвилі Елліотта: Повний посібник з хвильового аналізу',
          description:
            'Хвилі Елліотта — повний посібник з хвильового аналізу для трейдерів. Імпульсні та корекційні хвилі, правила розмітки, практичне застосування з рівнями Фібоначчі.',
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/wavesofelliott.webp',
            width: 1200,
            height: 630,
          },
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade#organization',
            name: 'Arapov.trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/content/favicon.ico',

              width: 300,
              height: 60,
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-12T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/wavesofelliott',
          },
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
      '@id': 'https://arapov.trade/uk/freestudying/wavesofelliott#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Що таке хвилі Елліотта?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Хвилі Елліотта — це метод технічного аналізу, що описує рух ринку у вигляді повторюваних хвильових циклів. Повний цикл складається з восьми хвиль: п'яти імпульсних у напрямку тренду та трьох корекційних проти нього. Теорія базується на масовій психології учасників ринку.",
          },
        },
        {
          '@type': 'Question',
          name: 'Які основні правила хвиль Елліотта?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Три фундаментальні правила: хвиля 2 ніколи не опускається нижче початку хвилі 1; хвиля 3 ніколи не є найкоротшою серед імпульсних хвиль; хвиля 4 не перетинає цінову територію хвилі 1. Порушення цих правил вказує на помилку в розмітці.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як застосовувати рівні Фібоначчі з хвилями Елліотта?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Рівні 38,2%, 50%, 61,8% визначають глибину корекційних хвиль. Розширення 161,8% та 261,8% вказують цілі імпульсних хвиль. Третя хвиля часто досягає 161,8% від довжини першої хвилі. Збіг хвильових цілей з рівнями Фібоначчі підсилює торговий сигнал.',
          },
        },
        {
          '@type': 'Question',
          name: 'Яка хвиля найприбутковіша для торгівлі?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Третя хвиля є найпотужнішою та найприбутковішою для торгівлі. Вона ніколи не буває найкоротшою і часто досягає 161,8-261,8% від першої хвилі. Вхід здійснюється після завершення другої корекційної хвилі, коли тренд уже підтверджений ринком.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які корекційні патерни існують у хвильовому аналізі?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Основні корекційні патерни: зигзаг — різка корекція ABC; флет — горизонтальний рух з рівними хвилями; трикутник — п'ять хвиль (A-E), що звужують діапазон. Кожен патерн вказує на різну силу корекції та допомагає визначити момент її завершення.",
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
      '@id': 'https://arapov.trade/uk/freestudying/wavesofelliott#howto',
      name: 'Як застосовувати хвилі Елліотта в трейдингу',
      description:
        'Покрокове керівництво із застосування хвильового аналізу Елліотта для пошуку торгових можливостей на фінансових ринках.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Визначте глобальний тренд',
          text: 'Почніть аналіз з денного або тижневого графіка. Знайдіть послідовність імпульсних хвиль (1-2-3-4-5), що вказує напрямок основного тренду. Визначте, чи знаходиться ринок в імпульсній або корекційній фазі.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Розмітьте хвильову структуру',
          text: 'Позначте хвилі на графіку, дотримуючись трьох основних правил: хвиля 2 не нижче початку хвилі 1, хвиля 3 не найкоротша, хвиля 4 не перетинає зону хвилі 1. Використовуйте рівні Фібоначчі для перевірки пропорцій.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Знайдіть точку входу',
          text: "Шукайте вхід після завершення корекційних хвиль. Оптимальні точки: кінець хвилі 2 для участі в третій хвилі, кінець хвилі 4 для п'ятої хвилі, завершення корекції ABC для нового імпульсного циклу.",
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Встановіть захисні ордери',
          text: 'Розмістіть стоп-лос за початком поточної хвилі або за ключовим рівнем Фібоначчі. Розрахуйте розмір позиції так, щоб ризик не перевищував 1-2% від депозиту. Забезпечте співвідношення ризику до прибутку мінімум 1:2.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Визначте ціль та керуйте позицією',
          text: "Розрахуйте ціль через розширення Фібоначчі: 161,8% для третьої хвилі, довжина хвилі 1 для п'ятої хвилі. Частково фіксуйте прибуток на проміжних рівнях. Переміщуйте стоп-лос у беззбитковість після руху у вашу сторону.",
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
      '@id': 'https://arapov.trade/uk/freestudying/wavesofelliott#glossary',
      name: 'Глосарій термінів хвильового аналізу',
      description: 'Ключові терміни та визначення теорії хвиль Елліотта',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Імпульсна хвиля',
          description:
            'Хвиля, що рухається в напрямку основного тренду. Імпульсні хвилі позначаються цифрами 1, 3, 5 та формують основний трендовий рух ринку.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Корекційна хвиля',
          description:
            'Хвиля, спрямована проти основного тренду. Корекційні хвилі позначаються цифрами 2, 4 та літерами A, B, C, представляючи відкати в трендовому русі.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Хвильовий цикл',
          description:
            "Повна структура з восьми хвиль: п'яти імпульсних та трьох корекційних. Кожен цикл відображає завершену фазу ринкового руху.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Зигзаг',
          description:
            'Корекційний патерн з різкою структурою ABC, де хвиля C зазвичай дорівнює або перевищує хвилю A. Часто зустрічається в хвилях 2 та 4.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Флет',
          description:
            'Горизонтальний корекційний патерн, де хвилі A, B, C мають приблизно рівну довжину. Вказує на баланс сил між покупцями та продавцями.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Трикутник',
          description:
            "Корекційний патерн з п'яти хвиль (A, B, C, D, E), що послідовно звужують ціновий діапазон. Передує сильному руху в напрямку тренду.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фрактальність',
          description:
            'Властивість хвиль Елліотта, при якій кожна хвиля старшого порядку містить повний хвильовий цикл меншого масштабу.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Розширення Фібоначчі',
          description:
            "Інструмент для прогнозування цілей імпульсних хвиль. Рівні 161,8% та 261,8% визначають потенційні точки завершення третьої та п'ятої хвиль.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Третя хвиля',
          description:
            'Найпотужніша та найдовша хвиля в імпульсному циклі. Ніколи не буває найкоротшою серед хвиль 1, 3, 5. Характеризується максимальними обсягами торгів.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Хвильова розмітка',
          description:
            'Процес ідентифікації та позначення хвиль на ціновому графіку згідно з правилами теорії Елліотта. Вимагає дотримання трьох фундаментальних правил.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
