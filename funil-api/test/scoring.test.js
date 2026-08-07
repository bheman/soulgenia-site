import test from "node:test";
import assert from "node:assert/strict";
import { buildRoutingTarget, scoreSoulGeniaLead } from "../src/scoring.js";
import {
  hardDisqualifierFixture,
  nurtureFixture,
  qualifiedFixture,
  waitlistFixture
} from "./fixtures.js";

test("routes a point-scale qualified lead to assisted trial", () => {
  const result = scoreSoulGeniaLead(qualifiedFixture);

  assert.equal(result.scoring_version, "soulgenia-v1-2026-06-23");
  assert.equal(result.score, 11);
  assert.equal(result.route, "qualified_trial");
  assert.deepEqual(result.hard_disqualifiers, []);
  assert.match(buildRoutingTarget(result.route, qualifiedFixture.answers), /^https:\/\/wa\.me\/554885040633/);
});

test("routes a mid-score clear pain lead to nurture", () => {
  const result = scoreSoulGeniaLead(nurtureFixture);

  assert.equal(result.score, 7);
  assert.equal(result.route, "nurture");
});

test("routes a low-score curiosity lead to waitlist poor fit", () => {
  const result = scoreSoulGeniaLead(waitlistFixture);

  assert.equal(result.score, 1);
  assert.equal(result.route, "waitlist_poor_fit");
});

test("hard disqualifier overrides a high score", () => {
  const result = scoreSoulGeniaLead(hardDisqualifierFixture);

  assert.equal(result.route, "hard_disqualified");
  assert.ok(result.score >= 5);
  assert.ok(result.hard_disqualifiers.includes("spam_or_scraping_intent"));
});
