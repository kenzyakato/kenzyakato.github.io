/* サイトデータ — 表示内容はここだけを編集 */
window.SITE = {
  profile: {
    handle: "KenzyaKato",
    kana: "犬者カト",
    role: "Unity・VTuber 技術制作",
    avatar: "assets/avatar.png",
    tagline: "表現を、実装する。",
    capability: "Unityを用いた制作支援、クライアント・操作UI、繰り返し作業の自動化、AIを活用した開発に取り組んでいます。",
    lead: "Unity を軸に、VTuber の MV・ライブ映像の技術制作を担当しています。モーションキャプチャ収録環境のセットアップ、Timeline、ギミック、ライティング、エフェクト、収録、レンダリングまで。制作を支えるツール開発にも携わっています。",
    areas: ["Unity 開発", "VTuber コンテンツ", "3DCG", "VR"],
    languages: ["中文", "日本語", "English"],
    links: {
      email: "kenzyakato@gmail.com",
      channel: "https://www.youtube.com/@kenzyakato3680",
      channelHandle: "@kenzyakato3680",
      x: "https://x.com/kenzyakato",
      tiktok: "https://www.tiktok.com/@kenzyakato",
      tiktokHandle: "@kenzyakato",
      booth: "https://hanzawanaoki.booth.pm/",
      source: "https://sites.google.com/view/quanzhehuodou/"
    }
  },

  tags: {
    scene: "収録セットアップ", timeline: "Timeline", gimmick: "ギミック", light: "ライティング",
    vfx: "エフェクト", character: "キャラクター", system: "システム・スクリプト",
    tool: "ツール", record: "収録", render: "レンダリング", camera: "カメラワーク",
    mocap: "モーションキャプチャ", model: "モデリング"
  },

  featured: ["lady-crazy", "kiss-kitsune", "twinkle-4-you", "bubblin", "kzn-play-with-me"],

  works: [
    { id: "omae-no-matomo", title: "お前のまともはまともじゃない", credit: "あおぎり高校", yt: "xwwSPA8C9T0",
      officialTitle: "あおぎり高校メジャーデビュー1周年記念!!　『お前のまともはまともじゃない』スタジオパフォーマンス映像",
      publisher: "KING RECORDS", published: "2026年4月30日",
      roles: ["カメラワーク制作", "Timeline 制作", "レンダリング", "キャラクターの表情セットアップ", "一部キャラクターの表情操作", "収録参加"],
      tags: ["camera", "timeline", "render", "character", "record"] },
    { id: "lady-crazy", title: "LADY CRAZY", credit: "HIMEHINA", yt: "WTBycStPfJM",
      roles: ["モーションキャプチャ収録環境のセットアップ", "Timeline制作支援ツールの開発", "Timeline 制作", "演出制御スクリプトの制作", "鎖・床面反射のギミック", "揺れもの・Unity キャラクターシステムの調整", "収録", "レンダリング"],
      tags: ["scene", "timeline", "system", "gimmick", "character", "record", "render"] },
    { id: "bubblin", title: "バブリン", credit: "HIMEHINA", yt: "ZUoOLPH8X6Q",
      roles: ["モーションキャプチャ収録環境のセットアップ", "ハートのアニメーション", "落下する刃のギミック", "Timeline", "制作支援ツールの開発", "収録", "レンダリング機構の改善", "ライティング"],
      tags: ["scene", "gimmick", "timeline", "tool", "record", "render", "light"] },
    { id: "bubblin-teaser", title: "Bubblin Teaser", credit: "HIMEHINA", yt: "K04mxDhi4Ls",
      roles: ["モーションキャプチャ収録環境のセットアップ", "Timeline", "収録", "レンダリング", "ライティング", "キャラクター", "小物モデリング", "VFX"],
      tags: ["scene", "timeline", "record", "render", "light", "character", "model", "vfx"] },
    { id: "v", title: "V", credit: "HIMEHINA", yt: "7oE8YnXumMk",
      roles: ["モーションキャプチャ収録環境のセットアップ", "Timeline", "収録", "レンダリング", "ライティング"],
      tags: ["scene", "timeline", "record", "render", "light"] },
    { id: "kiss-kitsune", title: "キスキツネ", credit: "HIMEHINA", yt: "GgOOykZcfnI",
      roles: ["ライティング制御システム", "モーションキャプチャ収録環境のセットアップ", "Timeline", "ギミック", "揺れもの・キャラクターシステム", "収録", "レンダリング"],
      tags: ["light", "system", "scene", "timeline", "gimmick", "character", "record", "render"] },
    { id: "namida", title: "涙の薫りがする", credit: "HIMEHINA", yt: "Gpu5Cgpsjn4",
      roles: ["モーションキャプチャ収録環境のセットアップ", "Timeline制作支援ツールの開発", "Timeline 制作", "演出制御スクリプトの制作", "ギミック", "揺れもの・キャラクターシステム", "収録", "レンダリング"],
      tags: ["scene", "timeline", "tool", "system", "gimmick", "character", "record", "render"] },
    { id: "twinkle-4-you", title: "hololive Twinkle 4 You", credit: "ホロライブ5期生（ねぽらぼ）", yt: "RRH29-R71T0",
      roles: ["M1 流れ星エフェクト", "M11 衣装の発光", "M12 エフェクト", "MC 入退場エフェクト", "ライブ進行との連動"],
      tags: ["vfx", "system"] },
    { id: "himehina-7th", title: "HIMEHINA 7周年LIVE", credit: "HIMEHINA", yt: "f3bk3YJ1cQE",
      roles: ["コメント表示システム", "収録"],
      tags: ["system", "record"] },
    { id: "lovechan-metamorphose", title: "lovechan metamorphose", credit: "loveちゃん", yt: "6aidfL1wXhg",
      roles: ["モーションキャプチャスタジオのオペレーション", "M2・M3 のカメラワーク"],
      tags: ["mocap", "camera"] },
    { id: "kzn-play-with-me", title: "#kzn play with me", credit: "#kzn", yt: "R4xz5Zdmk-w",
      roles: ["全曲のエフェクト"],
      tags: ["vfx"] }
  ],

  /* 最近のシステム・ツール制作（公開可の職責概要のみ。日付は未記載） */
  recent: [
    { id: "participatory-live-system", title: "視聴者コメント連動の参加型システム｜Kizuna AI", kind: "LIVE SYSTEM", yt: "h_Ry3Gu8efw",
      text: "視聴者コメントがゲームプレイに影響する参加型の仕組みを制作。当該システムをAIによる実装支援を活用して単独で開発。",
      note: "担当範囲は当該システム。配信全体の単独制作を示すものではありません。",
      facts: [["担当", "当該システムの単独開発（AI支援を活用）"]] },
    { id: "live-support-client-ui", title: "ライブ制作支援ツール — クライアント・操作UI", kind: "CLIENT / UI", plate: "CLIENT / UI",
      text: "ライブ制作現場での操作を支援するクライアントと操作UIを制作。チームが開発したコア機能を基に、利用者が扱いやすい操作環境づくりを担当。",
      facts: [["担当", "クライアント・操作UIの制作"], ["制作体制", "コア機能はチームで開発"]] },
    { id: "live-support-materials", title: "ライブ制作支援ツール — 素材運用", kind: "運用支援ツール", plate: "OPERATION SUPPORT",
      text: "ライブ収録現場での素材管理・操作を支援するツールを制作。操作の効率化と、制作現場の運用改善に取り組む。",
      facts: [["担当", "制作支援ツールの開発"]] }
  ],

  tech: [
    { id: "timeline-automation", name: "Timeline制作の自動化支援", kind: "Unity エディタ拡張",
      summary: "Timeline制作フローを支援するUnityエディタ拡張を制作。繰り返し作業の自動化を支援。" },
    { id: "focus-assist", name: "映像制作のフォーカス調整支援", kind: "フォーカス調整支援",
      summary: "Unityの映像制作におけるフォーカス調整支援機能を制作。撮影・収録時の操作を支援。" },
    { id: "recording-data-organize", name: "収録データの整理支援", kind: "収録データ整理支援",
      summary: "収録データの整理を支援するUnity向け制作ツールを制作。" }
  ]
};
