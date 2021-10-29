# Next.js + Vercel Edge Functions + Amplitude A/B Test

This sample app shows you how to set up a simple A/B test with Vercel Edge Functions. In this example, we run a simple 50/50 split experiment with button colors and log the results to amplitude for analysis.

![Example App](https://github.com/servoice/nextjs-vercel-edge-ab-test-example/blob/main/public/example.png?raw=true)

![Amplitude Dash](https://github.com/servoice/nextjs-vercel-edge-ab-test-example/blob/main/public/amplitude-dash.png?raw=true)

## Deploy your own

Deploy the example using Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fservoice%2Fnextjs-vercel-edge-ab-test-example&env=NEXT_PUBLIC_AMPLITUDE&envDescription=API%20Keys%20Needed%20to%20Deploy&project-name=nextjs-vercel-edge-function-a-b-test&repo-name=nextjs-vercel-edge-function-a-b-test)

## How to use

Git clone this repository, add in your `NEXT_PUBLIC_AMPLITUDE` API key in a `.env.local` file

```bash
npm install && npm run dev

```
