# Portfolio Analytics — Running it locally

The easiest way to use this tool is the hosted version — just open this link in your browser, no setup required:

**https://gumbyone.github.io/Gumby-s-Portfolio-analytics/**

If you'd rather run it on your own computer instead (offline use, company firewall, or just personal preference), follow the steps below for your operating system.

## Why you can't just double-click the file

Opening `index.html` directly by double-clicking it won't work — the app needs to fetch live stock prices and dividend data from the internet, and browsers block those requests when a page is opened this way (a security restriction, not a bug). The page needs to be served over a real local web address (`http://localhost:...`) for the data fetching to work. The steps below set that up.

## Step 1: Download the file

Download `index.html` from this repository and save it to a folder on your computer.

## Step 2: Start a local server

Pick whichever applies to you:

### Option A — You have Python (most Macs already do)

Open Terminal (Mac) or Command Prompt / PowerShell (Windows), navigate to the folder where you saved the file, and run:

```
python3 -m http.server 8080
```

(On some Windows installs, use `python` instead of `python3`.)

Leave that window open, then go to **Step 3**.

### Option B — You have Node.js installed

In the same kind of terminal window, navigate to the folder and run:

```
npx serve .
```

It will print a local address to open — leave the window running and go to **Step 3**.

### Option C — You don't have Python or Node, and don't want to install anything

Use the hosted link instead — see the top of this page. That's the zero-install option and is recommended unless you specifically need to run this offline.

## Step 3: Open it in your browser

Go to:

```
http://localhost:8080
```

(or whatever address your terminal printed in Option B)

You should see the Portfolio Analytics dashboard. From here, import your own CSV the same way as the hosted version.

## Step 4: When you're done

Go back to the terminal window and press `Ctrl+C` to stop the local server. Your data lives in your browser's local storage on this computer — it doesn't get uploaded anywhere, on the hosted version or the local one.

## Your data, either way

Whether you use the hosted link or run this locally, your portfolio CSV is only ever read inside your own browser. Nothing is sent to a server, to GitHub, or to anyone else. Closing the tab or stopping the local server doesn't erase anything you've already entered — it's saved in your browser until you clear it yourself.
