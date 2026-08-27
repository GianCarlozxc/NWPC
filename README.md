# National Wages and Productivity Commission (NWPC - DOLE) Official Portal

A modern, responsive, accessible recreation of the official **National Wages and Productivity Commission (NWPC)** website (`https://nwpc.dole.gov.ph/`), an attached agency of the Department of Labor and Employment (DOLE), Republic of the Philippines.

## 🚀 Key Features

1. **Official GOVPH Top Bar & Accessibility Suite**:
   - Live **Philippine Standard Time (PST)** clock (UTC+8) updated in real-time.
   - Accessibility toolbar: Contrast toggle (High Contrast Mode), Text Size Resizer (Small / Normal / Large), Dyslexia-friendly font mode, and Text-to-Speech (TTS) narration.
   - Direct links to Transparency Seal, Freedom of Information (FOI), and Citizen's Charter.

2. **Interactive 17-Region Minimum Wage Matrix**:
   - Real wage order data covering NCR, CAR, Region I to XII, Caraga (XIII), and BARMM.
   - Comprehensive breakdown of Non-Agriculture, Agriculture, Retail/Service, and Kasambahay (Domestic Worker under RA 10361) rates.
   - Filter by region/keyword, copy wage rate summaries, and simulate directly in the calculator.

3. **Interactive Minimum Wage & Overtime Calculator**:
   - Select region and sector to automatically pull official minimum daily rates.
   - Computes overtime pay (125%), night shift differential (10%), rest day / special holiday (130%), regular holiday (200%), estimated gross/net monthly take-home, 13th month accrual, and statutory deductions.

4. **Productivity Toolbox & Training Hub**:
   - Interactive modules for **7S of Good Housekeeping**, **ISTIV Productivity Values**, **Lean Management**, **Green ME (Eco-Productivity)**, **Service Quality Improvement (SQIP)**, and **Productivity Olympics**.
   - Online Training Request Form for MSMEs and enterprises with automated routing.

5. **News, Press Releases & Official Advisories**:
   - Filterable newsroom by category (*Wage Orders, Productivity, Kasambahay, E-Services, GAD Corner*).
   - Modal reader with detailed coverage and sharing options.
   - Mandatory Commission Advisories & Wage Gazette download section.

6. **17 Regional Tripartite Boards (RTWPBs) Directory**:
   - Filterable directory by island group (*Luzon, Visayas, Mindanao*) and keyword search.
   - Board Chairpersons, Board Secretaries, office addresses, hotlines, and geographical jurisdiction.

7. **Standard Republic of the Philippines Footer**:
   - Attached DOLE family links, GOVPH national branches, central office address, and hotline 1349.

---

## 🛠️ Tech Stack

- **React 19**
- **Vite 6**
- **Tailwind CSS 3**
- **Lucide Icons**

---

## 💻 Running the Application

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run preview
```
