export const wageData = [
  {
    id: "ncr",
    region: "NCR",
    regionFullName: "National Capital Region (Metro Manila)",
    wageOrderNo: "WO No. NCR-27",
    kasambahayOrderNo: "WO No. NCR-DW-06",
    effectiveDate: "25 July 2026",
    kasambahayEffectiveDate: "07 February 2026",
    nonAgriculture: 755,
    agriculture: 718,
    kasambahayRate: 7800,
    rates: [
      {
        sector: "Non-Agriculture",
        basicRate: 755,
        trancheStage: "Upon Effectivity (25 July 2026)",
        secondTranche: "₱ 780.00 (Eff. 20 January 2027)",
        totalDailyRate: 755,
        coverage: "Commercial, Industrial, Manufacturing, Services, Construction"
      },
      {
        sector: "Agriculture / Service & Retail (15 workers or less)",
        basicRate: 718,
        trancheStage: "Upon Effectivity (25 July 2026)",
        secondTranche: "₱ 743.00 (Eff. 20 January 2027)",
        totalDailyRate: 718,
        coverage: "Plantations, Farms, Micro Retail & Small Manufacturing"
      }
    ],
    kasambahayRates: [
      {
        area: "All Cities and Municipalities in NCR",
        monthlyRate: 7800,
        coverage: "General Househelp, Cook, Yaya, Gardener, Laundry person"
      }
    ],
    jurisdictionCities: "Caloocan, Las Piñas, Mandaluyong, Manila, Makati, Marikina, Malabon, Muntinlupa, Navotas, Parañaque, Pasay, Pasig, Quezon, San Juan, Taguig, Valenzuela, Pateros",
    notes: "Under Wage Order No. NCR-27, minimum wage rates range from ₱718.00 to ₱755.00 upon effectivity, and will increase to ₱743.00 to ₱780.00 on 20 January 2027."
  },
  {
    id: "car",
    region: "CAR",
    regionFullName: "Cordillera Administrative Region",
    wageOrderNo: "WO No. CAR-24",
    kasambahayOrderNo: "WO No. CAR-DW-07",
    effectiveDate: "30 December 2025",
    kasambahayEffectiveDate: "30 December 2025",
    nonAgriculture: 505,
    agriculture: 505,
    kasambahayRate: 6600,
    rates: [
      {
        sector: "All Sectors (Non-Agri, Agri, Retail/Service)",
        basicRate: 505,
        trancheStage: "Current Rate",
        secondTranche: "Standardized",
        totalDailyRate: 505,
        coverage: "Baguio City, Abra, Apayao, Benguet, Ifugao, Kalinga, Mt. Province"
      }
    ],
    kasambahayRates: [
      {
        area: "Across all provinces & Baguio City",
        monthlyRate: 6600,
        coverage: "Domestic workers in Cordilleras"
      }
    ],
    jurisdictionCities: "Baguio City, Abra, Apayao, Benguet, Ifugao, Kalinga, Mountain Province",
    notes: "Uniform daily rate of ₱505.00 across all private sectors in CAR under WO CAR-24."
  },
  {
    id: "region-1",
    region: "Region I",
    regionFullName: "Ilocos Region",
    wageOrderNo: "WO No. RB1-24",
    kasambahayOrderNo: "WO No. RB1-DW-06",
    effectiveDate: "19 November 2025",
    kasambahayEffectiveDate: "19 November 2025",
    nonAgriculture: 505,
    agriculture: 480,
    kasambahayRate: 6700,
    rates: [
      {
        sector: "Non-Agriculture (Large & Medium Enterprises)",
        basicRate: 505,
        trancheStage: "Current Rate",
        secondTranche: "₱ 505.00",
        totalDailyRate: 505,
        coverage: "Commercial & Industrial in Ilocos Norte, Ilocos Sur, La Union, Pangasinan"
      },
      {
        sector: "Agriculture & Micro Retail/Service",
        basicRate: 480,
        trancheStage: "Current Rate",
        secondTranche: "₱ 480.00",
        totalDailyRate: 480,
        coverage: "Agricultural farms & establishments with 1-9 workers"
      }
    ],
    kasambahayRates: [
      {
        area: "All Cities and Municipalities in Region I",
        monthlyRate: 6700,
        coverage: "Domestic workers across Ilocos Region"
      }
    ],
    jurisdictionCities: "Alaminos, Batac, Candon, Dagupan, Laoag, San Carlos, San Fernando, Ilocos Norte, Ilocos Sur, La Union, Pangasinan",
    notes: "Daily minimum wage rates pegged at ₱480.00 – ₱505.00 under Wage Order No. RB1-24."
  },
  {
    id: "region-2",
    region: "Region II",
    regionFullName: "Cagayan Valley Region",
    wageOrderNo: "WO No. RTWPB 2-24",
    kasambahayOrderNo: "WO No. 02-DW-07",
    effectiveDate: "05 November 2025",
    kasambahayEffectiveDate: "05 November 2025",
    nonAgriculture: 500,
    agriculture: 500,
    kasambahayRate: 6500,
    rates: [
      {
        sector: "All Private Sector Establishments",
        basicRate: 500,
        trancheStage: "Current Rate",
        secondTranche: "₱ 500.00",
        totalDailyRate: 500,
        coverage: "Non-Agriculture and Agriculture in Cagayan Valley"
      }
    ],
    kasambahayRates: [
      {
        area: "All areas across Region II",
        monthlyRate: 6500,
        coverage: "Domestic workers in Cagayan Valley"
      }
    ],
    jurisdictionCities: "Cauayan, Ilagan, Santiago, Tuguegarao, Batanes, Cagayan, Isabela, Quirino, Nueva Vizcaya",
    notes: "Pegged at ₱500.00 daily minimum wage across Region II under WO RTWPB 2-24."
  },
  {
    id: "region-3",
    region: "Region III",
    regionFullName: "Central Luzon",
    wageOrderNo: "WO No. RBIII-26",
    kasambahayOrderNo: "WO No. RBIII-DW-05",
    effectiveDate: "30 October 2025",
    kasambahayEffectiveDate: "30 October 2025",
    nonAgriculture: 570,
    agriculture: 540,
    kasambahayRate: 6500,
    rates: [
      {
        sector: "Non-Agriculture (Bataan, Bulacan, N. Ecija, Pampanga, Tarlac, Zambales)",
        basicRate: 570,
        trancheStage: "Upon Effectivity (30 Oct 2025)",
        secondTranche: "₱ 600.00 (Eff. 16 April 2026)",
        totalDailyRate: 570,
        coverage: "Commercial & Industrial centers in Central Luzon"
      },
      {
        sector: "Agriculture (Plantation & Non-Plantation)",
        basicRate: 540,
        trancheStage: "Upon Effectivity (30 Oct 2025)",
        secondTranche: "₱ 570.00 (Eff. 16 April 2026)",
        totalDailyRate: 540,
        coverage: "Agricultural farms in 6 provinces"
      },
      {
        sector: "Province of Aurora (Non-Agri / Agri)",
        basicRate: 475,
        trancheStage: "Upon Effectivity (30 Oct 2025)",
        secondTranche: "₱ 515.00 (Eff. 16 April 2026)",
        totalDailyRate: 475,
        coverage: "Baler, Casiguran, Dingalan, Dipaculao, Maria Aurora, etc."
      }
    ],
    kasambahayRates: [
      {
        area: "Cities and Municipalities in Region III",
        monthlyRate: 6500,
        coverage: "Domestic workers across Central Luzon"
      }
    ],
    jurisdictionCities: "Angeles, Balanga, Cabanatuan, Gapan, Malolos, Muñoz, Olongapo, Palayan, San Fernando, San Jose, San Jose Del Monte, Tarlac, Aurora, Bataan, Bulacan, Nueva Ecija, Pampanga, Tarlac, Zambales",
    notes: "Under WO RBIII-26, daily rates are ₱475.00 – ₱570.00 upon effectivity, and ₱515.00 – ₱600.00 starting 16 April 2026."
  },
  {
    id: "region-4a",
    region: "Region IVA",
    regionFullName: "CALABARZON",
    wageOrderNo: "WO No. IVA-22",
    kasambahayOrderNo: "WO No. RB-IVA-DW-05",
    effectiveDate: "05 October 2025",
    kasambahayEffectiveDate: "07 March 2025",
    nonAgriculture: 600,
    agriculture: 540,
    kasambahayRate: 6750,
    rates: [
      {
        sector: "Non-Agriculture (Extended Metropolitan & Component Cities)",
        basicRate: 600,
        trancheStage: "Upon Effectivity (05 Oct 2025)",
        secondTranche: "₱ 600.00",
        totalDailyRate: 600,
        coverage: "Batangas, Cavite, Laguna, Rizal, Lucena City"
      },
      {
        sector: "Reclassified 1st Class Municipalities",
        basicRate: 525,
        trancheStage: "Upon Effectivity",
        secondTranche: "₱ 525.00 - ₱ 550.00 (Eff. 01 April 2026)",
        totalDailyRate: 525,
        coverage: "Major progressive towns in CALABARZON"
      },
      {
        sector: "2nd to 5th Class Municipalities & Retail < 10 workers",
        basicRate: 485,
        trancheStage: "Upon Effectivity",
        secondTranche: "₱ 508.00 - ₱ 525.00 (Eff. 01 April 2026)",
        totalDailyRate: 485,
        coverage: "Developing municipalities and micro-establishments"
      }
    ],
    kasambahayRates: [
      {
        area: "All Cities and Municipalities in CALABARZON",
        monthlyRate: 6750,
        coverage: "Domestic workers in Batangas, Cavite, Laguna, Quezon, Rizal"
      }
    ],
    jurisdictionCities: "Batangas, Cavite, Laguna, Quezon, Rizal",
    notes: "Under Wage Order No. IVA-22, minimum rates range from ₱485.00 to ₱600.00 upon effectivity, with second tranche adjustments on 01 April 2026."
  },
  {
    id: "region-4b",
    region: "Region IVB",
    regionFullName: "MIMAROPA",
    wageOrderNo: "WO No. RB-MIMAROPA-13",
    kasambahayOrderNo: "WO No. RB-MIMAROPA-DW-06",
    effectiveDate: "01 January 2026",
    kasambahayEffectiveDate: "01 January 2026",
    nonAgriculture: 455,
    agriculture: 455,
    kasambahayRate: 7000,
    rates: [
      {
        sector: "All Sectors (Non-Agriculture, Agriculture, Retail/Service)",
        basicRate: 455,
        trancheStage: "Current Rate",
        secondTranche: "₱ 455.00",
        totalDailyRate: 455,
        coverage: "Calapan City, Puerto Princesa, Marinduque, Mindoro, Palawan, Romblon"
      }
    ],
    kasambahayRates: [
      {
        area: "All areas across MIMAROPA",
        monthlyRate: 7000,
        coverage: "Domestic workers in MIMAROPA"
      }
    ],
    jurisdictionCities: "Calapan City, Puerto Princesa, Marinduque, Occidental Mindoro, Oriental Mindoro, Palawan, Romblon",
    notes: "Under WO RB-MIMAROPA-13, daily minimum wage is ₱455.00 and Kasambahay is ₱7,000.00/month."
  },
  {
    id: "region-5",
    region: "Region V",
    regionFullName: "Bicol Region",
    wageOrderNo: "WO No. RBV-23",
    kasambahayOrderNo: "WO No. RBV-DW-04",
    effectiveDate: "08 April 2026",
    kasambahayEffectiveDate: "05 April 2025",
    nonAgriculture: 455,
    agriculture: 455,
    kasambahayRate: 6000,
    rates: [
      {
        sector: "All Private Sector Establishments",
        basicRate: 455,
        trancheStage: "Upon Effectivity (08 April 2026)",
        secondTranche: "₱ 480.00 (Eff. 01 December 2026)",
        totalDailyRate: 455,
        coverage: "Albay, Camarines Norte, Camarines Sur, Catanduanes, Masbate, Sorsogon"
      }
    ],
    kasambahayRates: [
      {
        area: "Cities and Municipalities in Region V",
        monthlyRate: 6000,
        coverage: "Domestic workers in Bicol Region"
      }
    ],
    jurisdictionCities: "Iriga, Legazpi, Ligao, Masbate, Naga, Sorsogon, Tabaco, Albay, Camarines Norte/Sur, Catanduanes, Masbate, Sorsogon",
    notes: "Under WO RBV-23, daily minimum rate is ₱455.00 upon effectivity, and will increase to ₱480.00 on 01 December 2026."
  },
  {
    id: "region-6",
    region: "Region VI",
    regionFullName: "Western Visayas",
    wageOrderNo: "WO No. RBVI-29",
    kasambahayOrderNo: "WO No. RBVI-DW-07",
    effectiveDate: "19 November 2025",
    kasambahayEffectiveDate: "19 November 2025",
    nonAgriculture: 550,
    agriculture: 520,
    kasambahayRate: 6500,
    rates: [
      {
        sector: "Non-Agriculture (More than 10 workers)",
        basicRate: 550,
        trancheStage: "Current Rate",
        secondTranche: "₱ 550.00",
        totalDailyRate: 550,
        coverage: "Iloilo City, Bacolod City, Component Cities"
      },
      {
        sector: "Agriculture & Retail/Service (10 workers or less)",
        basicRate: 520,
        trancheStage: "Current Rate",
        secondTranche: "₱ 520.00",
        totalDailyRate: 520,
        coverage: "Sugar plantations, rice farms, micro-retailers"
      }
    ],
    kasambahayRates: [
      {
        area: "All areas across Region VI",
        monthlyRate: 6500,
        coverage: "Domestic workers in Western Visayas"
      }
    ],
    jurisdictionCities: "Iloilo City, Bacolod City, Component Cities, Aklan, Antique, Capiz, Guimaras, Iloilo, Negros Occidental",
    notes: "Under WO RBVI-29, minimum wage rates are ₱520.00 – ₱550.00 per day."
  },
  {
    id: "region-7",
    region: "Region VII",
    regionFullName: "Central Visayas",
    wageOrderNo: "WO No. ROVII-26",
    kasambahayOrderNo: "WO ROVII-DW-05",
    effectiveDate: "04 October 2025",
    kasambahayEffectiveDate: "04 October 2025",
    nonAgriculture: 540,
    agriculture: 500,
    kasambahayRate: 7000,
    rates: [
      {
        sector: "Class A (Expanded Metro Cebu, Mandaue, Lapu-Lapu, Talisay, Naga, Consolacion)",
        basicRate: 540,
        trancheStage: "Current Rate",
        secondTranche: "₱ 540.00",
        totalDailyRate: 540,
        coverage: "Non-Agriculture in Class A metropolitan cities"
      },
      {
        sector: "Class B & C (Other Cities, Agriculture, Micro Municipalities)",
        basicRate: 500,
        trancheStage: "Current Rate",
        secondTranche: "₱ 500.00",
        totalDailyRate: 500,
        coverage: "Tagbilaran, Toledo, Bogo, Dumaguete, and other towns"
      }
    ],
    kasambahayRates: [
      {
        area: "All areas in Central Visayas",
        monthlyRate: 7000,
        coverage: "Domestic workers in Region VII"
      }
    ],
    jurisdictionCities: "Bais, Bayawan, Bogo, Canlaon, Carcar, Cebu, Dumaguete, Danao, Guihulngan, Lapu-Lapu, Mandaue, Naga, Tagbilaran, Talisay, Tanjay, Toledo, Compostela, Consolacion, Cordova, Liloan, Minglanilla, Negros Oriental, San Fernando",
    notes: "Under WO ROVII-26, daily minimum wage ranges from ₱500.00 to ₱540.00, and Kasambahay is ₱7,000.00/month."
  },
  {
    id: "region-8",
    region: "Region VIII",
    regionFullName: "Eastern Visayas",
    wageOrderNo: "WO No. RB VIII-25",
    kasambahayOrderNo: "WO No. RBVIII-DW-06",
    effectiveDate: "08 December 2025",
    kasambahayEffectiveDate: "08 December 2025",
    nonAgriculture: 452,
    agriculture: 422,
    kasambahayRate: 6400,
    rates: [
      {
        sector: "Non-Agriculture",
        basicRate: 452,
        trancheStage: "Upon Effectivity (08 Dec 2025)",
        secondTranche: "₱ 470.00 (Eff. 01 June 2026)",
        totalDailyRate: 452,
        coverage: "Commercial & Industrial in Leyte, Samar, Biliran"
      },
      {
        sector: "Agriculture & Retail/Service (10 workers or less)",
        basicRate: 422,
        trancheStage: "Upon Effectivity (08 Dec 2025)",
        secondTranche: "₱ 440.00 (Eff. 01 June 2026)",
        totalDailyRate: 422,
        coverage: "Coconut, fisheries, handicrafts, cottage industries"
      }
    ],
    kasambahayRates: [
      {
        area: "Chartered Cities & 1st Class Municipalities",
        monthlyRate: 6400,
        coverage: "Tacloban, Ormoc, Calbayog, Borongan, Catbalogan, Maasin"
      },
      {
        area: "Other Municipalities",
        monthlyRate: 5800,
        coverage: "All other towns in Region VIII"
      }
    ],
    jurisdictionCities: "Catbalogan, Calbayog, Baybay, Borongan, Maasin, Ormoc, Tacloban, Biliran, Eastern Samar, Leyte, Northern Samar, Samar, Southern Leyte",
    notes: "Under WO RB VIII-25, minimum rates are ₱422.00 – ₱452.00 upon effectivity, and ₱440.00 – ₱470.00 starting 01 June 2026."
  },
  {
    id: "region-9",
    region: "Region IX",
    regionFullName: "Zamboanga Peninsula",
    wageOrderNo: "WO No. RIX-24",
    kasambahayOrderNo: "WO No. RIX-DW-06",
    effectiveDate: "01 January 2026",
    kasambahayEffectiveDate: "20 May 2026",
    nonAgriculture: 439,
    agriculture: 426,
    kasambahayRate: 6000,
    rates: [
      {
        sector: "Non-Agriculture",
        basicRate: 439,
        trancheStage: "Upon Effectivity (01 Jan 2026)",
        secondTranche: "₱ 464.00 (Eff. 01 June 2026)",
        totalDailyRate: 439,
        coverage: "Zamboanga City, Dipolog, Dapitan, Pagadian, Isabela City"
      },
      {
        sector: "Agriculture & Retail/Service (< 10 workers)",
        basicRate: 426,
        trancheStage: "Upon Effectivity (01 Jan 2026)",
        secondTranche: "₱ 451.00 (Eff. 01 June 2026)",
        totalDailyRate: 426,
        coverage: "Rubber plantations, canning, farming"
      }
    ],
    kasambahayRates: [
      {
        area: "Chartered Cities & 1st Class Municipalities",
        monthlyRate: 6000,
        coverage: "Zamboanga City, Dipolog, Pagadian, Isabela City"
      },
      {
        area: "Other Municipalities",
        monthlyRate: 5500,
        coverage: "Other ZamPen towns"
      }
    ],
    jurisdictionCities: "Dapitan, Dipolog, Isabela City, Pagadian, Zamboanga City, Zamboanga Del Norte, Zamboanga Del Sur, Zamboanga Sibugay",
    notes: "Under WO RIX-24, rates are ₱426.00 – ₱439.00 upon effectivity, increasing to ₱451.00 – ₱464.00 on 01 June 2026."
  },
  {
    id: "region-10",
    region: "Region X",
    regionFullName: "Northern Mindanao",
    wageOrderNo: "WO No. RX-24",
    kasambahayOrderNo: "WO No. RX-DW-06",
    effectiveDate: "16 January 2026",
    kasambahayEffectiveDate: "16 January 2026",
    nonAgriculture: 486,
    agriculture: 471,
    kasambahayRate: 6500,
    rates: [
      {
        sector: "Category I (CDO, Iligan, Tagoloan, Villanueva)",
        basicRate: 486,
        trancheStage: "Upon Effectivity (16 Jan 2026)",
        secondTranche: "₱ 500.00 (Eff. 01 May 2026)",
        totalDailyRate: 486,
        coverage: "Major industrial & urban centers in Region X"
      },
      {
        sector: "Category II (Other Cities & Municipalities)",
        basicRate: 471,
        trancheStage: "Upon Effectivity (16 Jan 2026)",
        secondTranche: "₱ 485.00 (Eff. 01 May 2026)",
        totalDailyRate: 471,
        coverage: "Malaybalay, Valencia, Ozamiz, Tangub, Gingoog, agriculture"
      }
    ],
    kasambahayRates: [
      {
        area: "All Cities and Municipalities in Northern Mindanao",
        monthlyRate: 6500,
        coverage: "Domestic workers in Region X"
      }
    ],
    jurisdictionCities: "Cagayan de Oro, El Salvador, Gingoog, Iligan, Malaybalay, Oroquieta, Ozamiz, Tangub, Valencia, Bukidnon, Camiguin, Lanao del Norte, Misamis Occidental, Misamis Oriental",
    notes: "Under WO RX-24, minimum rates are ₱471.00 – ₱486.00 upon effectivity, and ₱485.00 – ₱500.00 starting 01 May 2026."
  },
  {
    id: "region-11",
    region: "Region XI",
    regionFullName: "Davao Region",
    wageOrderNo: "WO No. RB XI-24",
    kasambahayOrderNo: "WO No. RB XI-DW-04",
    effectiveDate: "13 March 2026",
    kasambahayEffectiveDate: "13 March 2026",
    nonAgriculture: 525,
    agriculture: 515,
    kasambahayRate: 6500,
    rates: [
      {
        sector: "Non-Agriculture (Commercial, Industrial, Services)",
        basicRate: 525,
        trancheStage: "Upon Effectivity (13 March 2026)",
        secondTranche: "₱ 540.00 (Eff. 01 September 2026)",
        totalDailyRate: 525,
        coverage: "Davao City, Tagum, Digos, Panabo, Mati, Samal"
      },
      {
        sector: "Agriculture & Retail/Service (< 10 workers)",
        basicRate: 515,
        trancheStage: "Upon Effectivity (13 March 2026)",
        secondTranche: "₱ 525.00 (Eff. 01 September 2026)",
        totalDailyRate: 515,
        coverage: "Banana, cacao, coconut, palm oil plantations"
      }
    ],
    kasambahayRates: [
      {
        area: "All areas across Davao Region",
        monthlyRate: 6500,
        coverage: "Domestic workers in Region XI"
      }
    ],
    jurisdictionCities: "Davao City, Digos, Island Garden of Samal, Mati, Panabo, Tagum, Compostela Valley/Davao de Oro, Davao del Sur, Davao del Norte, Davao Oriental",
    notes: "Under WO RB XI-24, daily minimum wage is ₱515.00 – ₱525.00 upon effectivity, increasing to ₱525.00 – ₱540.00 on 01 September 2026."
  },
  {
    id: "region-12",
    region: "Region XII",
    regionFullName: "SOCCSKSARGEN",
    wageOrderNo: "WO No. RXII-25",
    kasambahayOrderNo: "WO No. RXII-DW-05",
    effectiveDate: "02 November 2025",
    kasambahayEffectiveDate: "02 November 2025",
    nonAgriculture: 460,
    agriculture: 443,
    kasambahayRate: 6000,
    rates: [
      {
        sector: "Non-Agriculture",
        basicRate: 460,
        trancheStage: "Current Rate (15 Dec 2025)",
        secondTranche: "₱ 460.00",
        totalDailyRate: 460,
        coverage: "General Santos City, Koronadal, Tacurong, Kidapawan"
      },
      {
        sector: "Agriculture & Retail/Service",
        basicRate: 443,
        trancheStage: "Current Rate (15 Dec 2025)",
        secondTranche: "₱ 443.00",
        totalDailyRate: 443,
        coverage: "Tuna canning, pineapple, coffee, palm oil"
      }
    ],
    kasambahayRates: [
      {
        area: "All areas in SOCCSKSARGEN",
        monthlyRate: 6000,
        coverage: "Domestic workers in Region XII"
      }
    ],
    jurisdictionCities: "General Santos City, Kidapawan, Koronadal, Tacurong, North Cotabato, Sarangani, South Cotabato, Sultan Kudarat",
    notes: "Under WO RXII-25, minimum wage rates are ₱443.00 – ₱460.00 per day."
  },
  {
    id: "region-13",
    region: "Region XIII",
    regionFullName: "Caraga Region",
    wageOrderNo: "WO No. RXIII-20",
    kasambahayOrderNo: "WO No. RXIII-DW-06",
    effectiveDate: "03 January 2026",
    kasambahayEffectiveDate: "03 January 2026",
    nonAgriculture: 475,
    agriculture: 475,
    kasambahayRate: 6500,
    rates: [
      {
        sector: "All Private Sector Workers (Non-Agri, Agri, Retail)",
        basicRate: 455,
        trancheStage: "Upon Effectivity (03 Jan 2026)",
        secondTranche: "₱ 475.00 (Eff. 01 May 2026)",
        totalDailyRate: 455,
        coverage: "Butuan City, Surigao City, Bayugan, Bislig, Cabadbaran, Tandag, Dinagat, Siargao"
      }
    ],
    kasambahayRates: [
      {
        area: "All Cities and Municipalities in Caraga",
        monthlyRate: 6500,
        coverage: "Domestic workers in Region XIII"
      }
    ],
    jurisdictionCities: "Bayugan, Bislig, Butuan, Cabadbaran, Surigao, Tandag, Agusan del Norte/Sur, Dinagat Islands, Surigao del Sur/Norte, Siargao Island",
    notes: "Under WO RXIII-20, daily minimum wage is ₱455.00 upon effectivity, increasing to ₱475.00 on 01 May 2026."
  },
  {
    id: "barmm",
    region: "BARMM",
    regionFullName: "Bangsamoro Autonomous Region in Muslim Mindanao",
    wageOrderNo: "WO No. BARMM-05",
    kasambahayOrderNo: "WO No. BARMM-DW-02",
    effectiveDate: "06 August 2026",
    kasambahayEffectiveDate: "08 January 2026",
    nonAgriculture: 436,
    agriculture: 401,
    kasambahayRate: 5500,
    rates: [
      {
        sector: "Non-Agriculture",
        basicRate: 436,
        trancheStage: "Upon Effectivity (06 Aug 2026)",
        secondTranche: "₱ 461.00 (Eff. 01 Dec 2026)",
        totalDailyRate: 436,
        coverage: "Cotabato City, Marawi City, Lamitan, SGA"
      },
      {
        sector: "Agriculture & Retail/Service",
        basicRate: 401,
        trancheStage: "Upon Effectivity (06 Aug 2026)",
        secondTranche: "₱ 426.00 (Eff. 01 Dec 2026)",
        totalDailyRate: 401,
        coverage: "Basilan, Lanao del Sur, Maguindanao, Sulu, Tawi-Tawi"
      }
    ],
    kasambahayRates: [
      {
        area: "All areas in BARMM",
        monthlyRate: 5500,
        coverage: "Domestic workers across Bangsamoro region"
      }
    ],
    jurisdictionCities: "Marawi City, Lamitan, Cotabato City, SGA, Basilan, Lanao del Sur, Maguindanao, Sulu, Tawi-Tawi",
    notes: "Under Wage Order No. BARMM-05, rates are ₱401.00 – ₱436.00 upon effectivity, increasing to ₱426.00 – ₱461.00 on 01 December 2026."
  }
];

export const summaryStats = {
  highestDailyRate: 755,
  highestRegion: "NCR (₱755.00)",
  lowestDailyRate: 401,
  lowestRegion: "BARMM (Agri - ₱401.00)",
  totalRegions: 17,
  averageMinimumWage: 521.8,
  totalWorkersCovered: "4.2 Million+"
};
