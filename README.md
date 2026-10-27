# Sales Academy

日英切替・4タブ構成の会員制トレーニングサイト（静的HTML）。

## ファイル
- `index.html` ホーム / `module-1.html` プロローグ / `business.html` `client.html` `candidate.html` `beyond.html` 4タブ
- `style.css` `app.js`（言語切替・スクロール演出）`guard.js`（透かし・コピー抑止）
- `src/`（`build.py` `lib.py` `diagrams.py`）= 全ページの生成元。文章は `build.py` に日英ペアで書いてある
  - 編集後: `cd src && python3 build.py` でHTMLが再生成される

## 公開（まだしない場合は読み飛ばし）
- GitHub Pagesは非公開にできない。会員制にするには Cloudflare Pages + Access（招待メールのみ許可）を使う
- 画面上の文章はスクショ・画面録画で複製可能。`guard.js` は流出時に誰か特定するための抑止
- 中核ノウハウ（顧客名・数字・実案件）はサイトに載せず、ライブで渡す
