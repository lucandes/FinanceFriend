/* VALUE BOX INPUT */
var input_new_value = document.querySelector('#add_value_box #value_field input');
var input_new_description = document.querySelector('#add_value_box #description_field input');

/* DARKSCREEN */
var add_value_box = document.querySelector("#add_value_box");
var darkscreen = document.querySelector("#darkscreen");

/* TOTAL VALUE DISPLAY */
var total_gain_display = document.querySelector("#gain-total");
var total_gain_value = 0;
var total_bill_display = document.querySelector("#bill-total");
var total_bill_value = 0;

/* ADD NEW GAIN OR BILL */
var button_gain = document.querySelector(" #add_value_gain");
var button_bill = document.querySelector(" #add_value_bill");

/* ELEMENTS OF ADD NEW VALUE BOX */
var button_confirm_gain = document.querySelector("#add_value_box #btn_confirm_gain");
var button_confirm_bill = document.querySelector("#add_value_box #btn_confirm_bill");
var button_modify = document.querySelector('#add_value_box #btn_modify');
var button_delete = document.querySelector("#add_value_box #btn_delete");
var button_cancel = document.querySelector("#add_value_box #btn_cancel");
var modified = "";

/* GAIN AND BILL LISTS */
var gain_list_element = document.querySelector("#gain-list");
var gain_list = []
var bill_list_element = document.querySelector("#bill-list");
var bill_list = []

/** Value Class  */
class Value {
  constructor(value, description) {
    this.value = value;
    this.description = description;
  }
}

/** updateValueLists */
function updateValueLists() {
  total_gain_value = 0;
  total_bill_value = 0;

  // Removes every child from gain_list_element
  while (gain_list_element.firstChild) {
    gain_list_element.removeChild(gain_list_element.firstChild)
  }

  // Appends every value in gain_list as a child of gain_list_element
  gain_list.forEach((gain) => {
    total_gain_value += parseFloat(gain.value);

    let new_value_block = document.createElement("li");
    let nvb_value = document.createElement("span");

    nvb_value.innerText = formatCurrency(parseFloat(gain.value));
    let nvb_description = document.createElement("span");
    nvb_description.innerText = gain.description;

    nvb_value.classList.add("gain-value");
    nvb_description.classList.add("gain-desc");

    new_value_block.appendChild(nvb_value);
    new_value_block.appendChild(nvb_description);

    new_value_block.onclick = () => {
      modifiyed = gain;
      openAddValueBox("modify")
    };

    gain_list_element.appendChild(new_value_block);
  });

  total_gain_display.innerText = formatCurrency(total_gain_value);

  while (bill_list_element.firstChild) {
    bill_list_element.removeChild(bill_list_element.firstChild)
  }

  // Appends every value in bill_list as a child of bill_list_element
  bill_list.forEach((bill) => {
    total_bill_value += parseFloat(bill.value);

    let new_value_block = document.createElement("li");
    let nvb_value = document.createElement("span");

    nvb_value.innerText = formatCurrency(parseFloat(bill.value));
    let nvb_description = document.createElement("span");
    nvb_description.innerText = bill.description;

    nvb_value.classList.add("bill-value");
    nvb_description.classList.add("bill-desc");

    new_value_block.appendChild(nvb_value);
    new_value_block.appendChild(nvb_description);

    new_value_block.onclick = openAddValueBox("modify");

    bill_list_element.appendChild(new_value_block);
  });

  total_bill_display.innerText = formatCurrency(total_bill_value);
}

/** opens the dark screen  **/
darkscreen.onclick = () => {
  darkscreen.classList.toggle("show");
  add_value_box.classList.value = "";
}

/** opens an input box for adding new values. */
function openAddValueBox(mode) {
  if (mode == "modify") {
    input_new_value.value = element.value;
    input_new_description.value = element.description;
  } else {
    input_new_value.value = 0.00;
    input_new_description.value = "";
  }

  input_new_value.style.width = "4ch";
  input_new_value.focus();
  input_new_value.value = parseFloat(input_new_value.value).toFixed(2);

  add_value_box.classList.add(mode);
  darkscreen.classList.toggle("show");
}

/** changes the length of the value input field and defines it's limits */
function resizeInput() {
  let new_length = input_new_value.value.length;
  if (new_length > 13) new_length = 13;
  if (new_length < 4) new_length = 4;
  if (input_new_value.value > 999999999.99) input_new_value.value = 999999999.99;
  input_new_value.value = parseFloat(input_new_value.value).toFixed(2);

  input_new_value.style.width = new_length + "ch";
}

/** This will make resizeInput be executed when the input */
input_new_value.addEventListener('input', resizeInput);

/** ADD GAIN */
button_gain.addEventListener("click", () => {
  openAddValueBox("gain");
})

/** ADD BILL */
button_bill.addEventListener("click", () => {
  openAddValueBox("bill");
})

/** CANCEL BUTTON */
button_cancel.addEventListener("click", () => {
  darkscreen.classList.toggle("show");
  add_value_box.classList.value = "";
  modified = "";
})

/** CONFIRM GAIN BUTTON */
button_confirm_gain.addEventListener("click", () => {
  if (input_new_value.value == 0) {
    alert("Please enter a value");
    return;
  } else if (input_new_description.value == "") {
    alert("Please enter a description");
    return;
  }

  darkscreen.classList.toggle("show");
  add_value_box.classList.value = "";
  add_new_gain(input_new_value.value, input_new_description.value);
})

/** CONFIRM BILL BUTTON */
button_confirm_bill.addEventListener("click", () => {
  if (input_new_value.value == 0) {
    alert("Please enter a value");
    return;
  } else if (input_new_description.value == "") {
    alert("Please enter a description");
    return;
  }

  darkscreen.classList.toggle("show");
  add_value_box.classList.value = "";
  add_new_bill(input_new_value.value, input_new_description.value);
})

/** MODIFY BUTTON */
button_modify.addEventListener("click", () => {
  if (input_new_value.value == 0) {
    alert("Please enter a value");
    return;
  } else if (input_new_description.value == "") {
    alert("Please enter a description");
    return;
  }

  darkscreen.classList.toggle("show");
  add_value_box.classList.value = "";
  modified.value = input_new_value.value;
  modified.value = input_new_description.value;
});

/** DELETE BUTTON */
button_delete.addEventListener("click", () => {
  if (input_new_value.value == 0) {
    alert("Please enter a value");
    return;
  } else if (input_new_description.value == "") {
    alert("Please enter a description");
    return;
  }

  darkscreen.classList.toggle("show");
  add_value_box.classList.value = "";
})

function add_new_gain(value, desc) {
  let gain = new Value(value, desc);
  gain_list.push(gain);
  updateValueLists();
}

function add_new_bill(value, desc) {
  let bill = new Value(value, desc);
  bill_list.push(bill);
  updateValueLists();
}

function formatCurrency(number) {
  return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
