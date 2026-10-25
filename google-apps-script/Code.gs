const RSVP_SHEET_NAME = "RSVP";
const RSVP_HEADERS = [
  "Received at",
  "Name",
  "Attendance",
  "Celebration",
  "Message",
  "Language",
  "Submission ID",
];

function doGet() {
  return jsonResponse({ ok: true, service: "Nam & Linh RSVP" });
}

function doPost(event) {
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);

    const payload = JSON.parse(event.postData && event.postData.contents ? event.postData.contents : "{}");
    const name = cleanCell(payload.name);
    const attendance = payload.attending === "accept" || payload.attending === "decline"
      ? payload.attending
      : "";

    if (!name || !attendance) {
      throw new Error("Name and attendance are required.");
    }

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    if (!spreadsheet) {
      throw new Error("This script must be bound to the RSVP Google Sheet.");
    }

    let sheet = spreadsheet.getSheetByName(RSVP_SHEET_NAME);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(RSVP_SHEET_NAME);
    }

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(RSVP_HEADERS);
      sheet.getRange(1, 1, 1, RSVP_HEADERS.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date(),
      name,
      attendance,
      attendance === "decline" ? "" : cleanCell(payload.event),
      cleanCell(payload.wishes),
      cleanCell(payload.language),
      cleanCell(payload.submissionId),
    ]);

    return jsonResponse({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, error: String(error) });
  } finally {
    if (lock.hasLock()) {
      lock.releaseLock();
    }
  }
}

function cleanCell(value) {
  const text = String(value == null ? "" : value).trim().slice(0, 2000);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function jsonResponse(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
