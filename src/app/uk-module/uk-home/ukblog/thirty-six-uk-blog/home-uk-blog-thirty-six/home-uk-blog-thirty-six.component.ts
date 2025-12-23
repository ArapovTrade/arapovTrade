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
  selector: 'app-home-uk-blog-thirty-six',
  templateUrl: './home-uk-blog-thirty-six.component.html',
  styleUrl: './home-uk-blog-thirty-six.component.scss',
})
export class HomeUkBlogThirtySixComponent implements OnInit {
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
      'Криптовалютний ринок: повний посібник з аналізу та торгівлі | Arapov.trade'
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({
      name: 'description',
      content:
        'Повний посібник з аналізу криптовалютного ринку: технічний та фундаментальний аналіз, торгові стратегії, управління ризиками та вибір платформи.',
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
            '@id': 'https://arapov.trade/uk/freestudying/cryptocurrencytrading',
          },
          headline:
            'Криптовалютний ринок: повний посібник з аналізу та торгівлі | Arapov.trade',
          description:
            'Повний посібник з аналізу криптовалютного ринку: технічний та фундаментальний аналіз, торгові стратегії, управління ризиками та вибір платформи.',
          image:
            'https://arapov.trade/assets/img/content/cryptocurrencytrading.webp',
          datePublished: '2025-08-15T00:00:00+02:00',
          dateModified: '2025-08-15T00:00:00+02:00',
          inLanguage: 'uk',
          author: {
            '@type': 'Person',
            '@id': 'https://arapov.trade/uk#person',
            name: 'Игорь Арапов',
            url: 'https://arapov.trade/uk',
            sameAs: [
              'https://www.youtube.com/@ArapovTrade',
              'https://www.mql5.com/ru/signals/2246716',
            ],
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov.Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          video: {
            '@type': 'VideoObject',
            name: 'Криптовалюты для новичков | Полное руководство',
            description:
              'Полное руководство по криптовалютам для новичков! Объясняю простыми словами что такое крипта, как отличить Bitcoin от СКАМ монет, почему мем-коины опасны и как избежать потери денег.',
            thumbnailUrl: [
              'https://img.youtube.com/vi/T8zWPUOKcqU/maxresdefault.jpg',
              'https://img.youtube.com/vi/T8zWPUOKcqU/hqdefault.jpg',
            ],
            uploadDate: '2025-08-15T00:00:00+02:00',
            duration: 'PT22M8S',
            contentUrl: 'https://www.youtube.com/watch?v=T8zWPUOKcqU',
            embedUrl: 'https://www.youtube.com/embed/T8zWPUOKcqU',
            inLanguage: 'ru',
            keywords:
              'криптовалюты, биткоин, скам монеты, мем коины, риски криптовалют',
            hasPart: [
              {
                '@type': 'Clip',
                name: 'Что такое криптовалюты - определение и основы',
                startOffset: 0,
                endOffset: 292,
                url: 'https://www.youtube.com/watch?v=T8zWPUOKcqU&t=0',
              },
              {
                '@type': 'Clip',
                name: 'Bitcoin - модель эмиссии и преимущества',
                startOffset: 292,
                endOffset: 630,
                url: 'https://www.youtube.com/watch?v=T8zWPUOKcqU&t=292',
              },
              {
                '@type': 'Clip',
                name: 'Что такое СКАМ криптовалюты - признаки мошенничества',
                startOffset: 630,
                endOffset: 786,
                url: 'https://www.youtube.com/watch?v=T8zWPUOKcqU&t=630',
              },
              {
                '@type': 'Clip',
                name: 'Мем-коины и ловушки для трейдеров',
                startOffset: 786,
                endOffset: 976,
                url: 'https://www.youtube.com/watch?v=T8zWPUOKcqU&t=786',
              },
              {
                '@type': 'Clip',
                name: 'Делистинг монет - как биржи выкидывают скам',
                startOffset: 976,
                endOffset: 1089,
                url: 'https://www.youtube.com/watch?v=T8zWPUOKcqU&t=976',
              },
              {
                '@type': 'Clip',
                name: 'Как защитить деньги на крипторынке',
                startOffset: 1089,
                endOffset: 1328,
                url: 'https://www.youtube.com/watch?v=T8zWPUOKcqU&t=1089',
              },
            ],
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
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Що таке криптовалютний ринок?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Криптовалютний ринок — це глобальна децентралізована екосистема цифрових активів на базі блокчейн. Працює цілодобово, дозволяючи торгувати без посередників.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які методи аналізу криптовалют існують?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основні методи: фундаментальний аналіз (технологія, команда, токеноміка), технічний аналіз (індикатори, рівні) та сентимент-аналіз (настрої ринку).',
          },
        },
        {
          '@type': 'Question',
          name: 'Як керувати ризиками при торгівлі криптовалютами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ключові принципи: стоп-лоси, ризик на угоду до 1-2% капіталу, диверсифікація портфеля та емоційна дисципліна.',
          },
        },
        {
          '@type': 'Question',
          name: 'Яку стратегію обрати початківцю?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Рекомендується стратегія довгострокового інвестування з усередненням вартості (DCA), що знижує вплив волатильності.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як обрати криптовалютну біржу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Враховуйте: безпеку (2FA, холодне зберігання), ліквідність, комісії та зручність інтерфейсу.',
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
      name: 'Як почати торгувати криптовалютами',
      description: 'Покроковий посібник для трейдерів-початківців',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Вивчіть основи',
          text: 'Опануйте принципи блокчейну, основні криптовалюти та термінологію ринку.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Оберіть біржу',
          text: 'Зареєструйтесь на перевіреній платформі з 2FA та високою ліквідністю.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Розробіть стратегію',
          text: 'Визначте цілі, рівень ризику та стиль торгівлі.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Налаштуйте ризик-менеджмент',
          text: 'Встановіть стоп-лоси та диверсифікуйте портфель.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Практикуйтесь',
          text: 'Почніть з невеликих сум та ведіть торговий журнал.',
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
      name: 'Глосарій криптотрейдингу',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Блокчейн',
          description: 'Розподілений реєстр транзакцій криптовалюти',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильність',
          description: 'Ступінь мінливості ціни активу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лос',
          description: 'Ордер на закриття позиції при збитку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ліквідність',
          description: 'Здатність активу швидко продаватися без впливу на ціну',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Холодний гаманець',
          description: 'Зберігання криптовалют офлайн для безпеки',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Халвінг',
          description: 'Скорочення винагороди майнерів удвічі',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Альтсезон',
          description: 'Період випереджаючого зростання альткоїнів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'DeFi',
          description: 'Децентралізовані фінанси на блокчейні',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стейблкоїн',
          description: "Криптовалюта з прив'язкою до долара",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Смарт-контракт',
          description: 'Самовиконуваний код на блокчейні',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
