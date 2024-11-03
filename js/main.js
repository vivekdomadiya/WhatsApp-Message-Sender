// DOM element references
const codeInput = document.getElementById("code");
const phoneInput = document.getElementById("phone");
const textInput = document.getElementById("text");
const sendBtn = document.getElementById("send");
const clearBtn = document.getElementById("clear");
const errorMsg = document.getElementById("error-msg");
const numberOnlyElements = document.getElementsByClassName("numberOnly");

// Utility function for event listeners
const addEvent = (element, event, handler) =>
  element.addEventListener(event, handler);

// Only allow number inputs
Array.from(numberOnlyElements).forEach((element) => {
  addEvent(element, "keypress", (e) => {
    if (e.keyCode < 48 || e.keyCode > 57) {
      e.preventDefault();
    }
  });
});

// Validate and format phone number on paste
addEvent(phoneInput, "paste", (e) => {
  e.preventDefault();
  let textValue = e.clipboardData.getData("Text").replace(/\D/g, "");

  if (textValue.length > 10) {
    codeInput.value = `+${textValue.slice(0, -10)}`;
    textValue = textValue.slice(-10);
  }
  phoneInput.value = textValue;
  isValidPhone();
});

// Ensure country code is properly formatted
addEvent(codeInput, "input", (e) => {
  e.target.value = `+${e.target.value.replace(/[//++]/g, "")}`;
});

// Validation functions
const validateCode = () => /^\+?[0-9]{1,3}$/.test(codeInput.value);
const validatePhoneNo = () => /^\d{10}$/.test(phoneInput.value);

// Display validation messages
const isValidPhone = () => {
  let errorText = "";
  if (!validateCode() && !validatePhoneNo()) {
    errorText = "Enter valid code & phone number";
  } else if (!validatePhoneNo()) {
    errorText = "Enter valid phone number";
  } else if (!validateCode()) {
    errorText = "Enter valid country code";
  }
  errorMsg.textContent = errorText;
  return !errorText;
};

// Validate on blur
addEvent(codeInput, "blur", isValidPhone);
addEvent(phoneInput, "blur", isValidPhone);

// Handle send button click
addEvent(sendBtn, "click", (e) => {
  if (!isValidPhone()) {
    e.preventDefault();
  } else {
    const url = `https://api.whatsapp.com/send?phone=${codeInput.value.replace(
      /[//++]/g,
      ""
    )}${phoneInput.value}&text=${encodeURIComponent(textInput.value)}`;
    sendBtn.setAttribute("href", url);
  }
});

// Handle clear button click
addEvent(clearBtn, "click", (e) => {
  e.preventDefault();
  codeInput.value = "+91";
  phoneInput.value = "";
  textInput.value = "";
  errorMsg.textContent = "";
  sendBtn.setAttribute("href", "");
});
