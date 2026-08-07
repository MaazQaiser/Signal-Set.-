# Signal Smart Contract — Context

Reference for product, design, QA, and engineering. Covers **what** the flow does (layman) and **where/how** it lives in the codebase (tech).

---

## In plain English

### What is this?

Signal Smart Contract is a **fast way for sales users to start a contract** from Deals. They fill only the minimum needed info; the system **fills in what it already knows**; the result is a **draft** contract in SET — **not published** yet. The rest can be finished later.

### Who is it for?

Authorized **Signal** sales users, on **web and mobile**.

### Why does it exist?

Full contract setup is slow and repetitive. This flow:

- Auto-fills existing company / property / contact / billing data when possible  
- Uses sensible defaults (dates, payment method, billing occurrence, etc.)  
- Asks for mandatory fields only where required  
- Saves as **Draft**, not live / published  

### How does a user get there?

| Channel | Path a person takes |
|--------|----------------------|
| **Web** | Open Signal Deals → **Create** → **Create Smart Contract** → Smart Contract screen |
| **Mobile** | Open Signal Mobile Deals → **Create** → **Create Smart Contract** → Smart Contract screen |
| **Home (demo)** | Signal home → “Experience SET Web” or “Experience SET Mobile App”, then Create Smart Contract as above |

### What happens on the screen (user journey)

1. Click **Create** → **Create Smart Contract**  
2. Select or enter **Company** (name only) and/or **Property Address**  
3. System checks existing records and **auto-populates** what it finds  
4. User completes remaining required fields  
5. Add **services** (Dedicated and/or Patrol); if pricing is not profitable, use the **Pricing Calculator** side drawer to adjust rate  
6. Optionally add **On Demand** items  
7. Enter **billing** and **payment**  
8. Add **signees** / signatures  
9. Click **Create Contract** → **draft** contract is created (not published)  

### What “success” looks like

A new **draft / non-published** contract appears in the Deals module. The user did not have to publish or complete every optional detail to save progress.

---

## Product story (business rules)

Same structure and lingo as FilterGo Smart Contract; content is Signal-specific.

### Requirement statement

As an authorized Signal sales user, I want to create a Smart Contract from the Deals module using a faster data-entry flow with auto-population and defaults, so that I can capture the minimum required information in the field and create a draft contract efficiently. This flow will be available for both web and mobile.

### Scope

- Applies to **Signal** only (not FilterGo)  
- Creates a contract in **SET**  
- Contract is **not published** at this stage  

**In scope:** entry point, Smart Contract screen, required-field behavior, auto-population/defaults, create-contract action.  

**Out of scope:** full post-publish management, publishing/sending, ongoing lifecycle.

### Note

Fields marked with **(*)** are mandatory.

---

### 1) Entry point

In Deals, **Create** opens a menu with:

- Create Deal  
- Create Smart Contract  

Selecting **Create Smart Contract** opens the dedicated Smart Contract screen.

---

### 2) Company / property lookup & auto-population

**Company has a name only** — there is no company address field.

When the user selects or enters **Company** (name) and/or **Property Address**, the system checks whether matching records already exist.

**If they exist**, auto-populate available linked data, including:

- Company (name)  
- Property Address  
- Property Name  
- Industry Vertical  
- Associated Franchise  
- Property Source  
- Affiliation  
- Contact Details  
- Billing Information  
- Payment Information  
- Signee  

**If they do not exist**, the user enters the info; a **new company & property** are created when the contract is created, from the values on the form.

---

### 3) Proposal details

- Proposal Name*  
- Time Zone* — defaults to the user’s current time zone  

---

### 4) Company / property

- Company* (name only — no company address)  
- Property Address*  
- Property Name*  
- Industry Vertical*  
- Associated Franchise*  
- Property Source*  
- Affiliation  

**Property Source:** ALN, Costar, Referral  

**Affiliation:** Headquarters, Regional Office, Managed, Owned, Shared, Tenant  

---

### 5) Contact details

Contact details are optional (except where business rules require a Decision Maker for create).

Roles:

- Decision Maker  
- End User  
- Billing (also available lower under Billing Info)  

If contacts already exist, they auto-populate.

---

### 6) Proposal timing & service schedule

Signal does **not** use FilterGo’s Contract Start Date / Service Start Date / “Service start same as contract start date” pattern.

**Proposal-level (Proposal Details)**

- Proposal Name*
- Time Zone*
  - defaults to the user’s current time zone

**Service-level schedule (on each service)**

Schedule is set per service, not as a single contract start / service start pair:

- **Dedicated:** Start Time, End Time, Job Days (Sun–Sat)
- **Patrol:** visit sets with Start Time, End Time, Visits Per Day, Visit Days

**Billing cycle date (under Payment)**

- Cycle Reference Date* — included for Pre Bill & Post Bill; entered / adjusted in Payment (see Payment section)

Current system rules for Signal contracts apply.

---

### 7) Billing occurrence*

Defaults to **Weekly**.  

Options: Monthly, Bi-Weekly, Weekly, Event, Flat  

System shows services total, dispatch/on-demand contribution where applicable, tax, and grand total.

---

### 8) Services

User can add one or more services.

Default: one Dedicated service card.

Each service card shows:

- Service Name
- Weekly total for that service (currency / Weekly)
- Service type toggle: Dedicated | Patrol

User can click **Add another service**.

User can remove a service when more than one service exists.

---

#### Dedicated service

For each Dedicated service, user enters / selects:

Resource Type*

Options:

Dedicated Officer

Armed Officer

Unarmed Officer

Officer/Guard*

Officer Service Hrs/Week*

System shows:

Total {n} hrs/week

Hourly Rate ($)*

Start Time*

End Time*

Job Days*

Options: Sun, Mon, Tue, Wed, Thu, Fri, Sat (multi-select)

System shows:

service weekly subtotal

running services total

---

#### Patrol service

For each Patrol service, user enters / selects:

Resource Type*

Options:

Dedicated Officer

Armed Officer

Unarmed Officer

Visit(s) Per Week*

Price Per Visit ($)*

User can add one or more visit sets (Add Visit):

Start Time

End Time

Visits Per Day

Visit Days (Sun–Sat)

System shows:

per-day visit totals from visit sets

service weekly subtotal

running services total

---

#### Pricing calculator (when service is not profitable)

When required pricing inputs are complete, the system evaluates whether the service meets Signal profitability rules.

**Profitability thresholds (Signal)**

Net Profit: required greater than 12%

Labor Efficiency: required less than or equal to 64%

**If** the service is profitable  
**Then** user continues; suggested rate guidance may still be available for reference.

**If** the service is **not profitable**  
**Then**:

- System shows suggested rate / NPM guidance on the service (e.g. Suggested Rate and required NPM)
- System opens / presents the **Pricing Calculator** side drawer (**Profitability Overview**) so the user can correct pricing before finishing the draft

**Pricing Calculator side drawer includes:**

Hourly Rate ($) (or applicable rate for the service — editable; updates the service rate)

Net Profit indicator (with required threshold)

Labor Efficiency indicator (with required threshold)

Financial Metrics table (revenue, payroll, overhead, gross/net profit, etc.)

Billing cycle selector for metrics view: Weekly, Bi-Weekly, Monthly

User can adjust the rate in the drawer, review metrics, and close the drawer to continue editing the service.

Suggested rate / calculator entry remains available while the service stays below the profitability threshold.
---

### 9) On Demand

On Demand items are optional for draft create.

Section intro:

These items will be added to your monthly invoice, if utilised

Default rows:

1. Dispatch Request

2. Extra Job

User can also add custom invoice line items via **Line Item**.

---

#### 1. Dispatch Request — flow

**What it is**

Dispatch refers to a direct service request or call initiated by the customer to the home office.

**User flow**

1. User opens the On Demand section
2. User sees **1. Dispatch Request** with description
3. User selects **Billing Type***
4. System shows or hides rate fields based on Billing Type (see rules below)
5. User completes any required rate fields that appear
6. User continues to Extra Job / Line Item / rest of contract

**Billing Type* options**

Not Included

Flat-Rate

Charge Per Alarm

Non Billable

**If** Billing Type = **Not Included**  
**Then** no rate fields are shown (dispatch is not billed via this row)

**If** Billing Type = **Non Billable**  
**Then** no rate fields are shown (dispatch is tracked but not charged)

**If** Billing Type = **Flat-Rate**  
**Then** system shows:

Rate*

(Helper: Flat Rate is billed per invoicing settings in Payment Terms)

User enters the flat rate amount

**If** Billing Type = **Charge Per Alarm**  
**Then** system shows:

Rate ($)*

Peak Hours ($)

User enters standard rate and optional peak-hours rate

**If** Billing Type is cleared / changed  
**Then** fields that no longer apply are hidden; user only completes fields for the selected type

Dispatch Request is not required to create the draft contract, but if Flat-Rate or Charge Per Alarm is selected, the related rate fields required for that type must be completed when used.

---

#### 2. Extra Job (same section)

An extra job refers to the job generated on-the-fly in response to an immediate client request, outside the contract.

User enters:

Price Per Hour ($)*

---

#### Additional Line Item (same section)

User can click **Line Item** to add a custom invoice line.

For each line, user enters / selects:

Title*

Invoice Line Item* (Sub Contractor, Dedicated Security Officer, Roving Patrol Tours, Mobile Patrol)

Price ($)*

Quantity*

System shows line Total (Price × Quantity)

User can Save, Cancel, Edit, or Delete a line item.

---

On Demand is not required to create the draft contract.

---

### 10) Billing info (mandatory)

First Name*, Last Name*, Email*, Phone*, Country*, City*, State*, Zip Code*, Address*

**Behavior**

- If contacts already existed → billing may auto-populate  
- Checkbox: **Same as contact details** (when applicable; may be disabled when autofilled)  
- If checked and contacts were entered → billing matches Decision Maker / contact above  
- When address is entered → Country, City, State, Zip should auto-populate when available  

---

### 11) Payment

| Field | Options / rules |
|--------|------------------|
| Billing Type* | Pre Bill, Post Bill |
| Payment Method* | Credit Card (default), ACH, Bank Transfer |
| Payment Terms* | Due Upon Invoice, Net 30 |
| Cycle Reference Date* | For Pre Bill & Post Bill; can be manually changed by user |
| Contract Type* | Ongoing, Fixed Term |
| Billing Frequency* | Monthly, Weekly, Bi-Weekly |

---

### 12) Signee

Add one or more signees (Name, Title, Signee label). **Add Sign** opens the e-signature modal; user can add/save a signature.

---

### 13) Create contract action

After required info (and signatures as required), user clicks **Create Contract**.

- New contract in Deals  
- Full contract in **draft / non-published** state  

---

### Acceptance criteria (QA checklist)

- [ ] Open Create Smart Contract from Deals Create menu  
- [ ] Dedicated Smart Contract screen opens (web and mobile)  
- [ ] Existing company (by name) and/or property address auto-populates related data  
- [ ] Company is name-only (no company address field)  
- [ ] Contacts optional / skippable where allowed  
- [ ] Billing required; can autofill from contacts when available  
- [ ] Proposal Name and Time Zone available; Time Zone defaults to user’s current time zone  
- [ ] No FilterGo-style Contract Start / Service Start / “same as contract” on Signal  
- [ ] Per-service schedule available (Dedicated times/job days; Patrol visit sets)  
- [ ] Billing Occurrence defaults to Weekly  
- [ ] User can add Dedicated and/or Patrol services with required fields  
- [ ] Dedicated supports Resource Type, Officer/Guard, Hrs/Week, Hourly Rate, Start/End Time, Job Days  
- [ ] Patrol supports Resource Type, Visits/Week, Price Per Visit, and visit sets  
- [ ] System shows per-service weekly totals and running services total  
- [ ] When a service is not profitable, Suggested Rate / NPM guidance is shown  
- [ ] When a service is not profitable, Pricing Calculator (Profitability Overview) side drawer is presented  
- [ ] Pricing Calculator allows rate edit and shows Net Profit, Labor Efficiency, and Financial Metrics  
- [ ] On Demand optional; Dispatch Request supports Billing Type with conditional Rate / Peak Hours fields  
- [ ] Flat-Rate shows Rate*; Charge Per Alarm shows Rate ($) and Peak Hours ($); Not Included / Non Billable hide rates  
- [ ] Billing Type: Pre Bill, Post Bill  
- [ ] Payment Method defaults to Credit Card  
- [ ] Cycle Reference Date available for Pre/Post Bill under Payment  
- [ ] Signees + e-signature modal via Add Sign  
- [ ] Create Contract → draft in Deals  

---

## For engineers (tech)

### Tenant isolation

| | Signal | FilterGo |
|--|--------|----------|
| Home | `/signal` | `/filtergo` |
| Deals (web) | `/signal/deals` | `/filtergo/deals` |
| Contract (web) | `/signal/contract` | `/filtergo/contract` |
| Mobile deals | `/signal/mobile` | `/filtergo/mobile` |
| Mobile contract | `/signal/mobile-contract` | `/filtergo/mobile-contract` |

Signal routes are wrapped in `SignalTheme`. Keep Signal UI/logic under `src/pages/signal/` (and shared create-contract components under `src/components/createContract/` when reused).

### Routes (`src/App.tsx`)

| Path | Component |
|------|-----------|
| `/signal` | `SignalHomePage` |
| `/signal/deals` | `SignalDealsPage` |
| `/signal/contract` | `SignalCreateDispatchPage` (`CreateDispatchPage.tsx`) |
| `/signal/mobile` | `SignalMobileDealsPage` |
| `/signal/mobile-contract` | `SignalMobileContractPage` |

### Entry points in code

| Surface | File | Behavior |
|---------|------|----------|
| Web Deals → Create Smart Contract | `src/pages/signal/DealsPage.tsx` | `navigate('/signal/contract')` |
| Mobile Deals → Create Smart Contract | `src/pages/signal/MobileDealsPage.tsx` | `navigate('/signal/mobile-contract')` |
| Cancel (web contract) | `src/pages/signal/CreateDispatchPage.tsx` | reset form → `navigate('/signal/deals')` |
| Demo home CTAs | `src/pages/signal/HomePage.tsx` | links to `/signal/deals` and `/signal/mobile` |
| Tenant switcher | `src/components/TenantSwitcher.tsx` | paths under `/signal` vs `/filtergo` |

### Primary implementation files

| File | Role |
|------|------|
| `src/pages/signal/CreateDispatchPage.tsx` | Desktop Smart Contract form (main surface); includes `ProfitabilityOverviewDrawer` (Pricing Calculator) |
| `src/pages/signal/MobileContractPage.tsx` | Mobile Smart Contract |
| `src/pages/signal/DealsPage.tsx` | Web Deals + Create menu |
| `src/pages/signal/MobileDealsPage.tsx` | Mobile Deals + create sheet |
| `src/components/createContract/FormSection.tsx` | Collapsible form sections |
| `src/components/createContract/AddressMapPickerModal.tsx` | Map / address picker |
| `src/components/createContract/AddressAutocompleteField.tsx` | Address autocomplete (shared) |
| `src/tenant/types.ts` | Tenant ids / labels / base paths |

### Form flow (web) — section order in UI today

1. Proposal Details  
2. Company & Property Details  
3. Contact Details  
4. Services (Dedicated / Patrol cards)  
5. On Demand  
6. Billing & Payment Details  
7. Signee  

Submit: validate → payload logged / snackbar success (prototype); create is intended as **draft**, not publish.

### Notable business vs current UI gaps (prototype)

Track these when aligning UI to this story:

- Cycle Reference Date is independent of FilterGo Service Start Date coupling (lives under Payment)  
- Address-driven full autofill (contacts, billing, payment, signee) is partially mocked via company select  
- E-signature modal (“Add Sign”) may not match FilterGo parity yet  
- Industry Vertical may live on Create Company rather than the main company grid  

Use this document as the **source of product truth**; treat UI gaps as implementation backlog, not as the requirement.

### Local URLs (dev)

- Signal home: `http://localhost:5173/signal`  
- Signal deals: `http://localhost:5173/signal/deals`  
- Signal contract: `http://localhost:5173/signal/contract`  
- Signal mobile deals: `http://localhost:5173/signal/mobile`  
- Signal mobile contract: `http://localhost:5173/signal/mobile-contract`  

FilterGo twin (for comparison only): `http://localhost:5173/filtergo`

### Signal vs FilterGo (quick)

| Topic | FilterGo | Signal |
|-------|----------|--------|
| Catalog | Products (size, rate, qty) | Dedicated / Patrol services + On Demand |
| Company | Company Address, Company, Property, Industry, Franchise, Affiliation | Company (name only — no company address), Property Address, Property Name, Industry, Franchise, Property Source, Affiliation |
| Contacts | Decision Maker; Billing lower | Decision Maker, End User, Billing |
| Dates / schedule | Contract Start, Service Start, “same as contract”, Service Occurrence | Proposal Name + Time Zone; per-service schedule (times / job or visit days); Billing Occurrence; Cycle Reference Date under Payment |
| Payment terms | Net 10 default (FilterGo story) | Due Upon Invoice / Net 30 |
| Extra | — | Proposal Details; On Demand |

---

## One-line summary

**Layman:** Sales opens Deals → Create Smart Contract → picks company by name and/or property address → system fills what it knows → user finishes the must-haves → draft contract saved.  

**Tech:** Signal-only routes under `/signal/*`; primary web form in `src/pages/signal/CreateDispatchPage.tsx`; entry from `DealsPage` / `MobileDealsPage`; draft create, tenant-isolated from FilterGo.
