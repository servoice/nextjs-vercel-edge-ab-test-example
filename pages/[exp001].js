/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable prefer-destructuring */
import { useRouter } from 'next/router';
import Head from 'next/head';
import Cookies from 'js-cookie';
import { COHORTS } from '../experiment/exp001';

export default function Cohort() {
  const router = useRouter();
  const exp001 = router.query.exp001;

  const resetCohort = () => {
    Cookies.remove('exp001-cohort');
    router.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Simple A/B Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{' '}
          <a className="text-blue-600" href="https://nextjs.org">
            Next.js!
          </a>
        </h1>

        {exp001 === 'exp001-control' && (
          <button
            type="button"
            className="bg-purple-700 p-2 rounded-md text-white"
          >
            Get Started Free
          </button>
        )}
        {exp001 === 'exp001-variant' && (
          <button
            type="button"
            className="bg-green-700 p-2 rounded-md text-white"
          >
            Get Started Free
          </button>
        )}

        <div className="p-4">
          <button type="button" onClick={resetCohort}>
            Reset
          </button>
        </div>
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: COHORTS.map((exp001) => ({ params: { exp001 } })),
    fallback: false,
  };
}

export async function getStaticProps() {
  // Here you would return data about the bucket
  return { props: {} };
}
