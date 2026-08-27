import * as XLSX from 'xlsx';

/**
 * Exports training applications to an Excel (.xlsx) file.
 * 
 * @param {Array} applications - Array of training application objects
 * @param {string} monthFilter - 'all' or 'YYYY-MM'
 * @param {string} monthLabel - Optional human readable label, e.g. "August 2026"
 */
export function exportTrainingApplicationsToExcel(applications, monthFilter = 'all', monthLabel = '') {
  if (!applications || applications.length === 0) {
    alert('No training requests available to export.');
    return;
  }

  // Format data for Excel rows
  const excelRows = applications.map((app, index) => ({
    'No.': index + 1,
    'Reference Code': app.referenceCode || app.id,
    'Date Submitted': app.submissionDate || 'N/A',
    'Company / Enterprise Name': app.companyName || 'N/A',
    'Contact Person': app.contactPerson || 'N/A',
    'Designation / Position': app.designation || 'N/A',
    'Email Address': app.email || 'N/A',
    'Contact Number': app.phone || 'N/A',
    'Operating Region': app.region || 'N/A',
    'Productivity Module': app.moduleTitle || app.moduleId || 'N/A',
    'Number of Participants': app.paxCount || 'N/A',
    'Preferred Mode': app.preferredMode || 'N/A',
    'Application Status': (app.status || 'Pending').toUpperCase(),
    'Specific Concerns / Notes': app.notes || ''
  }));

  // Create worksheet
  const worksheet = XLSX.utils.json_to_sheet(excelRows);

  // Set column widths for clean readability in Excel
  worksheet['!cols'] = [
    { wch: 6 },  // No.
    { wch: 16 }, // Reference Code
    { wch: 22 }, // Date Submitted
    { wch: 38 }, // Company Name
    { wch: 26 }, // Contact Person
    { wch: 26 }, // Designation
    { wch: 30 }, // Email
    { wch: 18 }, // Phone
    { wch: 16 }, // Region
    { wch: 38 }, // Module
    { wch: 22 }, // Pax
    { wch: 32 }, // Preferred Mode
    { wch: 16 }, // Status
    { wch: 50 }  // Notes
  ];

  // Create workbook
  const workbook = XLSX.utils.book_new();
  const sheetTitle = monthFilter === 'all' 
    ? 'All Training Requests' 
    : (monthLabel ? monthLabel.slice(0, 31) : monthFilter);
    
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetTitle);

  // Build filename
  let filename = 'NWPC_Training_Requests_';
  if (monthFilter === 'all') {
    filename += 'All_Records_' + new Date().toISOString().split('T')[0] + '.xlsx';
  } else {
    const cleanLabel = (monthLabel || monthFilter).replace(/[^a-zA-Z0-9]/g, '_');
    filename += cleanLabel + '.xlsx';
  }

  // Trigger download
  XLSX.writeFile(workbook, filename);
}
