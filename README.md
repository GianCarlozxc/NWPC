# National Wages and Productivity Commission (NWPC - DOLE) Official Portal

[![Live Demo](https://img.shields.io/badge/Live_Portal-GitHub_Pages-22c55e?style=for-the-badge&logo=github)](https://giancarlozxc.github.io/NWPC/)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite_6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

A modern, responsive, accessible recreation of the official **National Wages and Productivity Commission (NWPC)** website (`https://nwpc.dole.gov.ph/`), an attached agency of the Department of Labor and Employment (DOLE), Republic of the Philippines.

---

## 🌐 Live Website
👉 **[https://giancarlozxc.github.io/NWPC/](https://giancarlozxc.github.io/NWPC/)**

---

## 🛠️ Built With

| Technology | Purpose |
|---|---|
| **[React 19](https://react.dev/)** | Frontend UI Component Architecture |
| **[Tailwind CSS](https://tailwindcss.com/)** | Responsive Design, Dark/Light Themes & Government Styling |
| **[Vite 6](https://vitejs.dev/)** | High-Performance Build Tooling & Fast Refresh |
| **[Lucide React](https://lucide.dev/)** | Official Iconography Suite |
| **[jsPDF & AutoTable](https://github.com/parallax/jsPDF)** | Client-side Wage Order & Training PDF Certificate Generation |
| **[SheetJS (XLSX)](https://sheetjs.com/)** | Minimum Wage Matrix Excel/Spreadsheet Export |

---

## 🚀 Key Features

1. **Official GOVPH Top Bar & Accessibility Suite**:
   - Live **Philippine Standard Time (PST)** clock (UTC+8) updated in real-time.
   - Accessibility toolbar: Contrast toggle (High Contrast Mode), Text Size Resizer (Small / Normal / Large), Dyslexia-friendly font mode, and Text-to-Speech (TTS) narration.
   - Direct links to Transparency Seal, Freedom of Information (FOI), and Citizen's Charter.

2. **Interactive 17-Region Minimum Wage Matrix**:
   - Real wage order data covering NCR, CAR, Region I to XII, Caraga (XIII), and BARMM.
   - Comprehensive breakdown of Non-Agriculture, Agriculture, Retail/Service, and Kasambahay (Domestic Worker under RA 10361) rates.
   - Filter by region/keyword, copy wage rate summaries, and export directly to Excel.

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

## 💻 Local Development

```bash
# Clone the repository
git clone https://github.com/GianCarlozxc/NWPC.git

# Navigate into folder
cd NWPC

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 🚢 Production Deployment

```bash
# Build & Deploy directly to GitHub Pages
npm run deploy
```
