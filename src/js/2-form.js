const form = document.querySelector(".feedback-form");
const STORAGE_KEY = "feedback-form-state";

let formData = {
  email: "",
  message: "",
};

populateForm();

form.addEventListener("input", onFormInput);
form.addEventListener("submit", handleSubmit);

function onFormInput(event) {
  const { name, value } = event.target;
  formData[name] = value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateForm() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (!savedData) return;

  try {
    const parsedData = JSON.parse(savedData);
    if (parsedData.email) {
      form.elements.email.value = parsedData.email;
      formData.email = parsedData.email;
    }
    if (parsedData.message) {
      form.elements.message.value = parsedData.message;
      formData.message = parsedData.message;
    }
  } catch (error) {
    console.error("Error parsing saved form data:", error);
  }
}

function handleSubmit(event) {
  event.preventDefault();

  if (formData.email.trim() === "" || formData.message.trim() === "") {
    alert("All form fields must be filled in");
    return;
  }

  console.log("Submitted data:", formData);

  localStorage.removeItem(STORAGE_KEY);
  form.reset();
  formData = { email: "", message: "" };
}
