const incomeArea = document.querySelector('.income-area');
const expensesArea = document.querySelector('.expenses-area');

const transTitle = document.querySelector('#name'); 
const transAmount = document.querySelector('#amount');
const transCategory = document.querySelector('#category');
const transList = document.querySelector('.transaction-list');
const errText = document.querySelector('.error-text');
const errAmount = document.querySelector('.error-amount');
const errSelect = document.querySelector('.error-select');

const availableMoney = document.querySelector('.available-money');
let bilance = 0;

const popup = document.querySelector('.add-transaction-panel');

const addBtn = document.querySelector('.add-transaction');
const removeAllBtn = document.querySelector('.delete-all');
const saveBtn = document.querySelector('.save');
const closeBtn = document.querySelector('.cancel');

const lightMotive = document.querySelector('.light');
const darkMotive = document.querySelector('.dark');
let root = document.documentElement;


const showPopup = () => {
  popup.style.display = 'flex';
}

const hidePopup = () => {
  popup.style.display = 'none';
}

const trans = (name, value, place, icon) => {
  const transWrapper = document.createElement('div');
  transWrapper.classList.add('transaction');

    const transName = document.createElement('p');
    transName.classList.add('transaction-name');

      const incomeIcon = document.createElement('i');
      incomeIcon.classList.add(`fas`,`${icon}`);
      transName.appendChild(incomeIcon);

      const text = document.createTextNode(` ${name}`);
      transName.appendChild(text);
    
    transWrapper.appendChild(transName);

    const amount = document.createElement('p');
    amount.classList.add('transaction-amount');
    amount.textContent = `${value}zł `;

      const deleteBtn = document.createElement('button');
      deleteBtn.classList.add('delete');
      amount.appendChild(deleteBtn);

        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fas','fa-times');
        deleteBtn.appendChild(deleteIcon);

      amount.appendChild(deleteBtn);

    transWrapper.appendChild(amount);

  place.appendChild(transWrapper);
}

const createTrans = () => {
  const name = transTitle.value;
  const selectedOption = transCategory.options[transCategory.selectedIndex].text;
  let regex = /^[0-9]*\.?[0-9]*$/;
  let value = transAmount.value;
  let place;
  let icon;

  if(regex.test(value) && value >= 0.01 && value.slice(0,1) !== '.' && name !== '' && selectedOption !== '') {
    if(selectedOption.includes('[ + ]')) {
      place = incomeArea;
      value;
    } else {
      place = expensesArea;
      value = `-${value}`;
    } 

    trans(name, value, place, icon);
    founds();
    hidePopup();
    errAmount.style.display = 'none';
    errText.style.display = 'none';
    errSelect.style.display = 'none';
  } else {
    if(value <= 0.01 || value.slice(0,1) === '.') {
      errAmount.textContent = `Liczba musi być większa niż 0`;
      errAmount.style.display = 'block';
    } else if(regex.test(value) === false) {
      errAmount.textContent = `Kwota może zawierać tylko cyfry od 0 do 9 oraz '.'`;
      errAmount.style.display = 'block';
    } 

    if(name === '') {
      errText.textContent = 'Podaj nazwę transkacji!';
      errText.style.display = 'block';
    } else {
      errText.style.display = 'none';
    }

    if(selectedOption === '') {
      errSelect.textContent = 'Musisz wybrać przychód lub wydatek!';
      errSelect.style.display = 'block';
    } else {
      errSelect.style.display = 'none';
    }
  } 

  if(transCategory.options[transCategory.selectedIndex].text.includes('[ + ] Przychód')) {
    icon = 'fa-money-bill-wave';
  } else if (transCategory.options[transCategory.selectedIndex].text.includes('[ - ] Zakupy')) {
    icon = 'fa-cart-arrow-down';
  } else if (transCategory.options[transCategory.selectedIndex].text.includes('[ - ] Jedzenie')) {
    icon = 'fa-hamburger';
  } else if (transCategory.options[transCategory.selectedIndex].text.includes('[ - ] Kino')) {
    icon = 'fa-film';
  }
}

const founds = () => {
  const allTrans = document.querySelectorAll('.transaction-amount');
  bilance = 0;
  allTrans.forEach(item => {
    itemMoney = item.textContent.slice(0, -3);
    if(itemMoney.indexOf(0) === '-') {
      itemMoney.slice(0,1);
      bilance -= parseFloat(itemMoney);
    } else {
      bilance += parseFloat(itemMoney);
    }
  })
  availableMoney.textContent = `${bilance}zł`
}

const removeAllTrans = () => {
  if(document.querySelector('.transaction') !== null) {
    incomeArea.innerHTML = '<h3>Przychód:</h3>';
    expensesArea.innerHTML = '<h3>Wydatki:</h3>';
    founds();
  } else {
    alert('Nie ma żadnych transkacji do usunięcia!');
  }
}

addBtn.addEventListener('click', showPopup);
removeAllBtn.addEventListener('click', removeAllTrans);
saveBtn.addEventListener('click', createTrans);
closeBtn.addEventListener('click', hidePopup);

lightMotive.addEventListener('click', () => {
  root.style.setProperty('--first-color', "#ccc793");
  root.style.setProperty('--second-color', "#14161F");
  root.style.setProperty('--border-color', "#14161F");
});
darkMotive.addEventListener('click', () => {
  root.style.setProperty('--first-color', "#14161F");
  root.style.setProperty('--second-color', "#ccc793");
  root.style.setProperty('--border-color', "#ccc793");
});

document.addEventListener("click", function(e){
  const target = e.target.closest('.delete');

  if(target){
    target.closest('.transaction').remove();
    founds();
  }
});