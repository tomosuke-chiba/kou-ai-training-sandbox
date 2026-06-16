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
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    amount: "",
    paymentDay: "15"
  });
  const monthlyTotal = fixedCosts.reduce(
    (total, fixedCost) => total + fixedCost.amount,
    0
  );

  function updateForm(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function updateEditForm(field, value) {
    setEditForm((current) => ({ ...current, [field]: value }));
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

  function startEditing(fixedCost) {
    setEditingId(fixedCost.id);
    setEditForm({
      name: fixedCost.name,
      amount: String(fixedCost.amount),
      paymentDay: fixedCost.paymentDay
    });
  }

  function cancelEditing() {
    setEditingId(null);
    setEditForm({ name: "", amount: "", paymentDay: "15" });
  }

  function saveEditing(event) {
    event.preventDefault();

    setFixedCosts((current) =>
      current.map((fixedCost) =>
        fixedCost.id === editingId
          ? {
              ...fixedCost,
              name: editForm.name,
              amount: Number(editForm.amount),
              paymentDay: editForm.paymentDay
            }
          : fixedCost
      )
    );
    cancelEditing();
  }

  function deleteFixedCost(fixedCost) {
    const confirmed = window.confirm(
      `${fixedCost.name}を削除しますか？`
    );

    if (!confirmed) {
      return;
    }

    setFixedCosts((current) =>
      current.filter((currentFixedCost) => currentFixedCost.id !== fixedCost.id)
    );
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

            <div className="total-card">
              <span>月合計</span>
              <strong>合計: {monthlyTotal.toLocaleString()}円</strong>
            </div>

            <div className="expense-list">
              {fixedCosts.length === 0 ? (
                <p className="helper-text">まだ固定費は登録されていません。</p>
              ) : (
                fixedCosts.map((fixedCost) => (
                  <div className="expense-item" key={fixedCost.id}>
                    {editingId === fixedCost.id ? (
                      <form className="expense-form" onSubmit={saveEditing}>
                        <label>
                          固定費の名前
                          <input
                            value={editForm.name}
                            onChange={(event) =>
                              updateEditForm("name", event.target.value)
                            }
                            required
                          />
                        </label>

                        <label>
                          月額金額
                          <input
                            type="number"
                            min="0"
                            value={editForm.amount}
                            onChange={(event) =>
                              updateEditForm("amount", event.target.value)
                            }
                            required
                          />
                        </label>

                        <label>
                          支払日
                          <select
                            value={editForm.paymentDay}
                            onChange={(event) =>
                              updateEditForm("paymentDay", event.target.value)
                            }
                          >
                            {paymentDays.map((day) => (
                              <option key={day} value={String(day)}>
                                毎月{day}日
                              </option>
                            ))}
                          </select>
                        </label>

                        <div className="expense-actions">
                          <button type="submit">保存</button>
                          <button type="button" onClick={cancelEditing}>
                            キャンセル
                          </button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <div>
                          <strong>{fixedCost.name}</strong>
                          <small>{fixedCost.amount.toLocaleString()}円</small>
                        </div>
                        <span>{fixedCost.paymentDay}日</span>
                        <div className="expense-actions">
                          <button
                            type="button"
                            onClick={() => startEditing(fixedCost)}
                          >
                            編集
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteFixedCost(fixedCost)}
                          >
                            削除
                          </button>
                        </div>
                      </>
                    )}
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
