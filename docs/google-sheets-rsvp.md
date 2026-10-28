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
ID, plus number of people. Keep the Google Sheet private; only the Web App needs anonymous access so
wedding guests can submit the form without signing into Google.

After deployment, submit one clearly labeled test response and confirm that a
new row appears in the `RSVP` worksheet.

## Update an existing deployment

1. Open the existing RSVP Google Sheet, then **Extensions → Apps Script**.
2. Replace `Code.gs` with the updated script in this repository and save.
3. Choose **Deploy → Manage deployments → Edit** and select **New version**.
4. Click **Deploy**. Keep the existing deployment URL so the website endpoint
   does not need to change.
5. Deploy the updated website after the script has been updated.
6. Submit a clearly labeled test RSVP for 5 people and check the new
   **Number of people** column. Also check a declined response records 0.

The script adds the new column automatically on the next valid submission.
Existing responses and columns are preserved. Old responses stay blank in
this column because their party size is unknown. Accepted responses from
older website versions also leave the count blank. New accepted responses
send an integer from 1 to 5, including the person filling in the form.
For guests attending both celebrations, the count applies to each celebration.
