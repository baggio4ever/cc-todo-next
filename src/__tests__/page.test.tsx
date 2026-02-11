import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import Home from "@/app/page";

describe("Home (TODO List)", () => {
  it("タイトルが表示される", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: "TODO List" })).toBeInTheDocument();
  });

  it("初期状態で空メッセージが表示される", () => {
    render(<Home />);
    expect(screen.getByText("タスクがありません")).toBeInTheDocument();
  });

  it("TODOを追加できる", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.type(screen.getByPlaceholderText("新しいタスクを入力..."), "買い物に行く");
    await user.click(screen.getByRole("button", { name: "追加" }));

    expect(screen.getByText("買い物に行く")).toBeInTheDocument();
    expect(screen.queryByText("タスクがありません")).not.toBeInTheDocument();
  });

  it("空文字ではTODOが追加されない", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.click(screen.getByRole("button", { name: "追加" }));

    expect(screen.getByText("タスクがありません")).toBeInTheDocument();
  });

  it("空白のみではTODOが追加されない", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.type(screen.getByPlaceholderText("新しいタスクを入力..."), "   ");
    await user.click(screen.getByRole("button", { name: "追加" }));

    expect(screen.getByText("タスクがありません")).toBeInTheDocument();
  });

  it("追加後に入力欄がクリアされる", async () => {
    const user = userEvent.setup();
    render(<Home />);

    const input = screen.getByPlaceholderText("新しいタスクを入力...");
    await user.type(input, "テスト");
    await user.click(screen.getByRole("button", { name: "追加" }));

    expect(input).toHaveValue("");
  });

  it("チェックボックスで完了/未完了を切り替えられる", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.type(screen.getByPlaceholderText("新しいタスクを入力..."), "タスク1");
    await user.click(screen.getByRole("button", { name: "追加" }));

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it("完了したTODOに取り消し線が付く", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.type(screen.getByPlaceholderText("新しいタスクを入力..."), "タスク1");
    await user.click(screen.getByRole("button", { name: "追加" }));

    const todoText = screen.getByText("タスク1");
    expect(todoText).toHaveClass("text-gray-900");

    await user.click(screen.getByRole("checkbox"));
    expect(todoText).toHaveClass("line-through", "text-gray-400");
  });

  it("TODOを削除できる", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.type(screen.getByPlaceholderText("新しいタスクを入力..."), "削除するタスク");
    await user.click(screen.getByRole("button", { name: "追加" }));
    expect(screen.getByText("削除するタスク")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "削除" }));
    expect(screen.queryByText("削除するタスク")).not.toBeInTheDocument();
    expect(screen.getByText("タスクがありません")).toBeInTheDocument();
  });

  it("複数のTODOを追加・個別に削除できる", async () => {
    const user = userEvent.setup();
    render(<Home />);

    const input = screen.getByPlaceholderText("新しいタスクを入力...");
    const addButton = screen.getByRole("button", { name: "追加" });

    await user.type(input, "タスクA");
    await user.click(addButton);
    await user.type(input, "タスクB");
    await user.click(addButton);
    await user.type(input, "タスクC");
    await user.click(addButton);

    expect(screen.getByText("タスクA")).toBeInTheDocument();
    expect(screen.getByText("タスクB")).toBeInTheDocument();
    expect(screen.getByText("タスクC")).toBeInTheDocument();

    const deleteButtons = screen.getAllByRole("button", { name: "削除" });
    await user.click(deleteButtons[1]); // タスクBを削除

    expect(screen.getByText("タスクA")).toBeInTheDocument();
    expect(screen.queryByText("タスクB")).not.toBeInTheDocument();
    expect(screen.getByText("タスクC")).toBeInTheDocument();
  });

  it("Enterキーでフォーム送信してTODOを追加できる", async () => {
    const user = userEvent.setup();
    render(<Home />);

    const input = screen.getByPlaceholderText("新しいタスクを入力...");
    await user.type(input, "Enterで追加{Enter}");

    expect(screen.getByText("Enterで追加")).toBeInTheDocument();
  });
});
