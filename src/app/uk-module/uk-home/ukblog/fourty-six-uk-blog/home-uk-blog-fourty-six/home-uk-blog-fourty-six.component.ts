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
  selector: 'app-home-uk-blog-fourty-six',
  templateUrl: './home-uk-blog-fourty-six.component.html',
  styleUrl: './home-uk-blog-fourty-six.component.scss',
})
export class HomeUkBlogFourtySixComponent implements OnInit {
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
      'Bitcoin Pizza Day — перша покупка за біткоїни | Значення та уроки'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Bitcoin Pizza Day — історія першої покупки за біткоїни 22 травня 2010 року. Дізнайтеся, як 10 000 BTC обміняли на дві піци та чому ця дата змінила фінансовий світ.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-27' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/pizzaday.webp',
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
          '@id': 'https://arapov.trade/uk/freestudying/pizzaday#article',
          headline:
            'Bitcoin Pizza Day — перша покупка за біткоїни в історії криптовалют',
          description:
            'Bitcoin Pizza Day — історія першої покупки за біткоїни 22 травня 2010 року. Дізнайтеся, як 10 000 BTC обміняли на дві піци та чому ця дата змінила фінансовий світ.',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-11-29T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/pizzaday',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/pizzaday1.webp',
          },
          articleSection: 'Криптовалюти',
          keywords: [
            'Bitcoin Pizza Day',
            'перша покупка за біткоїни',
            'Ласло Хейніц',
            'історія біткоїна',
            'криптовалюти',
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
      '@id': 'https://arapov.trade/uk/freestudying/pizzaday#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Що таке Bitcoin Pizza Day?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Bitcoin Pizza Day — це пам'ятна дата 22 травня, коли у 2010 році програміст Ласло Хейніц здійснив першу зареєстровану покупку реального товару за біткоїни, обмінявши 10 000 BTC на дві піци.",
          },
        },
        {
          '@type': 'Question',
          name: 'Скільки коштували 10 000 біткоїнів у 2010 році?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'На момент угоди у травні 2010 року 10 000 біткоїнів коштували приблизно 41 долар США. Сьогодні ця сума оцінюється у сотні мільйонів доларів.',
          },
        },
        {
          '@type': 'Question',
          name: 'Хто такий Ласло Хейніц?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ласло Хейніц (Laszlo Hanyecz) — американський програміст угорського походження, який став відомим як людина, що здійснила першу комерційну транзакцію з використанням біткоїна.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому Bitcoin Pizza Day важливий для криптоспільноти?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ця дата символізує перехід біткоїна від теоретичної концепції до практичного застосування. Перша покупка довела, що криптовалюта може функціонувати як реальний засіб обміну.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як відзначають Bitcoin Pizza Day?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Криптоспільнота відзначає 22 травня акціями та знижками від бірж, тематичними зустрічами ентузіастів, обговореннями у соціальних мережах та благодійними ініціативами.',
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
      '@id': 'https://arapov.trade/uk/freestudying/pizzaday#howto',
      name: 'Як застосувати уроки історії Bitcoin Pizza Day',
      description:
        'Покрокова інструкція щодо застосування уроків першої криптовалютної транзакції у вашій інвестиційній стратегії.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Вивчіть історію біткоїна',
          text: 'Ознайомтеся з ключовими подіями розвитку криптовалют, починаючи зі створення біткоїна Сатоші Накамото у 2009 році та першої транзакції у 2010 році.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Оцініть довгостроковий потенціал',
          text: 'Аналізуйте активи не лише за поточною ціною, а й за їхньою потенційною роллю у майбутній економіці. Історія з піцою показує важливість довгострокового мислення.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Керуйте ризиками свідомо',
          text: "Інвестуйте лише ті кошти, які готові втратити. Ранні інвестиції у криптовалюти пов'язані з високою волатильністю.",
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Долучайтеся до спільноти',
          text: 'Приєднуйтеся до криптоспільнот, відвідуйте заходи та обмінюйтеся досвідом з іншими ентузіастами блокчейн-технологій.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Застосовуйте криптовалюти практично',
          text: 'Використовуйте криптовалюти для реальних покупок, щоб краще зрозуміти їхнє функціонування як засобу обміну.',
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
      '@id': 'https://arapov.trade/uk/freestudying/pizzaday#terms',
      name: 'Глосарій термінів Bitcoin Pizza Day',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Bitcoin Pizza Day',
          description:
            "Пам'ятна дата 22 травня, коли у 2010 році було здійснено першу покупку реального товару за біткоїни.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Біткоїн',
          description:
            'Перша децентралізована криптовалюта, створена у 2009 році анонімним розробником під псевдонімом Сатоші Накамото.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Криптовалюта',
          description:
            'Цифровий актив, що використовує криптографію для забезпечення безпеки транзакцій та контролю створення нових одиниць.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Блокчейн',
          description:
            'Розподілена база даних, у якій транзакції записуються у вигляді ланцюжка блоків, забезпечуючи прозорість та незмінність даних.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Майнінг',
          description:
            'Процес створення нових блоків у блокчейні та підтвердження транзакцій з використанням обчислювальних потужностей.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильність',
          description:
            'Ступінь мінливості ціни активу за певний період часу, що характеризує рівень ринкового ризику.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Децентралізація',
          description:
            'Принцип розподілу управління та контролю між багатьма учасниками мережі без єдиного центру влади.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Криптобіржа',
          description:
            'Платформа для купівлі, продажу та обміну криптовалют на фіатні гроші або інші цифрові активи.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Bitcointalk',
          description:
            'Перший великий інтернет-форум, присвячений обговоренню біткоїна та криптовалют, заснований Сатоші Накамото.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'HODL',
          description:
            'Криптовалютний сленг, що означає довгострокове утримання активів незалежно від ринкових коливань.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
