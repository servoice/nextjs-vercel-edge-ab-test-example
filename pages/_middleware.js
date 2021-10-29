import { NextResponse } from 'next/server';
import { getCohort } from '../experiment/ab-testing';
import { COHORTS, COOKIE_NAME } from '../experiment/exp001';

export function middleware(req) {
  // Get the cohort cookie
  const exp001 = req.cookies[COOKIE_NAME] || getCohort(COHORTS);
  const res = NextResponse.rewrite(`/${exp001}`);

  // For a real a/b test you'll want to set a cookie expiration
  // so visitors see the same experiment treatment each time
  // they visit your site

  // Add the cohort name to the cookie if its not there
  if (!req.cookies[COOKIE_NAME]) {
    res.cookie(COOKIE_NAME, exp001);
  }

  return res;
}
