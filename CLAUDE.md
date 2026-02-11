# CLAUDE.md

## Project Overview

シンプルなTODOリストアプリケーション。Next.js (App Router) + TypeScript + Tailwind CSSで構築。
GitHub Pagesにデプロイ: https://baggio4ever.github.io/cc-todo-next/

## Tech Stack

- Next.js 16 (App Router, static export)
- React 19
- TypeScript (strict mode)
- Tailwind CSS 4

## Project Structure

```
src/
  app/
    layout.tsx    — ルートレイアウト (Server Component)
    page.tsx      — TODOアプリのメインUI (Client Component)
    globals.css   — Tailwindベーススタイル
  types/
    todo.ts       — Todo型定義
```

## Commands

- `npm run dev` — 開発サーバー起動
- `npm run build` — プロダクションビルド (静的エクスポート → `out/`)
- `npm run lint` — ESLintによるコードチェック

## Key Configuration

- `next.config.ts`: `output: "export"` で静的エクスポート、`basePath: "/cc-todo-next"` でGitHub Pages対応
- `@/*` パスエイリアスは `./src/*` にマッピング

## Deployment

- mainブランチへのpushで `.github/workflows/deploy.yml` が自動実行
- GitHub Actions でビルド → GitHub Pagesにデプロイ

## Conventions

- コンポーネントはApp Routerの規約に従う
- クライアントサイドの状態管理にはReact hooksを使用
- UIスタイリングはTailwind CSSのユーティリティクラスを使用


# テストコード作成時の厳守事項

## 絶対に守ってください！

### テストコードの品質
- テストは必ず実際の機能を検証すること
- `expect(true).toBe(true)` のような意味のないアサーションは絶対に書かない
- 各テストケースは具体的な入力と期待される出力を検証すること
- モックは必要最小限に留め、実際の動作に近い形でテストすること

### ハードコーディングの禁止
- テストを通すためだけのハードコードは絶対に禁止
- 本番コードに `if (testMode)` のような条件分岐を入れない
- テスト用の特別な値（マジックナンバー）を本番コードに埋め込まない
- 環境変数や設定ファイルを使用して、テスト環境と本番環境を適切に分離すること

### テスト実装の原則
- テストが失敗する状態から始めること（Red-Green-Refactor）
- 境界値、異常系、エラーケースも必ずテストすること
- カバレッジだけでなく、実際の品質を重視すること
- テストケース名は何をテストしているか明確に記述すること

### 実装前の確認
- 機能の仕様を正しく理解してからテストを書くこと
- 不明な点があれば、仮の実装ではなく、ユーザーに確認すること

平川 知秀. Claude CodeによるAI駆動開発入門 (pp.133-134). 株式会社技術評論社. Kindle 版. 