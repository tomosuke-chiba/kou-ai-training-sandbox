import test from "node:test";
import assert from "node:assert/strict";
import {
  createExpense,
  filterExpenses,
  summarizeByCategory,
  totalExpenses
} from "../src/budget.js";

const expenses = [
  { id: "1", title: "Lunch", amount: 900, category: "食費", date: "2026-06-01" },
  { id: "2", title: "Book", amount: 1800, category: "子ども費", date: "2026-06-02" },
  { id: "3", title: "Train", amount: 420, category: "生活費", date: "2026-05-30" }
];

test("createExpense trims title and normalizes amount", () => {
  assert.deepEqual(createExpense({
    id: "expense-test",
    title: "  Coffee  ",
    amount: "380.4",
    category: "食費",
    date: "2026-06-02"
  }), {
    id: "expense-test",
    title: "Coffee",
    amount: 380,
    category: "食費",
    date: "2026-06-02",
    note: ""
  });
});

test("createExpense requires a title", () => {
  assert.throws(() => createExpense({ title: "", amount: 100 }), /title is required/);
});

test("createExpense requires a positive amount", () => {
  assert.throws(() => createExpense({ title: "Coffee", amount: 0 }), /amount must be a positive integer/);
  assert.throws(() => createExpense({ title: "Coffee", amount: -100 }), /amount must be a positive integer/);
});

test("createExpense rejects invalid categories", () => {
  assert.throws(
    () => createExpense({ title: "Coffee", amount: 100, category: "Other" }),
    /category is invalid/
  );
});

test("totalExpenses returns the sum of amounts", () => {
  assert.equal(totalExpenses(expenses), 3120);
});

test("summarizeByCategory returns category totals", () => {
  assert.deepEqual(summarizeByCategory(expenses), {
    食費: 900,
    子ども費: 1800,
    生活費: 420
  });
});

test("filterExpenses filters by category and month", () => {
  assert.deepEqual(
    filterExpenses(expenses, { category: "食費", month: "2026-06" }).map((expense) => expense.id),
    ["1"]
  );
});
