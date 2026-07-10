"use client";

import { useState } from "react";

const paymentDays = Array.from({ length: 31 }, (_, index) => index + 1);

export default function KoteiHiPage() {
  const [fixedCosts, setFixedCosts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    amount: "",
    paymentDay: "15"
  });

  function updateForm(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function addFixedCost(event) {
    event.preventDefault();

    const fixedCost = {
      id: `fixed-cost-${Date.now()}`,
      name: form.name,
      amount: Number(form.amount),
      paymentDay: form.paymentDay
    };

    setFixedCosts((current) => [fixedCost, ...current]);
    setForm({ name: "", amount: "", paymentDay: "15" });
  }

  return (
    <main className="page-shell">
      <section className="intro-band">
        <div>
          <p className="eyebrow">Kotei-hi MVP</p>
          <h1>固定費を登録する</h1>
          <p className="lead">
            サブスクや家賃など、毎月かかる固定費を入力して一覧に追加できます。
          </p>
        </div>
      </section>

      <section className="app-band">
        <div className="panel-heading">
          <p className="eyebrow">Issue 1</p>
          <h2>固定費フォーム</h2>
        </div>

        <div className="budget-layout">
          <form className="expense-form" onSubmit={addFixedCost}>
            <label>
              固定費の名前
              <input
                value={form.name}
                onChange={(event) => updateForm("name", event.target.value)}
                placeholder="例: Netflix"
                required
              />
            </label>

            <label>
              月額金額
              <input
                type="number"
                min="0"
                value={form.amount}
                onChange={(event) => updateForm("amount", event.target.value)}
                placeholder="例: 1490"
                required
              />
            </label>

            <label className="wide">
              支払日
              <select
                value={form.paymentDay}
                onChange={(event) => updateForm("paymentDay", event.target.value)}
              >
                {paymentDays.map((day) => (
                  <option key={day} value={String(day)}>
                    毎月{day}日
                  </option>
                ))}
              </select>
            </label>

            <button type="submit">追加</button>
          </form>

          <div className="summary-panel" aria-label="固定費一覧">
            <div className="panel-heading">
              <p className="eyebrow">List</p>
              <h2>一覧エリア</h2>
            </div>

            <div className="expense-list">
              {fixedCosts.length === 0 ? (
                <p className="helper-text">まだ固定費は登録されていません。</p>
              ) : (
                fixedCosts.map((fixedCost) => (
                  <div className="expense-item" key={fixedCost.id}>
                    <div>
                      <strong>{fixedCost.name}</strong>
                      <small>{fixedCost.amount.toLocaleString()}円</small>
                    </div>
                    <span>{fixedCost.paymentDay}日</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
