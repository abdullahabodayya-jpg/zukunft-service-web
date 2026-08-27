# Change request SC1–SC15 — analysis

Source: `Zukunft_Service_Website_Changes_SC1-SC15.pdf`, dated 23.08.2026, marked
"final approved version". Its own rule: the report's text wins over any
handwriting or old copy visible in the screenshots.

**Status: implemented and audited.** Only the client-supplied assets remain.

Every screen was re-verified against the report by a three-way independent audit
on 24 Aug 2026, not just marked done by whoever wrote it.

| Screen | Audit result |
|---|---|
| SC1 service numbers | done |
| SC2 hero promise + card link | done |
| SC3 / SC4 why-us copy | done |
| SC5 cleaning home section | done, incl. the photo beside the intro |
| SC6 transparency support points | done |
| SC7 referral categories + trust box | done |
| SC8 contact, hours, privacy note, today highlight | done |
| SC9 cleaning out of the office grid | done |
| SC10 five cards + trust badges | done |
| SC11 Einbürgerung three groups | done |
| SC12 intro + trolley icon | done |
| SC13 eight types | done, photo slots wired |
| SC14 / SC15 why-us layout | done |

A fourth pass on 25 Aug 2026 re-read all fifteen screens against the built
output and closed the last two code gaps:

* **SC11's column layout** was never built. The three groups were correct but
  stacked down the page on every viewport. `ServiceContent.blockLayout` now
  opts the Einbürgerung page into three columns on desktop, two plus a
  full-width third on tablet, stacked on mobile. Opt-in per service, not
  inferred from the block count: study-visa also has three blocks, one of them
  a highlight that needs the full measure.
* **SC10 card 3 promised post-arrival support in Arabic that the Arabic page
  never delivered.** The card said housing, registration and enrolment; the
  page had only "الدراسة والجامعة" and "التأشيرات". The German page carried the
  block all along. Added to the Arabic page, which is what decision §1.2
  actually implies and what the PDF's own checklist ("كل نص عربي له نص ألماني
  مقابل بنفس المعنى والترتيب") requires.

**Photography is wired as of 25 Aug 2026** and needs no further code. Fifteen
slots are declared in `src/content/shared/photos.ts`; `src/lib/photo.ts`
resolves each against `public/` at build time, so dropping a file in and
rebuilding activates its surface. Verified by staging all fifteen and
confirming every one renders through `next/image` at q=80 with the correct
per-locale alt, then removing them again.

The cleaning filenames are German while the type ids are English, and only
`restaurants` coincides - a `cleaning-${id}.jpg` template would have compiled,
type-checked and silently 404'd seven tiles out of eight. The map is explicit
for that reason.

All fifteen photographs landed on 26 Aug 2026 and every slot is live. Each
file was identified by opening it rather than by filename order: eleven
arrived with UUID names that said nothing about which service they belonged
to, and a guess would have put the insurance policy on the property page.

The § 5 DDG Impressum was completed on 26 Aug 2026: Zukunft Service
Dienstleistungen & Reinigung, Einzelunternehmen, owner Mohamad Zyada. The
page's warning banner is gone and `hasUnresolvedPlaceholders()` now returns
false, so a release check gated on it will pass.

Still owed by the client: a named sign-off on the Arabic service copy.

The three decisions in §1 were confirmed on 24 Aug 2026: hours corrected to
Thu 10-15 / Fri 10-13, the locales converge on post-arrival support, and the
process step numbers stay.

---

## 1. Decisions needed before a single line changes

### 1.1 The opening hours reverse an instruction you gave me

SC8 mandates:

| Day | Hours |
|---|---|
| Mon–Wed | 10:00–16:00 |
| **Thu** | **10:00–15:00** |
| **Fri** | **10:00–13:00** |
| Sat / Sun | closed |

On 20 August you told me *"كل يوم من الساعة ١٠ ل١٦ عدا السبت والاحد"*. I built
uniform Mon–Fri 10:00–16:00 (`src/content/shared/nap.ts:59-67`) and left a
comment there recording that the client's live draft published Thu 10–15 /
Fri 10–13, concluding the draft should be corrected.

This PDF says the draft was right and we are wrong.

These hours feed `openingHoursSpecification` in the LocalBusiness JSON-LD, which
Google surfaces directly in Search and Maps. **Get one line of written
confirmation before changing them** — not because the PDF is ambiguous, but
because it contradicts a direct instruction and the cost of being wrong lands on
the client's customers standing outside a closed office.

### 1.2 The DE/AR structural asymmetry is retired

The first PDF documented that the Arabic brochure omits the "Auch nach der
Ankunft" post-arrival block, and that Arabic merges the finance sub-sections. I
honoured both and documented them as deliberate in `src/content/ar/services.ts`.

SC10 card 3 now gives **both** languages the same text including post-arrival
support, and SC10 card 4 renames finance to "Finanz- und Versicherungsthemen /
الشؤون المالية والتأمين". The locales converge where they used to diverge.

That is fine, but it retires an earlier documented decision. Flagging so it is a
choice rather than a silent reversal.

### 1.3 Do the process-step numbers stay?

SC1 says remove "all service numbers such as 01, 02, 06". Its screenshot shows
the two **pillar** cards, so those numerals clearly go.

The **process** section also uses 01/02/03 (`Process.tsx:27`). Those are steps in
a sequence, not services — numbering them carries real meaning. My reading is
they stay. Confirm rather than guess.

---

## 2. Hard blockers

### 2.1 Eight cleaning photos — the project has zero images

SC13 requires eight cleaning cards, each with its own photo: homes/apartments,
offices/practices, schools, restaurants, shops, post-move/renovation,
entrances-stairwells, windows/glass. Consistent style, lighting and aspect
ratio; no people; no text or logos baked in.

Verified current state: **no `public/` directory exists at all**, no `next/image`
usage anywhere, no image tracked in git, not even a favicon. All iconography is
inline SVG or lucide vectors.

Nothing in SC5 or SC13 can be completed until the client supplies these or
licenses stock. This is the single largest external dependency in the request.

Note: the content model has been carrying `imageAlt` fields since day one —
hero, cleaning, and every service — that no component renders. SC13 finally
makes them live.

### 2.2 The cleaning-trolley icon does not exist in lucide

SC12 replaces the spray can with a line-art cleaning trolley matching the site's
icon weight and colour. `lucide-react` has no cleaning-cart glyph, and
`IconName` (`src/types/content.ts:64-84`) is a closed union, so this needs either
the nearest lucide equivalent or a hand-drawn inline SVG added to the union.

---

## 3. Traps — things that will not fail loudly

### 3.1 Removing `cleaning` from `SERVICE_IDS` breaks the contact form silently

Most call sites fail at compile time, which is what we want:

- `Record<ServiceId, ServiceMeta>` in `services.meta.ts:19`
- `Record<ServiceId, ServiceContent>` in `de/services.ts:282`, `ar/services.ts:253`
- `NavTarget { kind: 'service' }` at `de/site.ts:88`, `ar/site.ts:82`

But the contact form does not. `contact-schema.ts:26` builds
`SERVICE_VALUES = [...SERVICE_IDS, 'other']`, so the zod enum quietly loses
`cleaning`, while the dropdown option `{ value: 'cleaning' }`
(`de/site.ts:354`, `ar/site.ts:310`) is typed only as `SelectOption { value: string }`
and raises nothing.

Result: compiles, builds, deploys — then rejects every cleaning enquiry at
runtime. `npm run verify` cannot catch it. **The form must keep `cleaning` as a
selectable category even after it leaves the office grid**, because customers
still enquire about cleaning.

### 3.2 "Highlight the current day" collides with static rendering

SC8 asks for the current day to be highlighted. Every page is prerendered at
build time, so computing "today" on the server freezes whichever day the build
ran and is wrong for the next six days. It must be client-side.

`FormattedOpeningHour` (`src/lib/format.ts:60-68`) has no `isToday` field, so the
interface needs extending. Also mind the timezone: the business is in Dortmund,
the visitor may not be.

### 3.3 Scope list items use the string itself as the React key

`Scope.tsx:30` and `:41` use `key={item}`. New copy must keep every item unique
within its list or React collides.

---

## 4. Screen-by-screen inventory

### SC1 — Remove service numbers
| Target | Change |
|---|---|
| `ServicesGrid.tsx:44-46` | delete the `padStart` numeral span (the only computed number) |
| `de/services.ts` L28,67,107,173,234,283 | reword `eyebrow` — the field is **required**, so it cannot simply be emptied |
| `ar/services.ts` L38,77,117,166,207,255 | same |
| `Pillars.tsx:23-25` + `pillar.index` in both site files | remove 01/02 |
| `ServiceMeta.order` | **keep** — still the sort key for `SERVICES_IN_ORDER`, just no longer rendered |

### SC2 — Services intro + Einbürgerung card
New DE/AR headline, intro and card description (verbatim in the PDF). Card link
unified to **"تفاصيل الخدمة" / "Mehr zur Leistung"**.

Targets: `de/site.ts:183-194`, `ar/site.ts:164-173`, plus `cardDescription` for
`authorities` in both `services.ts` files.

### SC3 + SC4 — "Why us", all five features rewritten
Complete replacement of heading, lead and all five point titles/bodies in both
locales (`de/site.ts:196-246`, `ar/site.ts:175-217`).

The five ids (`personal`, `one-hand`, `multilingual`, `network`, `tailored`) map
cleanly onto the new features, so `WHY_IDS` does not need to change — but check
each mapping rather than assuming.

Also adds a helper line above the section ("unsure which service fits?").

### SC5 — Cleaning section on the home page
Rebuild: professional photo beside the intro, service cards, a trust bar, then a
quote CTA. New heading, intro, trust bar, CTA title/text/button in both locales.

**The list here must match SC13's final eight types exactly.** See §5.1 — there
are currently two diverging sources for this content.

### SC6 — Transparency: what we actually provide
New heading/intro, one card titled "Praktische und strukturierte Unterstützung"
with **6 numbered points**, plus a **separate strip** for cleaning that must not
be merged into the office support list.

Target: `Scope.tsx` and the `scope` key in both site files. This is a structural
rebuild, not a copy swap.

### SC7 — Transparency: when we refer you to a specialist
The "what we don't do" list is reframed positively into **5 categories** naming
who legally may do each thing, then a **gold trust box** ("Der nächste Schritt
bleibt klar").

Current `Scope.tsx` renders a two-column do/don't grid — that layout goes.

### SC8 — Contact and opening hours
New eyebrow, headline, intro, **privacy warning** ("don't send personal
documents in the first message" — currently absent), three button labels, reply
line, the revised hours table (§1.1), hours note, address, map button.

Plus: highlight the current day (§3.2); the floating WhatsApp button must not
cover the section (§5.4).

### SC9 — Remove cleaning from the office services list
Delete the cleaning card from the office grid in both locales. Redistribute
without renumbering (numbers are gone anyway). Cleaning survives only in its own
section and page.

See §3.1 for the silent form breakage.

### SC10 — Office services intro + the final five cards
Kill the "six domains" headline. **Only the Arabic hard-codes the count**
(`ar/site.ts:167` — `'ستة مجالات، وجهة واحدة'`); the German headline is the
neutral `'Wie können wir Ihnen helfen?'`. The two locales' headlines are
structurally different, not translations.

New DE/AR intro, trust badges, and five card titles + short descriptions.
Explicit instruction: **two columns on desktop and iPad**, one on mobile — which
also solves the ragged last row that five cards would leave in the current
`lg:grid-cols-3`.

The PDF twice insists the office list is **five cards**, not two.

### SC11 — Einbürgerung service page
Restructure the flat 10-item list into **three groups**: Anträge und
Einbürgerung (4), Personenstandsdokumente (3), Ausländische Dokumente und
Reisedokumente (3). Plus a legal note, a contact CTA, and neutral document icons
with **no national flags**.

Target: the `authorities` entry in both `services.ts` files — currently one
untitled list block.

### SC12 — Cleaning page intro and icon
New heading and intro; remove "Leistung 06"; swap the spray-can icon (§2.2).

### SC13 — Eight cleaning types with photos
Replace the text list with eight image cards, each with title, one-line
description and its own photo. Closing text. Responsive: 3–4 per row on desktop,
2 on iPad, 1 on mobile, `object-fit: cover` with per-image `object-position`,
checked on iPad so the subject is not cropped.

Blocked on §2.1.

### SC14 + SC15 — "Why us" placement after the cleaning page
Not a new section: the same "Warum Zukunft Service?" block from SC3/SC4, with a
clear visual separator so it does not read as being about cleaning only.

Layout: the first feature (**Persönliche Betreuung und klare Kommunikation**)
full width as the headline promise, then the remaining four in a 2×2 grid,
stacked on mobile.

`Why.tsx` currently has **no index branching** — all five points render
identically. This needs new markup.

---

## 5. Pre-existing problems this request surfaces

### 5.1 Cleaning content has two sources of truth that already disagree
| Source | German | Arabic |
|---|---|---|
| `site.ts` → home section | 10 one-word nouns | **6 descriptive phrases** |
| `services.ts` → detail page | 10 items | 10 items |

SC5 requires the home list to match SC13's eight. Fix by collapsing to one
shared source rather than editing both — otherwise they drift again.

### 5.2 The German card link renders a double arrow
`de/site.ts:190` is `'Mehr zu dieser Leistung →'` and `ServicesGrid.tsx:51`
appends another `{arrow}`. SC2's rename fixes it **provided the glyph is dropped
from the string**, not carried over.

### 5.3 Scope items already diverge between locales
German has 6 do / 4 don't; Arabic has 7 do / 5 don't. The type permits it
(`readonly string[]`). SC6/SC7 replace both, so this resolves itself — but
whoever writes the new lists should keep them parallel.

### 5.4 The FAB overlap the PDF complains about is real
`WhatsAppFab` is a Server Component mounted unconditionally
(`layout.tsx:110`) with `fixed bottom-5 end-5 z-40` and no conditional logic. In
`#kontakt` it floats over a section that already has a full-size WhatsApp button
— a duplicate affordance. Fixing it means making the FAB client-side with an
IntersectionObserver.

### 5.5 Dead code
`siblingServices()` in `services.meta.ts:104-106` is imported by nothing; the
detail page inlines the same filter at `[slug]/page.tsx:52`.

### 5.6 `NoticeBlock` is defined and handled but never used
`types/content.ts:151-156` and `ServiceBlocks.tsx` support `kind: 'notice'`, and
no content uses it. SC11's legal note and SC7's categories are natural fits.

---

## 6. Legal wording

Page 2 supplies a new site-wide disclaimer in both languages. Today the hedge
lives in `HEDGE_NOTICE` — a module-private const per locale
(`de/site.ts:28-31`, `ar/site.ts:25-27`) feeding exactly two render sites:
`scope.notice` and `form.hedgeNotice`. Editing it changes both at once, which is
the intent.

Per-service `legalNote` is separate: German has two **inline literals** that can
drift (`de/services.ts:222`, `:271`); Arabic uses a shared `LEGAL_NOTE` const
(`ar/services.ts:30-33`). Worth giving German the same constant.

`legalNote` is typed optional despite the doc comment calling it mandatory
wherever `legalSensitivity` is `'high'`. Not compiler-enforced.

---

## 7. Suggested build order

The PDF's own priority (page 30) — and it is the right one:

1. **Separate cleaning and unify its content** (SC9, SC5, SC12, SC13 structure) —
   the architectural change, everything else sits on top
2. **Replace the DE/AR copy** (SC2, SC3, SC4, SC6, SC7, SC8, SC10, SC11)
3. **Images and icons** (SC13 photos, SC12 trolley) — blocked on the client
4. **Responsive and final testing** (SC14 layout, FAB, current-day highlight)

Do §1's three decisions first. Steps 1 and 2 are independent of the photo
blocker, so work can start before the images arrive.

---

## 8. Questions the PDF itself raises for the client

Page 30 lists four, and they change wording we would otherwise ship as claims:

1. Is there genuinely a fixed contact person per customer? If not, soften "a
   contact who knows the details of your case".
2. Can the stated response time actually be honoured? If not, promise less.
3. Does "reliable team" reflect an actual cleaning crew?
4. Is accompaniment to appointments genuinely permitted by the offices in
   question? The text stays conditional either way.
