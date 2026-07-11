# Learner Scorecard

受講者ごとにコピーして使います。

## 基本情報

| 項目 | 記入 |
|---|---|
| 受講者ID | kou-writing-team |
| 開始日 | 2026-05-18 |
| 目標アプリ | 家計簿アプリ「こていひへらしくん」（固定費削減フォーカス） |
| 技術構成 | Next.js |

## 進捗

| 項目 | 状態 | メモ |
|---|---|---|
| AIに3つ質問してもらった | 完了 | Claude Codeとの壁打ちで3問完答（Q1: 固定費を減らしたい / Q2: スマホで週1 / Q3: Next.js） |
| 要件メモを作った | 完了 | `docs/my-budget-app-requirements.md`、アプリ名「こていひへらしくん」 |
| Issueを5本以上作った | 完了 | 7本作成（`docs/my-issues.md`）、MVP 3本 + あるとうれしい 4本 |
| Codex appで1 Issue実装した | 完了 | Issue 1〜7 すべて Codex CLI で実装 |
| localhostで確認した | 完了 | 各 Issue で `npm run dev` → ブラウザで動作確認 |
| PRレビューした | 進行中 | Lv2 PR を Ready for review に変更済み、千葉さん（@tomosuke-chiba）レビュー待ち |
| テストとbuildを確認した | 完了 | 各実装で `npm run lint` / `npm test` / `npm run build` すべてpass |
| 本番環境との違いを説明した | 完了 | Lv3 で Claude Code とQ&A、`progress/lv3.md` のメモに記載 |
| 自分専用機能を追加した | 完了 | 前月比較（緑=減/赤=増の色分け）+ 月合計推移の折れ線グラフ＝固定費削減を視覚化 |
| 模擬研修で説明した | 未着手 | 最終ステップ、後日対応予定 |

## 伴走メモ

### 自分でできたこと
- GitHub Flow の概念理解と1周（Issue → Branch → Codex実装 → PR → レビュー依頼）
- Codex CLI を使った Issue 1〜7 の実装と動作確認
- `npm install` で新ライブラリ（recharts）追加
- fork ベースのワークフローへ切り替え（コラボレーター権限が外れた時に対応）
- cross-fork PR を6段スタックで作成・管理
- 環境ハマりの自力解決（`sudo chown` で npm キャッシュ権限修復）
- 「こていひへらしくん」を MVP + あるとうれしい全機能まで完成

### 詰まったこと
- ターミナルの種類の混乱（zsh / Codex / Claude Code の使い分け）
- 新しいタブを開くと毎回 `cd` が必要、ディレクトリ移動の概念
- `npm install` の権限エラー（`sudo chown` で解決）
- Codex CLI のサンドボックス制限（ネット接続なし → 自分のターミナルで実行）
- PR一覧画面と PR詳細画面の違い

### 次回までの宿題
- 千葉さんからのレビュー対応（Lv2 PRから順次）
- Lv2 PR merge 後、他のドラフトPR（Issue 3〜7）を Ready for review に変更
- 永続化（localStorage）を新規Issueとして起こすか検討
- 自分の固定費を実際に入力してアプリを日常で試す

### 安全上の懸念
- 特になし
- 安全ポリシー（個人情報・本番・お金・チームルール）すべて遵守

### 次に作るIssue
- localStorage 永続化（リロードしても固定費が残る）
- UI の細かい改善（モバイル対応の確認など）
- 「今月を確定」ボタンの名前見直し（よりわかりやすい表現に）
