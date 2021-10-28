import { NextResponse } from 'next/server';
import { getCohort } from '../experiment/ab-testing';
import { COHORTS, COOKIE_NAME } from '../experiment/exp001';

export function middleware(req) {
  // Get the bucket cookie
  const exp001 = req.cookies[COOKIE_NAME] || getCohort(COHORTS);
  const res = NextResponse.rewrite(`/${exp001}`);

  // Add the bucket to cookies if it's not there
  if (!req.cookies[COOKIE_NAME]) {
    res.cookie(COOKIE_NAME, exp001);
  }

  return res;
}
