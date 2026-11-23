document.documentElement.classList.add('js');
    try {
      const saved = localStorage.getItem('theme');
      const preferred = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
      document.documentElement.dataset.theme = saved || preferred;
    } catch (_) { document.documentElement.dataset.theme = 'dark'; }

document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
      const menuButton = document.getElementById('menuToggle');
      const navLinks = document.getElementById('navLinks');
      const topbar = document.getElementById('topbar');
      const settingsToggle = document.getElementById('settingsToggle');
      const settingsPanel = document.getElementById('settingsPanel');
      const settingsBackdrop = document.getElementById('settingsBackdrop');
      const settingsClose = document.getElementById('settingsClose');
  
      function setTheme(theme) {
        root.dataset.theme = theme;
        try { localStorage.setItem('theme', theme); } catch (_) {}
        document.querySelectorAll('[data-theme-choice]').forEach(button => {
          const active = button.dataset.themeChoice === theme;
          button.classList.toggle('active', active);
          button.setAttribute('aria-pressed', String(active));
        });
      }
      const translations = {
        '.skip-link': ['本文へスキップ', 'Skip to content'],
        '.hero .eyebrow': ['Student · Creator · Curious mind'],
        '.hero-lead': [
          '<strong>興味を知識に、知識を制作へ。</strong><br>AI・プログラミング・数学・国際情勢。気になったことを調べ、仕組みを理解し、自分の手で形にする過程を記録するポートフォリオです。',
          '<strong>Turn curiosity into knowledge, and knowledge into creation.</strong><br>A portfolio documenting how I explore AI, programming, mathematics, and world affairs — learning how things work and turning ideas into something real.'
        ],
        '.hero-actions .button.primary': [
          '制作・研究を見る <span aria-hidden="true">↘</span>',
          'Explore Projects <span aria-hidden="true">↘</span>'
        ],
        '.hero-foot': ['PORTFOLIO / 2026 — KEEP EXPLORING'],
        '.about-copy p': [
          '兵庫県の高校に通う学生です。数学や世界史が好きで、物事を一つの見方だけで決めつけず、背景や仕組みを考えることに関心があります。',
          '最近は<strong>AI・プログラミング・情報技術</strong>への興味が強くなり、HTML/CSS/JavaScriptでのWeb制作や、Google ColabとHugging Faceを使ったAIモデルの実験に取り組んでいます。',
          'また、国際情勢や安全保障、数学・科学の歴史、SFの世界観づくりにも関心があります。文房具、とくに筆記具を集めることも好きです。'
        ],
        '.principle': [
          '知るだけで終わらせず、調べる・試す・作る・振り返る。',
          'Go beyond knowing: explore, experiment, create, and reflect.'
        ],
        '.fact span': [
          'TECHNOLOGY', 'LOGIC & PROOFS', 'PAST & SOCIETY', 'IMAGINATION'
        ],
        '#projects .section-intro': [
          '完成したものだけでなく、試行錯誤の途中にある制作・研究も掲載しています。進捗は変化に合わせて更新していきます。',
          'This portfolio features works in progress as well as completed projects. I update each entry as it develops.'
        ],
        '.card .tag': [
          'AI EXPERIMENT', 'WEB DEVELOPMENT', 'RESEARCH', 'WORLD BUILDING', 'RESEARCH NOTES', 'ENGINEERING INTEREST'
        ],
        '.card .status': [
          'EXPLORING', 'IN PROGRESS', 'IN PROGRESS', 'ONGOING IDEA', 'LEARNING', 'LEARNING THE BASICS'
        ],
        '.card h3': [
          'Yuma AI — Personal AI Experiment',
          'Personal Website',
          '人間っぽいAI、AIっぽい人間！？',
          'Xeros — Worldbuilding Universe',
          'Geopolitics Research Notes',
          '故障診断と原因の切り分け'
        ],
        '.card p': [
          'Google ColabとHugging Faceを使ってAIモデルを動かし、応答やカスタマイズの可能性を試す実験。将来的には自分のWebサイトとの連携も検討しています。',
          'GitHub Pagesで公開しているポートフォリオ。HTML/CSS/JavaScriptを使い、情報設計からデザイン、実装、改善まで自分で進めています。',
          'AIと人間の文章表現はどのように似ていくのか。文章の特徴や相互作用に注目し、問いを立てて調査・発表する探究活動です。',
          '超生命体Xerosと惑星Glaevaを中心に、独自の設定や歴史を組み立てるSF世界観プロジェクト。',
          '台湾海峡、朝鮮半島、日本の安全保障など、国際情勢に関する情報を集め、複数の視点から整理する個人学習。',
          '身近なデジタル機器の不具合をきっかけに、ソフトウェアとハードウェアの違い、仮説の立て方、検証の進め方に関心を持ちました。'
        ],
        '#research .section-intro': [
          '答えを覚えるだけでなく、「なぜそうなるのか」「別の見方はできないか」を考えるためのテーマです。',
          'These are topics that encourage me to ask not only what the answer is, but why it is so and whether there are other ways to look at it.'
        ],
        '.research-main .tag': ['CURRENT RESEARCH'],
        '.research-main h3': [
          'AIと人間の文章表現は、互いにどのような影響を与えるのか？',
          'How do AI and human writing styles influence one another?'
        ],
        '.research-main p': [
          '生成AIの文章を人間はどう受け取り、人間の書き方はAIの普及によってどう変わるのか。文章の特徴を比較しながら、AIと人間の関係を考えています。調査・分析の進展に合わせて内容を更新します。',
          'How do people perceive AI-generated writing, and how is human writing changing as AI becomes widespread? By comparing features of written texts, I explore the relationship between AI and people. This section will evolve as the research progresses.'
        ],
        '.research-side h3': ['AIと社会', '国際情勢・安全保障', '数学・科学・宇宙'],
        '.research-side p': [
          '生成AIの進歩、AIエージェント、教育や情報格差、社会への影響。',
          '国際関係、紛争、地政学、日本を取り巻く安全保障環境。',
          '数学が発展してきた歴史、証明、科学技術の新しい動向。'
        ],
        '#learning .section-intro': [
          '学習した内容を、実際の制作や説明に結びつけることを大切にしています。',
          'I value connecting what I learn to practical projects and clear explanations.'
        ],
        '.learning-step b': ['問いを立てる', '調べて理解する', '試して作る', '記録して改善'],
        '.learning-step span': [
          '何が分からないのかを明確にする',
          '資料・歴史・仕組みを確認する',
          '演習・実験・プログラムで確かめる',
          '結果と課題を次の学びにつなげる'
        ],
        '.topic-list span': [
          'HTML / CSS', 'JavaScript', 'Python', '生成AI・LLM',
          '数学史・証明', '世界史', '国際情勢', '韓国語'
        ],
        '#journal .section-intro': [
          '学びの途中で気づいたことや、今後深めたい問いを残す場所です。ここでは、これまでの会話や取り組みから確認できる関心を出発点として整理しています。',
          'A space for recording discoveries along the way and questions I want to explore further. These entries reflect interests that have emerged through my learning and projects.'
        ],
        '.journal-item .label': ['ENGINEERING', 'AI EXPERIMENT', 'MATHEMATICS'],
        '.journal-item h3': [
          '不具合の原因を考えることも、ものづくりの入口',
          'AIモデルを自分の環境で動かしてみる',
          '数学を、発見の歴史から理解したい'
        ],
        '.journal-item p': [
          '機器の問題をきっかけに、症状だけで判断せず、原因を仮定して切り分ける考え方に興味を持った。',
          'モデルを実際に動かすことで、AIを使う側から、仕組みを理解して作る側へ関心が広がった。',
          '公式を覚えるだけでなく、人類がどのような問題に出会い、考え方を発展させてきたのかを追って学びたい。'
        ],
        '.contact-panel h3': ["Let's keep exploring."],
        '.contact-panel p': ['制作物やコードはGitHubにまとめています。', 'My projects and code are collected on GitHub.'],
        '.footer-inner span': ['© 2026 Yuma Eto', '© 2026 Yuma Eto']
      };
  
      const englishTranslations = {
        '.skip-link': ['Skip to content'],
        '.hero .eyebrow': ['Student · Creator · Curious mind'],
        '.hero-lead': ['<strong>Turn curiosity into knowledge, and knowledge into creation.</strong><br>A portfolio documenting how I explore AI, programming, mathematics, and world affairs — learning how things work and turning ideas into something real.'],
        '.hero-actions .button.primary': ['Explore Projects <span aria-hidden="true">↘</span>'],
        '.hero-foot': ['PORTFOLIO / 2026 — KEEP EXPLORING'],
        '.about-copy p': [
          'I am a high school student in Hyogo, Japan. I enjoy mathematics and world history, and I like exploring the backgrounds and systems behind things rather than looking at them from just one perspective.',
          'Recently, I have become especially interested in <strong>AI, programming, and information technology</strong>. I build websites with HTML, CSS, and JavaScript, and experiment with AI models using Google Colab and Hugging Face.',
          'I am also interested in international affairs, security, the history of mathematics and science, and science-fiction worldbuilding. I enjoy collecting stationery, especially writing instruments.'
        ],
        '.principle': ['Go beyond knowing: explore, experiment, create, and reflect.'],
        '#projects .section-intro': ['This portfolio features works in progress as well as completed projects. I update each entry as it develops.'],
        '.card .tag': ['AI EXPERIMENT', 'WEB DEVELOPMENT', 'RESEARCH', 'WORLDBUILDING', 'RESEARCH NOTES', 'ENGINEERING INTEREST'],
        '.card .status': ['EXPLORING', 'IN PROGRESS', 'IN PROGRESS', 'ONGOING IDEA', 'LEARNING', 'LEARNING THE BASICS'],
        '.card h3': [
          'Yuma AI — Personal AI Experiment',
          'Personal Website',
          'Human-like AI, AI-like Humans!?',
          'Xeros — Worldbuilding Universe',
          'Geopolitics Research Notes',
          'Troubleshooting and Root Cause Analysis'
        ],
        '.card p': [
          'An experiment using Google Colab and Hugging Face to run AI models and explore their responses and customization. I am also considering connecting the model to my own website in the future.',
          'A portfolio published with GitHub Pages. I work on its information architecture, design, implementation, and improvements using HTML, CSS, and JavaScript.',
          'How are AI-generated and human-written texts becoming similar? This research project explores writing characteristics and interaction through investigation and presentation.',
          'A science-fiction universe built around the super-organism Xeros and the planet Glaeva, with original settings and history.',
          'Independent study of international affairs, including the Taiwan Strait, the Korean Peninsula, and Japan’s security environment, organized from multiple perspectives.',
          'A malfunction in a familiar digital device sparked my interest in the differences between software and hardware, forming hypotheses, and testing possible causes.'
        ],
        '#research .section-intro': ['Topics that encourage me to ask not only what the answer is, but why it is so and whether there are other ways to look at it.'],
        '.research-main .tag': ['CURRENT RESEARCH'],
        '.research-main h3': ['How do AI and human writing styles influence one another?'],
        '.research-main p': ['How do people perceive AI-generated writing, and how is human writing changing as AI becomes widespread? By comparing features of written texts, I explore the relationship between AI and people. This section will evolve as the research progresses.'],
        '.research-side h3': ['AI and Society', 'International Affairs and Security', 'Mathematics, Science, and Space'],
        '.research-side p': [
          'Advances in generative AI, AI agents, education, information inequality, and their effects on society.',
          'International relations, conflicts, geopolitics, and the security environment surrounding Japan.',
          'The history of mathematics, mathematical proofs, and emerging developments in science and technology.'
        ],
        '#learning .section-intro': ['I value connecting what I learn to practical projects and clear explanations.'],
        '.learning-step b': ['Ask a Question', 'Research and Understand', 'Experiment and Build', 'Reflect and Improve'],
        '.learning-step span': [
          'Clarify what I want to understand',
          'Explore sources, history, and underlying systems',
          'Test ideas through exercises, experiments, and code',
          'Use results and challenges to guide the next step'
        ],
        '#journal .section-intro': ['A space for recording discoveries along the way and questions I want to explore further. These entries reflect interests that have emerged through my learning and projects.'],
        '.journal-item .label': ['ENGINEERING', 'AI EXPERIMENT', 'MATHEMATICS'],
        '.journal-item h3': [
          'Understanding failures can be the starting point of engineering',
          'Running an AI model in my own environment',
          'Understanding mathematics through the history of discovery'
        ],
        '.journal-item p': [
          'A device issue sparked my interest in diagnosing problems by forming hypotheses and isolating possible causes instead of judging by symptoms alone.',
          'Running a model myself expanded my interest from using AI to understanding how it works and learning how to build with it.',
          'Rather than only memorizing formulas, I want to explore the problems people encountered and how mathematical ideas developed over time.'
        ],
        '.contact-panel h3': ['Let’s keep exploring.'],
        '.contact-panel p': ['My projects and code are collected on GitHub.']
      };
  
      function applyTranslations(language) {
        const english = language === 'en';
        Object.entries(translations).forEach(([selector, japaneseValues]) => {
          const values = english ? (englishTranslations[selector] || japaneseValues) : japaneseValues;
          document.querySelectorAll(selector).forEach((node, index) => {
            const value = values[index];
            if (value === undefined) return;
            if (selector === '.hero-lead' || selector === '.hero-actions .button.primary' || selector === '.about-copy p') {
              node.innerHTML = value;
            } else {
              node.textContent = value;
            }
          });
        });
        // Content that is intentionally identical in both languages remains unchanged.
        document.querySelectorAll('.fact span').forEach((node, index) => {
          node.textContent = ['TECHNOLOGY', 'LOGIC & PROOFS', 'PAST & SOCIETY', 'IMAGINATION'][index];
        });
        document.querySelectorAll('.topic-list span').forEach((node, index) => {
          const japanese = ['HTML / CSS', 'JavaScript', 'Python', '生成AI・LLM', '数学史・証明', '世界史', '国際情勢', '韓国語'];
          const english = ['HTML / CSS', 'JavaScript', 'Python', 'Generative AI / LLMs', 'History of Mathematics / Proofs', 'World History', 'International Affairs', 'Korean'];
          node.textContent = (language === 'en' ? english : japanese)[index];
        });
        document.querySelectorAll('.card .card-meta').forEach((meta, index) => {
          const english = [
            ['Python', 'Hugging Face', 'LLM'],
            ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
            ['Generative AI', 'Writing', 'Research'],
            ['Sci-Fi', 'Writing', 'Worldbuilding'],
            ['Geopolitics', 'History', 'Security'],
            ['Troubleshooting', 'Systems', 'Engineering']
          ];
          const japanese = [
            ['Python', 'Hugging Face', 'LLM'],
            ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
            ['Generative AI', 'Writing', 'Research'],
            ['Sci-Fi', 'Writing', 'Worldbuilding'],
            ['Geopolitics', 'History', 'Security'],
            ['Troubleshooting', 'Systems', 'Engineering']
          ];
          meta.querySelectorAll('span').forEach((span, i) => {
            span.textContent = (language === 'en' ? english : japanese)[index][i] || span.textContent;
          });
        });
      }
      function setLanguage(language) {
        const english = language === 'en';
        root.lang = english ? 'en' : 'ja';
        root.dataset.language = language;
        try { localStorage.setItem('language', language); } catch (_) {}
        document.querySelectorAll('[data-language-choice]').forEach(button => {
          const active = button.dataset.languageChoice === language;
          button.classList.toggle('active', active);
          button.setAttribute('aria-pressed', String(active));
        });
        const labels = english
          ? ['About','Projects','Research','Learning','Journal']
          : ['プロフィール','制作','研究・関心','学習','ジャーナル'];
        navLinks.querySelectorAll('a').forEach((link,index) => { link.textContent = labels[index]; });
        applyTranslations(language);
        document.querySelector('.skip-link').textContent = english ? 'Skip to content' : '本文へスキップ';
        document.querySelector('nav').setAttribute('aria-label', english ? 'Main navigation' : 'メインナビゲーション');
        document.querySelector('.brand').setAttribute('aria-label', english ? 'Home' : 'ホーム');
        document.querySelector('.topic-list').setAttribute('aria-label', english ? 'Learning topics' : '学習テーマ');
        settingsToggle.setAttribute('aria-label', english ? 'Open settings' : '設定を開く');
        settingsClose.setAttribute('aria-label', english ? 'Close settings' : '設定を閉じる');
        menuButton.setAttribute('aria-label', english ? 'Open menu' : 'メニューを開く');
        document.querySelector('.settings-kicker').textContent = 'PREFERENCES';
        document.getElementById('settingsTitle').textContent = 'Settings';
        document.getElementById('themeLabel').textContent = 'Theme';
        document.getElementById('languageLabel').textContent = 'Language';
        document.querySelectorAll('.setting-options')[0].setAttribute('aria-label', 'Theme');
        document.querySelectorAll('.setting-options')[1].setAttribute('aria-label', 'Language');
        document.querySelector('.settings-footer').innerHTML = 'YUMA ETO <span>·</span> SETTINGS';
        document.querySelector('.hero-actions .button.secondary').innerHTML = 'GitHub <span aria-hidden="true">↗</span>';
        document.querySelector('.contact-panel .button').textContent = 'GitHub Profile ↗';
        document.querySelector('meta[name="description"]').setAttribute('content', english
          ? 'Turn curiosity into knowledge and knowledge into creation. A portfolio exploring AI, programming, mathematics, and world affairs.'
          : '興味を知識に、知識を制作へ。AI・プログラミング・数学・国際情勢について学び、考え、形にするポートフォリオ。');
        document.title = english ? 'Yuma Eto — Curiosity to Creation' : 'Yuma Eto — Curiosity to Creation';
      }
      function openSettings() {
        settingsBackdrop.hidden = false;
        requestAnimationFrame(() => settingsPanel.classList.add('open'));
        settingsPanel.setAttribute('aria-hidden','false');
        settingsToggle.setAttribute('aria-expanded','true');
        document.body.classList.add('settings-open');
        settingsClose.focus();
      }
      function closeSettings() {
        settingsPanel.classList.remove('open');
        settingsPanel.setAttribute('aria-hidden','true');
        settingsToggle.setAttribute('aria-expanded','false');
        document.body.classList.remove('settings-open');
        window.setTimeout(() => { settingsBackdrop.hidden = true; }, 380);
        settingsToggle.focus();
      }
      settingsToggle.addEventListener('click', openSettings);
      settingsClose.addEventListener('click', closeSettings);
      settingsBackdrop.addEventListener('click', closeSettings);
      document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && settingsPanel.classList.contains('open')) closeSettings();
      });
      document.querySelectorAll('[data-theme-choice]').forEach(button => button.addEventListener('click', () => setTheme(button.dataset.themeChoice)));
      document.querySelectorAll('[data-language-choice]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.languageChoice)));
      let savedTheme = 'dark', savedLanguage = 'ja';
      try { savedTheme = localStorage.getItem('theme') || root.dataset.theme || 'dark'; savedLanguage = localStorage.getItem('language') || 'ja'; } catch (_) {}
      setTheme(savedTheme);
      setLanguage(savedLanguage);
  
      menuButton.addEventListener('click', () => {
        const open = menuButton.getAttribute('aria-expanded') !== 'true';
        menuButton.setAttribute('aria-expanded', String(open));
        menuButton.setAttribute('aria-label', root.lang === 'en' ? (open ? 'Close menu' : 'Open menu') : (open ? 'メニューを閉じる' : 'メニューを開く'));
        menuButton.textContent = open ? '×' : '☰';
        navLinks.classList.toggle('open', open);
      });
      navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', root.lang === 'en' ? 'Open menu' : 'メニューを開く');
        menuButton.textContent = '☰';
      }));
  
      function onScroll() { topbar.classList.toggle('scrolled', window.scrollY > 24); }
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
  
      if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.12 });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
      } else {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
      }
});
