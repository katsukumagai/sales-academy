# Sales Academy — 公開手順（Cloudflare Pages + Access）

## 構成
- index.html / module-1.html / style.css / guard.js（静的サイト、DBなし）
- 認証はコードではなく Cloudflare Access（サーバー側）で行う

## 手順（約30分、無料枠 50 users まで）
1. GitHub に新規 **private** リポジトリを作り、このフォルダを push
2. Cloudflare Pages → Connect to Git → 上のリポジトリ（Build command なし、output は `/`）
3. Custom domain を設定（例: academy.kkrm-solution.com）
4. Cloudflare Zero Trust → Access → Applications → Add → Self-hosted
   - Domain: academy.kkrm-solution.com（pages.dev 側のURLも同じAppで保護すること）
   - Policy: Allow → Emails に招待したいアドレスを追加（または Email ending in @会社ドメイン）
   - Login method: One-time PIN（メールにコードが届く。登録／招待制になる）
5. 動作確認: シークレットウィンドウで開く → ログイン画面が出ること、許可外のメールでは入れないこと

## 限界（正直に）
- 画面に表示された文章は、スクショ・手書き・画面録画で複製可能。技術的に完全防止は不可能
- guard.js の抑止（コピー/右クリック/印刷禁止、メール透かし）は「漏洩したら誰か特定できる」ことが本質
- 本当に守りたい中核ノウハウは、サイトに載せずライブセッションで渡す
- 有料化する場合は Stripe + Cloudflare Access の自動付与（Worker）か、Memberstack 等に載せ替え
