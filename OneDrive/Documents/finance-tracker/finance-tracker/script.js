const transactionForm = document.querySelector('#transaction-form form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');
const transactionList = document.getElementById('transactions-container');

// 1. SELECT THE SUMMARY CARDS FROM HTML
const totalIncomeDisplay = document.getElementById('total-income');
const totalBalanceDisplay = document.getElementById('total-balance');

let transactions = [];

transactionForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const descriptionValue = descriptionInput.value;
    const amountValue = Number(amountInput.value); 
    const typeValue = typeInput.value;
    
    const newTransaction = {
        id: Date.now(),
        description: descriptionValue,
        amount: amountValue,
        type: typeValue 
    };

    transactions.push(newTransaction);
    
    // 2. TRIGGER THE UPDATES
    renderTransactions();
    updateSummary(); // Calculate the math right after adding a transaction!

    transactionForm.reset();
}); 

function renderTransactions() {
    transactionList.innerHTML = '';
    
    transactions.forEach(function(transaction) {
        const li = document.createElement('li');

        if (transaction.type === 'income') {
            li.classList.add('plus');
        } else {
            li.classList.add('minus');
        }

        const sign = transaction.type === 'income' ? '+' : '-';
        li.innerHTML = `
            ${transaction.description} <span>${sign}₱${Math.abs(transaction.amount)}</span>
        `;

        transactionList.appendChild(li);
    }); 
}

// 🎨 3. THE MATH CALCULATOR FUNCTION
function updateSummary() {
    let incomeTotal = 0;
    let expenseTotal = 0;

    // Loop through the array and tally up the numbers
    transactions.forEach(function(transaction) {
        if (transaction.type === 'income') {
            incomeTotal += transaction.amount;
        } else if (transaction.type === 'expense') {
            expenseTotal += transaction.amount;
        }
    });

    // Derive the final balance
    const balanceTotal = incomeTotal - expenseTotal;

    // Push the fresh math values onto the actual webpage screen
    totalIncomeDisplay.textContent = `₱${incomeTotal.toFixed(2)}`;
    totalBalanceDisplay.textContent = `₱${balanceTotal.toFixed(2)}`;
}