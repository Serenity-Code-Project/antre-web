# antre-web

Starter project for the Serenity Code class **AI-Assisted Development: End-to-End Efficient
Workflow**. Antre is the practice product of the class: a queue-number app for a small clinic or
shop. You practise on Antre, then apply each skill to a product of your own.

This repository is the web side: one page with the display board and a button to take a number.
Next.js, talking to [antre-api](https://github.com/Serenity-Code-Project/antre-api).

## Run

Start `antre-api` first (it listens on port 4000), then:

```sh
git clone https://github.com/Serenity-Code-Project/antre-web.git
cd antre-web
bun install
bun run dev      # http://localhost:3000
bun run build
```

`NEXT_PUBLIC_API_URL` points the page at the API. It defaults to `http://localhost:4000`.

## What works

The board shows the number being called, how many are waiting and the next five. It refreshes every
three seconds. "Ambil Nomor" takes a number and shows it to the visitor.

## What is missing

There is no staff panel, so nobody can call the next number. There are no tests, no agent
configuration beyond the block Next.js writes into `AGENTS.md`, and no CI. The starter is small and
imperfect on purpose. You find the gaps and add the missing parts during the class.

## Branches

`main` is the starter. Answer keys for the exercises that change this repository are added as
`answer/...` branches, the same way as in antre-api.

## Licence

MIT. See `LICENSE`.
