import { Component, OnInit,ChangeDetectorRef,Inject,Renderer2, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ThemeservService } from '../../../../../servises/themeserv.service';
import { artickle } from '../../../../../servises/articles.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-fifty-one',
  templateUrl: './home-uk-blog-fifty-one.component.html',
  styleUrl: './home-uk-blog-fifty-one.component.scss',
})
export class HomeUkBlogFiftyOneComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private cdr:ChangeDetectorRef,
  private router: Router,
    private themeService:ThemeservService,
    private artickleServ: ArticlesService,private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}
   private routerSubscription!: Subscription;
 private themeSubscription!: Subscription;
  isDark!:boolean  ;
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


     this.themeSubscription =this.themeService.getTheme().subscribe(data=>{
      this.isDark=data;
        this.cdr.detectChanges();
    })
    
 this.ukrGroups = this.artickleServ.getUkrainianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;
    this.titleService.setTitle('Price Action у трейдингу: повний посібник | ArapovTrade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Дізнайтеся, як використовувати метод Price Action у трейдингу. Свічкові патерни, рівні підтримки та опору, стратегії торгівлі без індикаторів.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-17' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/candlestickpatterns.webp',
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
    { title: 'Вступ до трейдингу', link: 'https://arapov.education/ua/reg-workshop-ua/' },
    { title: 'Професійні курси', link: 'https://arapov.trade/uk/studying' },
    { title: 'Базовий курс', link: 'https://arapov.trade/uk/freestudying/freeeducation' },
    { title: 'Копiтрейдинг', link: 'https://arapovcopytrade.com/ua/invest-ua/' },
  ];
  
  
  
   
    onGroupChange(event: Event) {
       
     
       const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;
    
      this.router.navigate(['/uk/freestudying'], {
      queryParams: { group: value }
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
        this.themeService.setTheme(this.isDark)
         
         
    
    
      }
    
       
       
      navigateTo(path: string) {
        this.router.navigate([path]);
      }
  
  
  
      articleCounts: { [key: string]: number } = {};
      updateArticleCounts() {
    this.articleCounts = {}; // очищаем
  
    this.artickleServ.ukrArtickles.forEach(article => {
      // article.groupsUkr — это массив, например ['Програмування', 'Маркетинг']
      article.groupsUkr.forEach(group => {
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
      const shuffled = [...this.artickleServ.ukrArtickles].sort(() => Math.random() - 0.5);
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
    const filtered = this.artickleServ.ukrArtickles.filter(a =>
      a.titleUkr.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.displayedArticles = filtered.slice(0, this.maxResults);
  }
  
  moveToTheTop(){
    const element = document.getElementById('scrollToTop');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  
  groupsMenuOpen = false;
     toggleGroupsMenu(event: Event) {
      
      this.groupsMenuOpen = !this.groupsMenuOpen;
    }

    goToNextPage(){
      let nextpage:any;
      const path:string=this.router.url.split('/')[this.router.url.split('/').length-1];
      let index=this.artickleServ.ukrArtickles.findIndex(a=>a.linkUkr==path);
     
      if(this.artickleServ.ukrArtickles.length-1==index){
      nextpage=this.artickleServ.ukrArtickles[0].linkUkr;
      }else{
        nextpage=this.artickleServ.ukrArtickles[index+1].linkUkr;
      }
      
       
       this.router.navigate(['/uk/freestudying', nextpage] )
      
    }



    goToPreviousPage(){
      let nextpage:any;
      const path:string=this.router.url.split('/')[this.router.url.split('/').length-1];
      let index=this.artickleServ.ukrArtickles.findIndex(a=>a.linkUkr==path);
     
      if(index==1){
      nextpage=this.artickleServ.ukrArtickles[this.artickleServ.ukrArtickles.length-1].linkUkr;
      }else{
        nextpage=this.artickleServ.ukrArtickles[index-1].linkUkr;
      }
      
         
       this.router.navigate(['/uk/freestudying', nextpage] )
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
      const candidates = json['@graph'] ?? (Array.isArray(json) ? json : [json]);

      const shouldRemove = candidates.some((entry: any) =>
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
      "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Price Action у трейдингу: повний посібник з торгівлі без індикаторів",
            "description": "Детальний посібник з методу Price Action. Свічкові патерни (пін-бар, поглинання, внутрішній бар), рівні підтримки та опору, стратегії торгівлі на чистих графіках.",
            "author": {
                "@type": "Person",
                "name": "Ігор Арапов",
                "url": "https://arapov.trade/uk",
                "description": "Професійний трейдер з 2013 року. Спеціаліст зі Smart Money, методу Вайкоффа та об'ємного аналізу.",
                "sameAs": [
                    "https://www.youtube.com/@ArapovTrade"
                ]
            },
            "publisher": {
                "@type": "Organization",
                "name": "ArapovTrade",
                "url": "https://arapov.trade",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://arapov.trade/assets/img/favicon.ico"
                }
            },
            "datePublished": "2025-01-15",
            "dateModified": "2025-06-04",
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://arapov.trade/uk/freestudying/candlestickpatterns"
            },
            "image": {
                "@type": "ImageObject",
                "url": "https://arapov.trade/assets/img/content/priceaction1.png",
                "width": 1200,
                "height": 630
            },
            "articleSection": "Технічний аналіз",
            "keywords": "Price Action, свічкові патерни, пін-бар, поглинання, трейдинг",
            "inLanguage": "uk"
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
  '@id': 'https://arapov.trade/#person',
  name: 'Ігор Арапов',
  url: 'https://arapov.trade/uk',
  image: 'https://arapov.trade/assets/redesignArapovTrade/img/imageAuthor-light.png',
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
       "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Що таке Price Action у трейдингу?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Price Action — це метод технічного аналізу, заснований на вивченні руху ціни без використання індикаторів. Трейдери аналізують чисті цінові графіки, свічкові патерни, рівні підтримки та опору для прийняття торгових рішень. Метод допомагає зрозуміти психологію ринку та дії великих гравців."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Які основні патерни Price Action існують?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Основні патерни Price Action включають: пін-бар (свічка з довгою тінню, що сигналізує про розворот), поглинання (свічка повністю перекриває попередню), внутрішній бар (свічка всередині діапазону попередньої), доджі (нерішучість ринку). Ці патерни найбільш ефективні на ключових рівнях підтримки та опору."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Як визначити рівні підтримки та опору?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Рівні підтримки та опору визначаються за історичними точками, де ціна багаторазово розверталася або консолідувалася. Підтримка — зона, де покупці зупиняють падіння ціни. Опір — зона, де продавці перешкоджають зростанню. Значущі рівні підтверджуються множинними дотиками та високими обсягами торгів."
                    }
                },
                {
                    "@type": "Question",
                    "name": "У чому переваги торгівлі за Price Action?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Переваги Price Action: простота аналізу без складних індикаторів, універсальність для будь-яких ринків та таймфреймів, розуміння психології учасників ринку, відсутність запізнення сигналів (на відміну від індикаторів), можливість бачити дії великих гравців через свічкові формації."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Як уникнути хибних сигналів Price Action?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Для фільтрації хибних сигналів: торгуйте патерни лише на значущих рівнях підтримки/опору, чекайте закриття сигнальної свічки, аналізуйте контекст (тренд, волатильність), використовуйте підтвердження обсягами, уникайте торгівлі під час важливих новин, комбінуйте кілька таймфреймів для аналізу."
                    }
                }
            ]
    };

    this.addJsonLdSchema(data);
  }

  // ============================================================
  //  HOWTO
  // ============================================================
  private setHowToSchema(): void {
    const data = {
      "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "Як торгувати за методом Price Action",
            "description": "Покроковий посібник із застосування Price Action для прибуткової торгівлі на фінансових ринках.",
            "step": [
                {
                    "@type": "HowToStep",
                    "position": 1,
                    "name": "Визначте ключові рівні на графіку",
                    "text": "Знайдіть значущі зони підтримки та опору, де ціна багаторазово розверталася в минулому. Позначайте рівні на старшому таймфреймі (денний або тижневий) для визначення глобальної структури ринку."
                },
                {
                    "@type": "HowToStep",
                    "position": 2,
                    "name": "Визначте напрямок тренду",
                    "text": "Проаналізуйте структуру максимумів та мінімумів. Висхідний тренд характеризується вищими максимумами та мінімумами. Низхідний — нижчими. Торгуйте в напрямку основного тренду для підвищення ймовірності успіху."
                },
                {
                    "@type": "HowToStep",
                    "position": 3,
                    "name": "Дочекайтеся формування патерну",
                    "text": "Шукайте свічкові патерни (пін-бар, поглинання, внутрішній бар) на ключових рівнях. Патерн має повністю сформуватися — дочекайтеся закриття сигнальної свічки перед прийняттям рішення про вхід."
                },
                {
                    "@type": "HowToStep",
                    "position": 4,
                    "name": "Проаналізуйте контекст сигналу",
                    "text": "Оцініть ринкові умови: сила тренду, волатильність, новинний фон. Сигнал пін-бару в напрямку тренду надійніший за контртрендовий. Перевірте економічний календар на наявність важливих подій."
                },
                {
                    "@type": "HowToStep",
                    "position": 5,
                    "name": "Встановіть стоп-лосс та ціль прибутку",
                    "text": "Розмістіть стоп-лосс за екстремум патерну або за ключовий рівень. Визначте ціль прибутку на найближчому рівні опору або підтримки. Співвідношення ризику до прибутку має бути мінімум 1:2."
                }
            ]
    };

    this.addJsonLdSchema(data);
  }

  // ============================================================
  //  GLOSSARY
  // ============================================================
  private setGlossarySchema(): void {
    const data = {
       "@context": "https://schema.org",
            "@type": "DefinedTermSet",
            "name": "Глосарій термінів Price Action",
            "description": "Основні терміни та визначення методу Price Action у технічному аналізі",
            "definedTerm": [
                {
                    "@type": "DefinedTerm",
                    "name": "Price Action",
                    "description": "Метод технічного аналізу, заснований на вивченні руху ціни без використання індикаторів, аналізуючи чисті цінові графіки."
                },
                {
                    "@type": "DefinedTerm",
                    "name": "Пін-бар (Pin Bar)",
                    "description": "Свічковий патерн з довгою тінню та маленьким тілом, що сигналізує про розворот ціни та відторгнення певного цінового рівня ринком."
                },
                {
                    "@type": "DefinedTerm",
                    "name": "Поглинання (Engulfing)",
                    "description": "Патерн з двох свічок, де друга свічка повністю перекриває тіло першої, вказуючи на зміну ринкових настроїв."
                },
                {
                    "@type": "DefinedTerm",
                    "name": "Внутрішній бар (Inside Bar)",
                    "description": "Свічка, діапазон якої повністю знаходиться всередині діапазону попередньої материнської свічки, що сигналізує про консолідацію перед пробоєм."
                },
                {
                    "@type": "DefinedTerm",
                    "name": "Рівень підтримки",
                    "description": "Цінова зона, де попит перевищує пропозицію і покупці зупиняють падіння ціни, викликаючи відскок вгору."
                },
                {
                    "@type": "DefinedTerm",
                    "name": "Рівень опору",
                    "description": "Цінова зона, де пропозиція перевищує попит і продавці зупиняють зростання ціни, викликаючи відскок вниз."
                },
                {
                    "@type": "DefinedTerm",
                    "name": "Доджі (Doji)",
                    "description": "Свічка з дуже маленьким тілом, де ціни відкриття та закриття майже збігаються, що вказує на нерішучість ринку."
                },
                {
                    "@type": "DefinedTerm",
                    "name": "Фейковий пробій (False Breakout)",
                    "description": "Ситуація, коли ціна пробиває рівень, але швидко повертається назад, заманюючи трейдерів у пастку."
                },
                {
                    "@type": "DefinedTerm",
                    "name": "Свінг-хай та Свінг-лоу",
                    "description": "Локальні максимуми та мінімуми на графіку, що використовуються для визначення структури тренду та ключових розворотних точок."
                },
                {
                    "@type": "DefinedTerm",
                    "name": "Чистий графік",
                    "description": "Ціновий графік без технічних індикаторів, що відображає лише свічки або бари та використовується в методі Price Action."
                }
            ]
    };

    this.addJsonLdSchema(data);
  }
}
