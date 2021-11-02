/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-one-expression-per-line */
import { useRouter } from 'next/router';
import Head from 'next/head';
import Cookies from 'js-cookie';
import { COHORTS } from '../experiment/exp001';

export default function Cohort() {
  const router = useRouter();
  const cohort = router.query.exp001;

  const removeCohort = () => {
    // removes experiment cookie
    Cookies.remove('exp001-cohort');
    // reloads the page to run middlware
    // and request a new cohort
    router.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Simple Vercel Edge Functions A/B Test</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="An example a/b test app built with NextJs using Vercel edge functions"
        />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Vercel Edge Functions{' '}
          <span className="bg-gradient-to-r from-purple-700 to-blue-600 text-transparent bg-clip-text font-bold">
            A/B Test Example
          </span>{' '}
          With Amplitude
        </h1>
        <div className="p-4">
          <pre>{cohort}</pre>
        </div>

        <button type="button" onClick={removeCohort}>
          Reset Cohort
        </button>
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

// set experiment props for the page
export async function getStaticProps({ params }) {
  const { exp001 } = params;
  switch (exp001) {
    // fallback to control if there isn't a match
    default:
      return {
        props: {
          btnColor: 'bg-purple-700',
          experimentCohort: 'exp001-control',
          experimentName: 'exp001',
        },
      };
    case 'exp001-control':
      return {
        props: {
          btnColor: 'bg-purple-700',
          experimentCohort: exp001,
          experimentName: 'exp001',
        },
      };
    case 'exp001-variant':
      return {
        props: {
          btnColor: 'bg-blue-700',
          experimentCohort: exp001,
          experimentName: 'exp001',
        },
      };
  }
}
