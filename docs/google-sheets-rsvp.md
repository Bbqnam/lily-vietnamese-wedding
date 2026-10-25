# Connect RSVP responses to Google Sheets

The website is already prepared for a Google Apps Script Web App. Complete the
steps below once, then add the generated URL to Vercel.

1. Create a Google Sheet named `Nam & Linh Wedding RSVP`.
2. In that sheet, open **Extensions → Apps Script**.
3. Replace the contents of `Code.gs` with
   [`google-apps-script/Code.gs`](../google-apps-script/Code.gs).
4. Click **Deploy → New deployment**.
5. Choose **Web app** and use these settings:
   - **Execute as:** Me
   - **Who has access:** Anyone
6. Authorize the script and copy the Web App URL. The correct URL ends in
   `/exec`, not `/dev`.
7. In Vercel, add the production environment variable:
   - Name: `VITE_RSVP_ENDPOINT`
   - Value: the copied `/exec` URL
8. Redeploy the production site so Vite can include the environment variable.

The script creates an `RSVP` worksheet automatically with columns for received
time, guest name, attendance, celebration, message, language, and submission
ID. Keep the Google Sheet private; only the Web App needs anonymous access so
wedding guests can submit the form without signing into Google.

After deployment, submit one clearly labeled test response and confirm that a
new row appears in the `RSVP` worksheet.
