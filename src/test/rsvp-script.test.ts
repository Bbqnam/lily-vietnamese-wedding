import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { describe, expect, it } from "vitest";

const source = readFileSync("google-apps-script/Code.gs", "utf8");
const originalHeaders = ["Received at", "Name", "Attendance", "Celebration", "Message", "Language", "Submission ID"];

function submit(payload: Record<string, unknown>, existingRows: unknown[][] = []) {
  const rows = existingRows.map((row) => [...row]);
  const range = (row: number, column: number, _height?: number, width = 1) => ({
    getValues: () => [rows[row - 1].slice(column - 1, column - 1 + width)],
    setValue(value: unknown) { rows[row - 1][column - 1] = value; return this; },
    setFontWeight() { return this; },
  });
  const sheet = {
    getLastRow: () => rows.length,
    getLastColumn: () => rows[0]?.length ?? 0,
    appendRow: (row: unknown[]) => rows.push([...row]),
    getRange: range,
    setFrozenRows: () => {},
  };
  const context = {
    LockService: { getScriptLock: () => ({ waitLock() {}, hasLock: () => true, releaseLock() {} }) },
    SpreadsheetApp: { getActiveSpreadsheet: () => ({ getSheetByName: () => rows.length ? sheet : null, insertSheet: () => sheet }) },
    ContentService: { MimeType: { JSON: "json" }, createTextOutput: (text: string) => ({ setMimeType: () => JSON.parse(text) }) },
    console: { error() {} },
    event: { postData: { contents: JSON.stringify(payload) } },
  };
  const result = runInNewContext(`${source}\ndoPost(event);`, context);
  return { rows, result };
}

const accepted = { name: "Test guest", attending: "accept", event: "Both", wishes: "Hello", language: "en", submissionId: "test", guestCount: 5 };

describe("Google Sheets RSVP guest counts", () => {
  it("creates a new sheet and stores a numeric count", () => {
    const { rows, result } = submit(accepted);
    expect(result.ok).toBe(true);
    expect(rows[0][7]).toBe("Number of people");
    expect(rows[1].slice(1)).toEqual(["Test guest", "accept", "Both", "Hello", "en", "test", 5]);
  });

  it("adds the column without changing existing responses", () => {
    const oldRow = ["old date", "Existing guest", "accept", "Both", "Hello", "vi", "old"];
    const { rows } = submit(accepted, [originalHeaders, oldRow]);
    expect(rows[0]).toEqual([...originalHeaders, "Number of people"]);
    expect(rows[1]).toEqual(oldRow);
    expect(rows[2][7]).toBe(5);
  });

  it("writes to the correct columns when headers have been reordered", () => {
    const { rows } = submit(accepted, [["Name", "Number of people", ...originalHeaders.filter((header) => header !== "Name")]]);
    expect(rows[1][0]).toBe("Test guest");
    expect(rows[1][1]).toBe(5);
  });

  it("records zero people and no celebration for a decline", () => {
    const { rows } = submit({ ...accepted, attending: "decline" });
    expect(rows[1][7]).toBe(0);
    expect(rows[1][3]).toBe("");
  });

  it("keeps the count unknown for an older website submission", () => {
    const { guestCount, ...legacy } = accepted;
    const { rows, result } = submit(legacy);
    expect(result.ok).toBe(true);
    expect(rows[1][7]).toBe("");
  });

  it.each([0, 6, -1, 1.5, "invalid", ""])("rejects invalid count %s without writing a row", (guestCount) => {
    const { rows, result } = submit({ ...accepted, guestCount });
    expect(result.ok).toBe(false);
    expect(rows).toHaveLength(0);
  });
});
