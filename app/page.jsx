"use client";

import { useMemo, useState } from "react";
import {
  createExpense,
  defaultCategories,
  filterExpenses,
  summarizeByCategory,
  totalExpenses
} from "../src/budget.js";

const initialExpenses = [
  {
    id: "sample-1",
    title: "ランチ",
    amount: 900,
    category: "食費",
    date: "2026-06-01",
    note: "最初のサンプル"
  },
  {
    id: "sample-2",
    title: "習い事教材",
    amount: 1800,
    category: "子ども費",
    date: "2026-06-02",
    note: "Codex練習"
  }
];

const roadmap = [
  "AIに3つだけ質問してもらい、自分向け家計簿のゴールを決める",
  "要件をdocs/my-budget-app-requirements.mdにまとめる",
  "GitHub Issueへ小さく分解する",
  "Codex appで1 Issueずつ実装する",
  "localhostで動作確認する",
  "PRの差分・テスト・リスクをレビューする",
  "本番環境との違いを説明する",
  "自分専用機能を1つ追加する"
];

const requirementQuestions = [
  "毎月いちばん見えるようにしたいお金の不安や目標は何ですか？",
  "いつ・どこで家計簿を入力したいですか？スマホ中心、PC中心、週末まとめ入力などを教えてください。",
  "技術構成はどうしますか？推奨はNext.jsです。もっと軽くするならHTML/JavaScript、Reactだけを学びたいならVite + Reactも選べます。"
];

const issueSeeds = [
  "支出入力フォームを作る",
  "支出一覧を表示する",
  "カテゴリ別合計を表示する",
  "月別フィルタを追加する",
  "localStorageで保存する",
  "PRレビュー用チェックリストを追加する"
];

export default function Home() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "食費",
    date: new Date().toISOString().slice(0, 10),
    note: ""
  });
  const [formError, setFormError] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [monthFilter, setMonthFilter] = useState("2026-06");
  const [completedSteps, setCompletedSteps] = useState([]);

  const visibleExpenses = useMemo(
    () => filterExpenses(expenses, { category: categoryFilter, month: monthFilter }),
    [expenses, categoryFilter, monthFilter]
  );
  const categorySummary = useMemo(() => summarizeByCategory(visibleExpenses), [visibleExpenses]);
  const total = useMemo(() => totalExpenses(visibleExpenses), [visibleExpenses]);

  function updateForm(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function addExpense(event) {
    event.preventDefault();
    setFormError("");

    try {
      const expense = createExpense({
        ...form,
        id: `expense-${Date.now()}`
      });
      setExpenses((current) => [expense, ...current]);
      setForm((current) => ({ ...current, title: "", amount: "", note: "" }));
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "入力内容を確認してください");
    }
  }

  function toggleStep(index) {
    setCompletedSteps((current) => (
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index]
    ));
  }

  return (
    <main className="page-shell">
      <section className="intro-band">
        <div>
          <p className="eyebrow">App-first Codex Training</p>
          <h1>あなたにぴったりの家計簿アプリを作りながら学ぶ</h1>
          <p className="lead">
            AIとの要件定義、GitHub Issue、Codex appでの実装、localhost確認、
            PRレビューまでを1つのアプリ制作で練習します。
          </p>
        </div>
        <div className="status-panel" aria-label="学習進捗">
          <span>進捗</span>
          <strong>{completedSteps.length} / {roadmap.length}</strong>
          <small>まず動かし、必要になったところで学ぶ。</small>
        </div>
      </section>

      <section className="workspace-grid">
        <div className="tool-panel">
          <div className="panel-heading">
            <p className="eyebrow">Step 1</p>
            <h2>AIと要件定義</h2>
          </div>
          <p className="helper-text">
            受講者にはAIから1問ずつ質問してもらい、自分用のゴールを決めてもらいます。
          </p>
          <ol className="question-list">
            {requirementQuestions.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ol>
          <div className="prompt-box">
            <span>AIに渡す最初の依頼</span>
            <code>
              あなたにぴったりの家計簿アプリを作りたいです。良いアウトプットを出すために、私に聞きたいことを3つに絞って質問してください。質問は1つずつ行ってください。
            </code>
          </div>
        </div>

        <div className="tool-panel">
          <div className="panel-heading">
            <p className="eyebrow">Step 2</p>
            <h2>Issueに分解</h2>
          </div>
          <p className="helper-text">
            要件が決まったら、1 Issue = 1つの小さな機能にします。
          </p>
          <ul className="issue-list">
            {issueSeeds.map((issue) => (
              <li key={issue}>
                <span>{issue}</span>
                <small>DoD / やらないこと / 確認方法を書く</small>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="app-band">
        <div className="panel-heading">
          <p className="eyebrow">Budget App MVP</p>
          <h2>動く家計簿</h2>
        </div>
        <div className="budget-layout">
          <form className="expense-form" onSubmit={addExpense}>
            <label>
              内容
              <input
                value={form.title}
                onChange={(event) => updateForm("title", event.target.value)}
                placeholder="例: スーパーで買い物"
                required
              />
            </label>
            <label>
              金額（円）
              <input
                type="number"
                min="1"
                step="1"
                value={form.amount}
                onChange={(event) => updateForm("amount", event.target.value)}
                placeholder="例: 480"
                required
              />
            </label>
            <label>
              カテゴリ
              <select
                value={form.category}
                onChange={(event) => updateForm("category", event.target.value)}
              >
                {defaultCategories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </label>
            <label>
              日付
              <input
                type="date"
                value={form.date}
                onChange={(event) => updateForm("date", event.target.value)}
                required
              />
            </label>
            <label className="wide">
              メモ
              <input
                value={form.note}
                onChange={(event) => updateForm("note", event.target.value)}
                placeholder="任意メモ"
              />
            </label>
            <button type="submit">支出を追加</button>
            {formError ? <p className="form-error" role="alert">{formError}</p> : null}
          </form>

          <div className="summary-panel">
            <div className="total-card">
              <span>表示中の合計</span>
              <strong>{total.toLocaleString()}円</strong>
            </div>
            <div className="filters">
              <label>
                月
                <input
                  type="month"
                  value={monthFilter}
                  onChange={(event) => setMonthFilter(event.target.value)}
                />
              </label>
              <label>
                カテゴリ
                <select
                  value={categoryFilter}
                  onChange={(event) => setCategoryFilter(event.target.value)}
                >
                  <option value="All">All</option>
                  {defaultCategories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="category-summary">
              {Object.entries(categorySummary).map(([category, amount]) => (
                <div key={category}>
                  <span>{category}</span>
                  <strong>{amount.toLocaleString()}円</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="expense-list-section" aria-labelledby="expense-list-heading">
          <h3 id="expense-list-heading">支出一覧</h3>
          {expenses.length === 0 ? (
            <p className="empty-state">支出がまだありません。フォームから追加してください。</p>
          ) : (
            <table className="expense-table">
              <thead>
                <tr>
                  <th scope="col">日付</th>
                  <th scope="col">内容</th>
                  <th scope="col">カテゴリ</th>
                  <th scope="col">金額</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>{expense.date}</td>
                    <td>
                      <span className="expense-title">{expense.title}</span>
                      {expense.note ? <small className="expense-note">{expense.note}</small> : null}
                    </td>
                    <td>{expense.category}</td>
                    <td className="expense-amount">{expense.amount.toLocaleString()}円</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </section>

      <section className="roadmap-band">
        <div className="panel-heading">
          <p className="eyebrow">Learning Assistant</p>
          <h2>現状と次の一手</h2>
        </div>
        <div className="roadmap-list">
          {roadmap.map((step, index) => (
            <label key={step} className={completedSteps.includes(index) ? "step done" : "step"}>
              <input
                type="checkbox"
                checked={completedSteps.includes(index)}
                onChange={() => toggleStep(index)}
              />
              <span>{step}</span>
            </label>
          ))}
        </div>
      </section>
    </main>
  );
}
