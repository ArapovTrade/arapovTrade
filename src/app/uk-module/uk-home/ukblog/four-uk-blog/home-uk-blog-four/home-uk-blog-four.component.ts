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
  selector: 'app-home-uk-blog-four',
  templateUrl: './home-uk-blog-four.component.html',
  styleUrl: './home-uk-blog-four.component.scss',
})
export class HomeUkBlogFourComponent implements OnInit {
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
      'Маржинальна торгівля без втрат: як уникнути збитків | ArapovTrade'
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Дізнайтеся, як уникнути втрат у маржинальній торгівлі. Управління ризиками, кредитне плече, стоп-лосси, психологія трейдингу та перевірені стратегії.',
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
            'Маржинальна торгівля без втрат: повний посібник з управління ризиками',
          description:
            'Детальний посібник з уникнення втрат у маржинальній торгівлі. Управління капіталом, психологія трейдингу, технічні інструменти та перевірені стратегії.',
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
          dateModified: '2025-12-13T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/avoidlosingmoney',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/reasonfordepositeloose.png',
            width: 1200,
            height: 630,
          },
          articleSection: 'Ризик-менеджмент',
          keywords:
            'маржинальна торгівля, кредитне плече, управління ризиками, стоп-лосс',
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
          name: 'Що таке маржинальна торгівля?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Маржинальна торгівля — це форма торгівлі, при якій трейдер використовує позикові кошти брокера для відкриття позицій, що перевищують його власний капітал. Кредитне плече збільшує як потенційний прибуток, так і ризики збитків.',
          },
        },
        {
          '@type': 'Question',
          name: 'Який ризик допустимий на одну угоду?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Рекомендований ризик на одну угоду становить 1-2% від загального депозиту. Такий підхід дозволяє пережити серію збиткових угод без критичної шкоди для торгового рахунку та зберегти капітал для майбутніх можливостей.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому важливо використовувати стоп-лосси?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Стоп-лосс автоматично закриває позицію при досягненні заданого рівня збитків, захищаючи капітал від значних втрат. Це дозволяє зберігати емоційний контроль та уникати паніки при несприятливому русі ринку.',
          },
        },
        {
          '@type': 'Question',
          name: 'Яке кредитне плече рекомендується для початківців?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Початківцям рекомендується використовувати мінімальне плече 1:2 або 1:3. Високе плече значно збільшує ризики: при плечі 1:20 навіть 5% зміна ціни може призвести до повної ліквідації позиції.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке ліквідація позиції?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ліквідація — це примусове закриття позиції брокером, коли збитки досягають рівня, при якому депозит не може їх покрити. Щоб уникнути ліквідації, важливо залишати достатній запас коштів та використовувати стоп-лосси.',
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
      '@id': 'https://arapov.trade/ua/freestudying/avoidlosingmoney#howto',
      name: 'Як уникнути втрат у маржинальній торгівлі',
      description:
        'Покрокове керівництво з управління ризиками та захисту капіталу при маржинальній торгівлі',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Визначте допустимий рівень ризику',
          text: 'Перед початком торгівлі встановіть, яку частину капіталу ви готові втратити. Рекомендується ризикувати не більше 1-2% депозиту на одну угоду і максимум 5% на день. Це захистить ваш рахунок від розорення при серії збиткових угод.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Встановіть стоп-лоси на кожну позицію',
          text: 'Перед відкриттям позиції заздалегідь визначте рівень стоп-лосу нижче ключових рівнів підтримки. Стоп-лос автоматично закриє позицію при збитку, зберігаючи ваш капітал від подальших втрат.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Використовуйте консервативне кредитне плече',
          text: 'Початківцям трейдерам рекомендується використовувати плече 1:2 або 1:3. Досвідчені трейдери можуть збільшувати плече залежно від волатильності активу та ринкових умов, але уникайте максимального плеча.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Проведіть аналіз перед угодою',
          text: 'Вивчіть технічний аналіз (графіки, рівні підтримки/опору), фундаментальний аналіз (новини, події) та ринковий сентимент. Чим більше даних ви аналізуєте, тим обґрунтованіші ваші рішення.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Диверсифікуйте портфель',
          text: 'Розподіляйте капітал між кількома активами та стратегіями. Ніколи не відкривайте всі позиції по одному інструменту — це зменшить ризик повної втрати при несприятливому русі одного активу.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Зменшуйте позицію при наближенні до ліміту втрат',
          text: 'Якщо за день ви втратили 3-4% депозиту, закрийте решту позицій і припиніть торгівлю. Це запобіжить емоційним рішенням та захистить капітал від критичних збитків.',
        },
        {
          '@type': 'HowToStep',
          position: 7,
          name: 'Ведіть щоденник угод',
          text: 'Записуйте кожну угоду: дату, актив, розмір позиції, причину входу, результат. Аналізуйте помилки та успіхи, щоб постійно вдосконалювати стратегію.',
        },
        {
          '@type': 'HowToStep',
          position: 8,
          name: 'Контролюйте емоції',
          text: 'Маржинальна торгівля вимагає психологічної стійкості. Не відкривайте позиції в поспіху, не збільшуйте плече при збитках і дотримуйтесь свого торгового плану, навіть якщо ринок рухається проти вас.',
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
      name: 'Глосарій маржинальної торгівлі',
      description:
        "Основні терміни та визначення, пов'язані з маржинальною торгівлею та управлінням ризиками",
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Маржинальна торгівля',
          description:
            'Торгівля з використанням позикових коштів брокера, що дозволяє відкривати позиції, які перевищують власний капітал трейдера.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кредитне плече',
          description:
            'Співвідношення позикових коштів до власного капіталу трейдера. Плече 1:10 дозволяє торгувати сумою в 10 разів більшою за депозит.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маржа',
          description:
            'Сума власних коштів трейдера, яка надається як застава для відкриття маржинальної позиції.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ліквідація',
          description:
            'Примусове закриття позиції брокером при досягненні критичного рівня збитків для захисту позикових коштів.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Захисний ордер, що автоматично закриває позицію при досягненні заданого рівня збитків.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тейк-профіт',
          description:
            'Ордер на автоматичне закриття позиції при досягненні цільового рівня прибутку.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Трейлінг-стоп',
          description:
            'Динамічний стоп-лосс, який автоматично переміщується слідом за ціною, фіксуючи прибуток при розвороті.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ризик-менеджмент',
          description:
            'Система управління ризиками, що включає визначення розміру позиції, встановлення стоп-лоссів та диверсифікацію портфеля.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Проковзування',
          description:
            'Різниця між очікуваною та фактичною ціною виконання ордера, що виникає при високій волатильності або низькій ліквідності.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маржин-кол',
          description:
            'Вимога брокера внести додаткові кошти на рахунок для підтримки відкритих позицій при досягненні критичного рівня збитків.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
