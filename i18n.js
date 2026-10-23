/* 翻訳データ — 日本語の基本データは projects.js。ここは UI 文言と各言語の差し替え分のみ */
window.I18N = {
  langs: [
    { code: "ja", label: "日本語" },
    { code: "en", label: "English" },
    { code: "zh-CN", label: "简体中文" }
  ],
  defaultLang: "ja",

  ui: {
    ja: {
      sep: "｜", metaDesc: "KenzyaKato（犬者カト）のポートフォリオ。Unity・VTuber 技術制作。",
      skip: "本文へスキップ", homeAria: "KenzyaKato ホーム", menuAria: "メニュー", navAria: "メイン",
      navHome: "ホーム", navRecent: "最近の制作", navTech: "技術ケース", navWorks: "参加作品・制作実績", navAbout: "プロフィール・連絡",
      channel: "個人チャンネル", motionTitle: "アニメーションを減らす", motionFull: "標準", motionReduced: "抑制",
      langLabel: "表示言語", footNote: "掲載映像の権利は各権利者に帰属します。",
      taglineLines: ["表現を、", "実装する", "。"],
      ctaWorks: "参加作品・制作実績を見る", ctaTech: "技術ケース",
      recentH: "最近のシステム・ツール制作", toList: "一覧へ →", viewDetail: "詳細を見る →",
      worksH: "参加作品・制作実績", worksNote: "企業在籍中にチームの一員として携わった作品を掲載しています。",
      worksLead: "企業在籍中にチームの一員として携わった作品を掲載しています。各作品の本人担当範囲を記載し、担当工程で絞り込めます。",
      allWorks: n => `すべての作品（${n}）→`, tabsAria: "作品の切り替え", detailAria: t => `${t} の詳細`, detailRoles: "詳細・担当 →",
      techH: "技術ケース", techLead: "制作を支えるツール開発の担当概要。",
      contactH: "ご相談・ご連絡", toProfile: "プロフィール →",
      chanH: "個人チャンネル", chanP: "参加作品・制作実績とは別の、本人の YouTube チャンネルです。", openYT: "YouTube で開く",
      avatarAlt: "犬者カトのアイコン（黒髪に白のメッシュ、赤い瞳）",
      filterAria: "担当工程で絞り込み", all: "すべて",
      count: (n, t) => `<b>${n}</b> / ${t} 件`, moreRoles: n => ` ほか ${n} 件`, roleSep: "・",
      empty: "この条件に該当する作品はありません。", showAll: "すべての作品を表示",
      crumbsAria: "パンくず", setupK: "制作体制", setupV: "企業在籍中のチーム制作",
      officialK: "公式タイトル", publisherK: "公開チャンネル", publishedK: "公開日",
      rolesH: "本人担当", tagsH: "工程タグ", watchYT: "YouTube で見る ↗",
      pnWorks: "前後の作品", pnRecent: "前後の制作", pnTech: "前後の技術ケース", prev: "前の項目", next: "次の項目", tiktokAria: "TikTok（@kenzyakato・新しいタブで開きます）",
      videoAria: t => `動画を読み込む：${t}`, videoNote: "クリックで YouTube（youtube-nocookie.com）を読み込みます", iframeTitle: t => `${t}（YouTube）`,
      recentTitle: "最近の制作", aboutTitle: "プロフィール・連絡", aboutH: "プロフィール", oldSite: "旧サイト",
      nfTitle: "ページが見つかりません", nfLead: "指定されたページは見つかりませんでした。", nfBack: "ホームへ戻る"
    },
    en: {
      sep: " | ", metaDesc: "Portfolio of KenzyaKato (犬者カト). Unity / VTuber technical production.",
      skip: "Skip to main content", homeAria: "KenzyaKato home", menuAria: "Menu", navAria: "Main",
      navHome: "Home", navRecent: "Recent work", navTech: "Technical cases", navWorks: "Participated works", navAbout: "Profile & contact",
      channel: "Personal channel", motionTitle: "Reduce animation", motionFull: "Full", motionReduced: "Reduced",
      langLabel: "Language", footNote: "All rights to the featured videos belong to their respective rights holders.",
      taglineLines: ["Expression,", "implemented", "."],
      ctaWorks: "View participated works", ctaTech: "Technical cases",
      recentH: "Recent systems & tools", toList: "View all →", viewDetail: "View details →",
      worksH: "Participated works", worksNote: "These are works I contributed to as a member of a team while employed at a company.",
      worksLead: "These are works I contributed to as a member of a team while employed at a company. Each entry lists my own roles, and you can filter by production area.",
      allWorks: n => `All works (${n}) →`, tabsAria: "Switch featured work", detailAria: t => `Details: ${t}`, detailRoles: "Details & roles →",
      techH: "Technical cases", techLead: "An overview of my roles in developing tools that support production.",
      contactH: "Contact", toProfile: "Profile →",
      chanH: "Personal channel", chanP: "My own YouTube channel, separate from the participated works.", openYT: "Open on YouTube",
      avatarAlt: "KenzyaKato's icon (black hair with white streaks, red eyes)",
      filterAria: "Filter by production area", all: "All",
      count: (n, t) => `<b>${n}</b> / ${t} works`, moreRoles: n => ` + ${n} more`, roleSep: ", ",
      empty: "No works match this filter.", showAll: "Show all works",
      crumbsAria: "Breadcrumb", setupK: "Production setup", setupV: "Team production during company employment",
      officialK: "Official title", publisherK: "Published by", publishedK: "Release date",
      rolesH: "My roles", tagsH: "Production tags", watchYT: "Watch on YouTube ↗",
      pnWorks: "Previous and next works", pnRecent: "Previous and next items", pnTech: "Previous and next cases", prev: "Previous", next: "Next", tiktokAria: "TikTok (@kenzyakato, opens in a new tab)",
      videoAria: t => `Load video: ${t}`, videoNote: "Click to load YouTube (youtube-nocookie.com)", iframeTitle: t => `${t} (YouTube)`,
      recentTitle: "Recent work", aboutTitle: "Profile & contact", aboutH: "Profile", oldSite: "Previous site",
      nfTitle: "Page not found", nfLead: "The page you requested could not be found.", nfBack: "Back to home"
    },
    "zh-CN": {
      sep: "｜", metaDesc: "KenzyaKato（犬者カト）的作品集。Unity・VTuber 技术制作。",
      skip: "跳到正文", homeAria: "KenzyaKato 首页", menuAria: "菜单", navAria: "主导航",
      navHome: "首页", navRecent: "近期制作", navTech: "技术案例", navWorks: "参与作品与制作实绩", navAbout: "简介与联系",
      channel: "个人频道", motionTitle: "减少动态效果", motionFull: "标准", motionReduced: "已减少",
      langLabel: "显示语言", footNote: "所载影像的权利归各权利方所有。",
      taglineLines: ["将表现，", "付诸实现", "。"],
      ctaWorks: "查看参与作品与制作实绩", ctaTech: "技术案例",
      recentH: "近期系统与工具制作", toList: "查看全部 →", viewDetail: "查看详情 →",
      worksH: "参与作品与制作实绩", worksNote: "此处收录的是本人在企业任职期间作为团队成员参与制作的作品。",
      worksLead: "此处收录的是本人在企业任职期间作为团队成员参与制作的作品。各作品均注明本人担当范围，可按担当工序筛选。",
      allWorks: n => `全部作品（${n}）→`, tabsAria: "切换作品", detailAria: t => `${t} 详情`, detailRoles: "详情与担当 →",
      techH: "技术案例", techLead: "支持制作的工具开发担当概要。",
      contactH: "咨询与联系", toProfile: "简介 →",
      chanH: "个人频道", chanP: "独立于参与作品与制作实绩之外的本人 YouTube 频道。", openYT: "在 YouTube 打开",
      avatarAlt: "犬者カト的头像（黑发带白色挑染，红色眼睛）",
      filterAria: "按担当工序筛选", all: "全部",
      count: (n, t) => `<b>${n}</b> / ${t} 件`, moreRoles: n => ` 等另 ${n} 项`, roleSep: "、",
      empty: "没有符合该条件的作品。", showAll: "显示全部作品",
      crumbsAria: "面包屑导航", setupK: "制作体制", setupV: "企业任职期间的团队制作",
      officialK: "官方标题", publisherK: "发布频道", publishedK: "发布日期",
      rolesH: "本人担当", tagsH: "工序标签", watchYT: "在 YouTube 观看 ↗",
      pnWorks: "上一个与下一个作品", pnRecent: "上一个与下一个制作", pnTech: "上一个与下一个技术案例", prev: "上一项", next: "下一项", tiktokAria: "TikTok（@kenzyakato，在新标签页中打开）",
      videoAria: t => `加载视频：${t}`, videoNote: "点击后加载 YouTube（youtube-nocookie.com）", iframeTitle: t => `${t}（YouTube）`,
      recentTitle: "近期制作", aboutTitle: "简介与联系", aboutH: "简介", oldSite: "旧网站",
      nfTitle: "页面未找到", nfLead: "未找到您请求的页面。", nfBack: "返回首页"
    }
  },

  /* 各言語の内容差し替え（id 単位）。作品タイトル・ブランド名・人名は原文のまま */
  content: {
    en: {
      profile: {
        role: "Unity / VTuber technical production",
        tagline: "Expression, implemented.",
        capability: "I work on Unity-based production support, client and operation UIs, automation of repetitive tasks, and AI-assisted development.",
        lead: "Centered on Unity, I handle technical production for VTuber music videos and live footage, covering scenes, Timeline, gimmicks, lighting, effects, recording and rendering. I am also involved in developing tools that support production.",
        areas: ["Unity development", "VTuber content", "3DCG", "VR"],
        languages: ["Chinese", "Japanese", "English"]
      },
      tags: {
        scene: "Scene", timeline: "Timeline", gimmick: "Gimmicks", light: "Lighting", vfx: "Effects", character: "Character",
        system: "Systems & scripts", tool: "Tools", record: "Recording", render: "Rendering", camera: "Camera work",
        mocap: "Motion capture", model: "Modeling"
      },
      works: {
        "omae-no-matomo": { published: "April 30, 2026",
          roles: ["Camera work production", "Timeline production", "Rendering", "Character facial-expression setup", "Operation of facial expressions for some characters", "Participation in recording"] },
        "lady-crazy": { roles: ["Unity scene production", "Development of a Timeline production support tool", "Timeline production", "Creation of staging-control scripts", "Chain and floor-reflection gimmicks", "Adjustment of secondary motion (swaying parts) and the Unity character system", "Recording", "Rendering"] },
        "bubblin": { roles: ["Unity scene production", "Heart animation", "Falling-blade gimmick", "Timeline", "Development of production support tools", "Recording", "Improvements to the rendering setup", "Lighting"] },
        "bubblin-teaser": { roles: ["Scene production", "Timeline", "Recording", "Rendering", "Lighting", "Character", "Prop modeling", "VFX"] },
        "v": { roles: ["Scene production", "Timeline", "Recording", "Rendering", "Lighting"] },
        "kiss-kitsune": { roles: ["Lighting control system", "Scene production", "Timeline", "Gimmicks", "Secondary motion (swaying parts) and character system", "Recording", "Rendering"] },
        "namida": { roles: ["Scene production", "Development of a Timeline production support tool", "Timeline production", "Creation of staging-control scripts", "Gimmicks", "Secondary motion (swaying parts) and character system", "Recording", "Rendering"] },
        "twinkle-4-you": { roles: ["M1 shooting-star effect", "M11 costume glow", "M12 effects", "MC entrance and exit effects", "Synchronization with the live show's progression"] },
        "himehina-7th": { roles: ["Comment display system", "Recording"] },
        "lovechan-metamorphose": { roles: ["Motion-capture studio operation", "Camera work for M2 and M3"] },
        "kzn-play-with-me": { roles: ["Effects for all songs"] }
      },
      recent: {
        "participatory-live-system": { title: "Viewer-comment-driven participatory system | Kizuna AI",
          text: "Created a participatory system in which viewer comments affect gameplay. I was the sole developer of this system, using AI-assisted coding.",
          note: "My scope is this system only. This does not indicate that I produced the entire stream alone.",
          facts: [["Role", "Sole developer of this system (AI-assisted coding)"]] },
        "live-support-client-ui": { title: "Live production support tool — Client & operation UI",
          text: "Created a client and operation UI that support on-site operation in live production. Built on core functionality developed by the team, I was responsible for creating an operating environment that is easy for users to handle.",
          facts: [["Role", "Client and operation UI production"], ["Production setup", "Core functionality developed by the team"]] },
        "live-support-materials": { title: "Live production support tool — Material operation", kind: "Operation support tool",
          text: "Created a tool that supports material management and operation at live recording sites, working to make operation more efficient and to improve on-site workflows.",
          facts: [["Role", "Development of production support tools"]] }
      },
      tech: {
        "timeline-automation": { name: "Timeline production automation support", kind: "Unity editor extension",
          summary: "Created a Unity editor extension that supports the Timeline production workflow, helping automate repetitive tasks." },
        "focus-assist": { name: "Focus adjustment support for video production", kind: "Focus adjustment support",
          summary: "Created a focus adjustment support feature for video production in Unity, supporting operation during shooting and recording." },
        "recording-data-organize": { name: "Recording data organization support", kind: "Recording data organization support",
          summary: "Created a Unity production tool that supports organizing recording data." }
      }
    },
    "zh-CN": {
      profile: {
        role: "Unity・VTuber 技术制作",
        tagline: "将表现，付诸实现。",
        capability: "致力于基于 Unity 的制作支持、客户端与操作 UI、重复作业的自动化，以及运用 AI 的开发。",
        lead: "以 Unity 为核心，负责 VTuber MV 与直播影像的技术制作，涵盖场景、Timeline、机关、灯光、特效、收录与渲染。同时参与支持制作的工具开发。",
        areas: ["Unity 开发", "VTuber 内容", "3DCG", "VR"],
        languages: ["中文", "日语", "英语"]
      },
      tags: {
        scene: "场景", timeline: "Timeline", gimmick: "机关", light: "灯光", vfx: "特效", character: "角色",
        system: "系统与脚本", tool: "工具", record: "收录", render: "渲染", camera: "运镜",
        mocap: "动作捕捉", model: "建模"
      },
      works: {
        "omae-no-matomo": { published: "2026年4月30日",
          roles: ["运镜制作", "Timeline 制作", "渲染", "角色表情设置", "部分角色的表情操作", "参与收录"] },
        "lady-crazy": { roles: ["Unity 场景制作", "Timeline 制作支持工具的开发", "Timeline 制作", "演出控制脚本的制作", "锁链与地面反射机关", "摇动物与 Unity 角色系统的调整", "收录", "渲染"] },
        "bubblin": { roles: ["Unity 场景制作", "爱心动画", "落刀机关", "Timeline", "制作支持工具的开发", "收录", "渲染机制改善", "灯光"] },
        "bubblin-teaser": { roles: ["场景制作", "Timeline", "收录", "渲染", "灯光", "角色", "小物建模", "VFX"] },
        "v": { roles: ["场景制作", "Timeline", "收录", "渲染", "灯光"] },
        "kiss-kitsune": { roles: ["灯光控制系统", "场景制作", "Timeline", "机关", "摇动物与角色系统", "收录", "渲染"] },
        "namida": { roles: ["场景制作", "Timeline 制作支持工具的开发", "Timeline 制作", "演出控制脚本的制作", "机关", "摇动物与角色系统", "收录", "渲染"] },
        "twinkle-4-you": { roles: ["M1 流星特效", "M11 服装发光", "M12 特效", "MC 出入场特效", "与现场进程联动"] },
        "himehina-7th": { roles: ["评论显示系统", "收录"] },
        "lovechan-metamorphose": { roles: ["动捕棚操作", "M2、M3 运镜"] },
        "kzn-play-with-me": { roles: ["全曲特效"] }
      },
      recent: {
        "participatory-live-system": { title: "观众评论联动的参与型系统｜Kizuna AI",
          text: "制作了观众评论会影响游戏进程的参与型机制。本人借助 AI 辅助编程，独立开发了该系统。",
          note: "担当范围仅限该系统，并不表示本人独立制作了整场直播。",
          facts: [["担当", "该系统的独立开发（运用 AI 辅助编程）"]] },
        "live-support-client-ui": { title: "直播制作支持工具 — 客户端与操作 UI",
          text: "制作了支持直播制作现场操作的客户端与操作 UI。基于团队开发的核心功能，负责打造便于使用者操作的环境。",
          facts: [["担当", "客户端与操作 UI 的制作"], ["制作体制", "核心功能由团队开发"]] },
        "live-support-materials": { title: "直播制作支持工具 — 素材运用", kind: "运用支持工具",
          text: "制作了支持直播收录现场素材管理与操作的工具，致力于提升操作效率并改善制作现场的运用。",
          facts: [["担当", "制作支持工具的开发"]] }
      },
      tech: {
        "timeline-automation": { name: "Timeline 制作自动化支持", kind: "Unity 编辑器扩展",
          summary: "制作了支持 Timeline 制作流程的 Unity 编辑器扩展，协助实现重复作业的自动化。" },
        "focus-assist": { name: "影像制作的对焦调整支持", kind: "对焦调整支持",
          summary: "制作了 Unity 影像制作中的对焦调整支持功能，支持拍摄与收录时的操作。" },
        "recording-data-organize": { name: "收录数据整理支持", kind: "收录数据整理支持",
          summary: "制作了支持整理收录数据的 Unity 制作工具。" }
      }
    }
  }
};
