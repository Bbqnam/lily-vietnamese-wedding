const RSVP_SHEET_NAME = "RSVP";
const RSVP_HEADERS = [
  "Received at",
  "Name",
  "Attendance",
  "Celebration",
  "Message",
  "Language",
  "Submission ID",
  "Number of people",
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

    // Older website versions omit guestCount. Leave that value unknown.
    const guestCount = attendance === "decline" ? 0
      : payload.guestCount == null ? "" : Number(payload.guestCount);
    if (guestCount !== "" && attendance === "accept" &&
        (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 5)) {
      throw new Error("Number of people must be an integer from 1 to 5.");
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

    // Append missing headers without moving existing columns or guest responses.
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    RSVP_HEADERS.forEach(function (header) {
      if (headers.indexOf(header) === -1) {
        headers.push(header);
        sheet.getRange(1, headers.length).setValue(header).setFontWeight("bold");
      }
    });

    const values = {
      "Received at": new Date(),
      "Name": name,
      "Attendance": attendance,
      "Celebration": attendance === "decline" ? "" : cleanCell(payload.event),
      "Message": cleanCell(payload.wishes),
      "Language": cleanCell(payload.language),
      "Submission ID": cleanCell(payload.submissionId),
      "Number of people": guestCount,
    };
    sheet.appendRow(headers.map(function (header) {
      return Object.prototype.hasOwnProperty.call(values, header) ? values[header] : "";
    }));

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
