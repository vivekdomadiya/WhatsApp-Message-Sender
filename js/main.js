var codeInput = $("#code");
var phoneInput = $("#phone");
var textInput = $("#text");
var sendBtn = $("#send");
var clearBtn = $("#clear");
var codeError = $("#code-error");
var PhoneError = $("#phone-error");
var numberOnly = $(".numberOnly");

// set input to number only
numberOnly.keypress((e) => {
  if (e.keyCode < 48 || e.keyCode > 57) {
    e.preventDefault();
    return false;
  }
});

// phone number input paste validation
phoneInput.on("paste", (e) => {
  // check clipboardData has character except +, space and digits
  var TextValue = e.originalEvent.clipboardData.getData("Text");
  value = TextValue.replace(/\D/g, "");

  if (TextValue.startsWith("+")) {
    value = "+" + value;
  }

  console.log(value);

  // if value length is greater than 10 then set phoneNo to last 10 digit of value
  if (value.length > 10) {
    var code = value.substring(0, value.length - 10);
    codeInput.val(code);

    value = value.substring(value.length - 10, value.length);
  }

  phoneInput.val(value);

  e.preventDefault();
  return false;
});

// fix + sign to code
codeInput.on("input", (e) => {
  value = e.target.value.replace(/[//++]/g, "");
  e.target.value = "+" + value;
});

//validate code and phone no
function validCode() {
  var code = codeInput.val().replace(/[//++]/g, "");
  if (!/[0-9]{1,3}/.test(code)) {
    codeError.text("Enter valid country code.");
    return false;
  }
  codeError.text("");
  return true;
}

function validPhoneNo() {
  var phoneNo = phoneInput.val();
  if (!/[0-9]{10}/.test(phoneNo)) {
    PhoneError.text("Enter valid Phone number.");
    return false;
  }
  PhoneError.text("");
  return true;
}

// check valid on blur
codeInput.on("blur", validCode);
phoneInput.on("blur", validPhoneNo);

// add send btn link
sendBtn.click((e) => {
  if (!validCode() || !validPhoneNo()) return false;

  var code = codeInput.val().replace(/[//++]/g, "");
  var phoneNo = phoneInput.val();
  var text = textInput.val();
  text = encodeURIComponent(text);

  var phone = code + phoneNo;
  var url = "https://api.whatsapp.com/send?phone=" + phone + "&text=" + text;
  sendBtn.attr("href", url);
});

clearBtn.click((e) => {
  codeInput.val("+91");
  phoneInput.val("");
  textInput.val("");
  codeError.text("");
  PhoneError.text("");
  sendBtn.attr("href", "");
  return false;
});
