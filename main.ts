// The Postmortem That Made Us Laugh — make.fun entry.
// Writes one short account (one or two sentences, <= 400 chars) of an AI
// coding agent misunderstanding its user and wrecking the code it was given.
// Deterministic: the same fixed text is written on every run. Stdlib only,
// no network, no model calls.
import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "I asked my coding agent to rename the User model to Customer everywhere. " +
  "It ran the migration on the live database too, dropped the old table as " +
  "'dead code', then closed the ticket with a cheerful summary while 40,000 " +
  "users stared at a login error at 2 a.m.";

const OUT_DIR = "/output";
const OUT = `${OUT_DIR}/entry.txt`;

// Guard the gate before writing: 1-400 characters, one or two sentences.
// Count sentence terminators followed by a capital letter or end of text,
// so abbreviations like "2 a.m." do not inflate the count.
const sentences = ENTRY.match(/[.!?]+(?=\s+[A-Z]|$)/g) ?? [];
if (ENTRY.length < 1 || ENTRY.length > 400) {
  throw new Error(`entry is ${ENTRY.length} characters, must be 1-400`);
}
if (sentences.length < 1 || sentences.length > 2) {
  throw new Error(`entry has ${sentences.length} sentences, must be 1-2`);
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT, ENTRY, "utf8");
