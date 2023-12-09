const totalS = document.getElementById('totalS');
const totalST = document.getElementById('totalST');
const totalBD = document.getElementById('totalBD');
const totalBW = document.getElementById('totalBW');
const totalBB = document.getElementById('totalBB');
const totalE = document.getElementById('totalE');
const totalD = document.getElementById('totalD');
const totalV = document.getElementById('totalV');
const totalW = document.getElementById('totalW');
const totalAd = document.getElementById('totalAd');
const salesTotalFiter = document.getElementById('smallSelect');
const filterDateSelector = document.getElementById('filterDateSelector');

const loadDatas = (data) => {
    totalST.innerHTML = '₽ '+data.sales.totalToday;
    totalBD.innerHTML = '₽ '+data.bank.totalDeposit;
    totalBW.innerHTML = '₽ '+data.bank.totalWithdraw;
    totalBB.innerHTML = '₽ '+data.bank.bankBalance;
    totalBB.style.color = parseInt(data.bank.bankBalance) < 0 ? 'red' : '';
    totalE.innerHTML = '₽ '+data.expenses.totalExpenses;
    totalD.innerHTML = data.user.totalDrivers;
    totalV.innerHTML = data.user.totalVehicles;
    totalW.innerHTML = data.user.totalWorkers;
    totalAd.innerHTML = data.user.totalAdmins;
}

document.addEventListener('DOMContentLoaded', async () => {
    const request = await fetch('/api/totals?type=all');
    const response = await request.json();
    if(response.message && response.message === 'Redirect'){
        document.location.href = '/logout';
        return;
    }

    if(response.status){
        setTimeout(async() => {
            loadDatas(response.data);
            await loadFilteredSales();
        }, 1500);
    }
})

salesTotalFiter.addEventListener('change',async  (e) => {
    e.preventDefault();
    totalS.innerHTML = `<i class='bx bx-loader-alt bx-spin'></i>`
    setTimeout(async() => {
        await loadFilteredSales();
    }, 1500);
    
});

filterDateSelector.addEventListener('change',async  (e) => {
    e.preventDefault();
    totalST.innerHTML = `<i class='bx bx-loader-alt bx-spin'></i>`
    setTimeout(async() => {
        await loadDailyFilteredSales();
    }, 1500);
    
});

const loadFilteredSales = async () => {
    const request = await fetch('/api/totals?type=sales&&filter='+salesTotalFiter.value);
    const response = await request.json();
    if(response.message && response.message === 'Redirect'){
        document.location.href = '/logout';
        return;
    }

    if(response.status){
        totalS.innerHTML = `₽ ${response.data.totalSalesFilter}`;
    }
}

const loadDailyFilteredSales = async () => {
    const request = await fetch('/api/totals?type=sales&&filterDate='+filterDateSelector.value);
    const response = await request.json();
    if(response.message && response.message === 'Redirect'){
        document.location.href = '/logout';
        return;
    }

    if(response.status){
        totalST.innerHTML = `₽ ${response.data.totalDailySalesFilter}`;
    }
}