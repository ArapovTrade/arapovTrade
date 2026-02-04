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
  selector: 'app-home-uk-blog-six',
  templateUrl: './home-uk-blog-six.component.html',
  styleUrl: './home-uk-blog-six.component.scss',
})
export class HomeUkBlogSixComponent implements OnInit {
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

    this.ukrGroups = this.artickleServ.getUkrainianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;
    this.titleService.setTitle(
      'Smart Money у трейдингу: як торгують великі гравці | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Smart Money у трейдингу: як великі гравці керують ринком. Дізнайтеся про стратегії інституціоналів, зони ліквідності та методи уникнення маніпуляцій на фінансових ринках.',
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

    this.router.navigate(['/uk/freestudying', nextpage]);
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
          '@id': 'https://arapov.trade/uk/freestudying/smartestmoney#article',
          headline: 'Smart Money у трейдингу: як торгують великі гравці',
          description:
            'Smart Money у трейдингу: як великі гравці керують ринком. Дізнайтеся про стратегії інституціоналів, зони ліквідності та методи уникнення маніпуляцій.',
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/smartestmoney1.webp',
            width: 1200,
            height: 630,
          },
          author: { '@id': 'https://arapov.trade/uk#person' },
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
            '@id': 'https://arapov.trade/uk/freestudying/smartestmoney',
          },
          articleSection: 'Трейдинг',
          keywords: [
            'Smart Money',
            'смарт мані',
            'ліквідність',
            'ордерні блоки',
            'Wyckoff',
          ],
          wordCount: 1380,
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
      '@id': 'https://arapov.trade/uk/freestudying/smartestmoney#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Що означає термін Smart Money?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Smart Money — це кошти професійних учасників ринку: інвестиційних банків, хедж-фондів та маркет-мейкерів. Вони мають доступ до аналітики та ресурсів, що дозволяють впливати на рух ціни.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які методи використовують великі гравці для маніпуляцій?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Інституціонали застосовують хибні пробої, полювання на стоп-лоси та збір ліквідності. Ці тактики дозволяють накопичувати позиції за вигідними цінами перед трендовим рухом.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як визначити ордерний блок на графіку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ордерний блок — остання свічка протилежного напрямку перед імпульсним рухом. Ціна часто повертається до цих зон для тестування перед продовженням руху.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які фази ринку описує метод Wyckoff?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Метод Wyckoff виділяє чотири фази: накопичення (купівля за низькими цінами), зростання (висхідний тренд), розподіл (продаж за високими цінами) та падіння (низхідний тренд).',
          },
        },
        {
          '@type': 'Question',
          name: 'Як захиститися від пасток великих гравців?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Застосовуйте об'ємний аналіз для виявлення хибних пробоїв, чекайте підтвердження перед входом, аналізуйте старші таймфрейми та розміщуйте стоп-лоси на безпечній відстані від очевидних рівнів.",
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
      '@id': 'https://arapov.trade/uk/freestudying/smartestmoney#howto',
      name: 'Як застосовувати концепцію Smart Money у торгівлі',
      description:
        'Покрокове керівництво з використання концепції Smart Money у трейдингу',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Знайдіть зону інтересу',
          text: 'Визначте області високої ліквідності: рівні підтримки та опору, зони скупчення стоп-ордерів, ордерні блоки.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Проаналізуйте поведінку ціни',
          text: "Відстежуйте хибні пробої, аномальні об'єми та реакцію ціни на ключові рівні. Визначте фазу ринку за Wyckoff.",
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Знайдіть підтверджуючий сигнал',
          text: "Використовуйте свічкові патерни, об'ємний аналіз та поведінку ціни на молодших таймфреймах для фільтрації хибних сигналів.",
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Відкрийте позицію',
          text: 'Після підтвердження напрямку руху увійдіть у угоду з чітким планом по стоп-лосу та тейк-профіту.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Керуйте позицією',
          text: 'Фіксуйте прибуток при досягненні цільового рівня або при зміні структури ринку. Дотримуйтесь дисципліни.',
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
      '@id': 'https://arapov.trade/uk/freestudying/smartestmoney#terms',
      name: 'Терміни Smart Money',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Smart Money',
          description:
            'Кошти інституційних учасників ринку: банків, хедж-фондів та маркет-мейкерів, здатних впливати на рух ціни.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ліквідність',
          description:
            'Обсяг доступних ордерів на купівлю та продаж. Зони високої ліквідності приваблюють великих гравців.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ордерний блок',
          description:
            'Остання свічка протилежного напрямку перед імпульсним рухом, що позначає зону входу великого капіталу.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Хибний пробій',
          description:
            'Короткочасний вихід ціни за рівень підтримки або опору з подальшим швидким поверненням.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Дисбаланс',
          description:
            'Різниця між попитом та пропозицією, що проявляється у різкому русі ціни без відкатів.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Накопичення',
          description:
            'Фаза ринку, коли великі гравці приховано купують актив за низькими цінами перед висхідним рухом.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Розподіл',
          description:
            'Фаза ринку, коли інституціонали продають накопичений актив роздрібним трейдерам за високими цінами.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop Hunt',
          description:
            'Полювання на стопи — штучний рух ціни для вибивання стоп-ордерів роздрібних трейдерів.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Методологія Wyckoff',
          description:
            'Концепція аналізу ринку, що описує цикли накопичення та розподілу під впливом великого капіталу.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маркет-мейкер',
          description:
            'Великий учасник ринку, що забезпечує ліквідність та здатний впливати на рух ціни.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
