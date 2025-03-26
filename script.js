// Set current date as default
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('currentDate').value = today;
});

function calculatePTO() {
    const startDate = new Date(document.getElementById('startDate').value);
    const currentDate = new Date(document.getElementById('currentDate').value);
    const vacationDays = parseInt(document.getElementById('vacationDays').value);

    if (!startDate || !currentDate || isNaN(vacationDays)) {
        alert('Please fill in all fields with valid values');
        return;
    }

    // Calculate years of service
    const yearsOfService = (currentDate - startDate) / (1000 * 60 * 60 * 24 * 365.25);

    // Determine PTO hours based on years of service
    let totalPTOHours;
    if (yearsOfService < 1) {
        totalPTOHours = 40;
    } else if (yearsOfService < 2) {
        totalPTOHours = 80;
    } else if (yearsOfService < 5) {
        totalPTOHours = 80;
    } else {
        totalPTOHours = 160;
    }

    // Convert hours to days (8 hours per day)
    const totalPTODays = totalPTOHours / 8;
    const remainingDays = totalPTODays - vacationDays;

    // Display results
    const resultDiv = document.getElementById('result');
    const ptoStatus = document.getElementById('ptoStatus');
    const ptoDetails = document.getElementById('ptoDetails');

    resultDiv.style.display = 'block';

    // Format the status message
    let statusMessage = '';
    if (remainingDays > 0) {
        statusMessage = `You have ${remainingDays.toFixed(1)} days of PTO remaining this year.`;
    } else if (remainingDays === 0) {
        statusMessage = 'You have used all your PTO for this year.';
    } else {
        statusMessage = `You have exceeded your PTO by ${Math.abs(remainingDays).toFixed(1)} days.`;
    }

    // Format the details message with HTML
    const detailsMessage = `
        <div class="detail-item">
            <strong>Total PTO:</strong> ${totalPTODays.toFixed(1)} days (${totalPTOHours} hours)
        </div>
        <div class="detail-item">
            <strong>Days Used:</strong> ${vacationDays} days (${vacationDays * 8} hours)
        </div>
        <div class="detail-item">
            <strong>Years of Service:</strong> ${yearsOfService.toFixed(1)} years
        </div>
        <div class="detail-item">
            <strong>PTO Tier:</strong> ${getPTOTier(yearsOfService)}
        </div>
    `;

    ptoStatus.textContent = statusMessage;
    ptoDetails.innerHTML = detailsMessage;
}

function getPTOTier(yearsOfService) {
    if (yearsOfService < 1) {
        return 'First Year (40 hours)';
    } else if (yearsOfService < 2) {
        return 'Second Year (80 hours)';
    } else if (yearsOfService < 5) {
        return '2-5 Years (80 hours)';
    } else {
        return '5+ Years (160 hours)';
    }
} 