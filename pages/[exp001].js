/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-one-expression-per-line */
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Cookies from 'js-cookie';
import { COHORTS } from '../experiment/exp001';
import {
  amplitudeInit,
  logEvent,
  logExperimentExposure,
} from '../libs/amplitude';

export default function Cohort({
  btnColor,
  experimentCohort,
  experimentName,
}) {
  const router = useRouter();

  // remove cookies for testing and logging to amplitude
  const resetCohort = () => {
    const allCookies = Cookies.get();
    Object.keys(allCookies).map((cookie) => {
      if (cookie.startsWith('amp_')) {
        Cookies.remove(cookie);
      }
    });
    Cookies.remove('exp001-cohort');
    router.reload();
  };

  useEffect(() => {
    // if browser initialize amplitude
    if (typeof window !== 'undefined') {
      amplitudeInit();
      logExperimentExposure(experimentName, experimentCohort);
    }
  }, []);

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
        <div className="py-2 text-xl">
          <p>
            The button color below will change based on the
            user&apos;s cohort. Users in the control will see a{' '}
            <span className="text-purple-700 font-bold">Purple</span>{' '}
            button, while users in the variant will see a{' '}
            <span className="text-blue-700 font-bold">Blue</span>{' '}
            button.
          </p>
        </div>
        <div className="flex flex-col space-y-2 py-2">
          <button
            type="button"
            // log the amplitude event for our goal of sign up
            onClick={() => logEvent('Clicked Get Started Free')}
            className={`${btnColor} p-2 rounded-md text-white`}
          >
            Get Started Free
          </button>
          <div>
            <pre>{experimentCohort}</pre>
          </div>
        </div>

        <div className="p-4">
          <button type="button" onClick={resetCohort}>
            Reset Cohort
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
