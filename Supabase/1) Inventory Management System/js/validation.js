// Global validation - har form isi file ko import karta hai
// Jo field form me nahi hai, us ki jagah false bhejo

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const showError = (text) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: text,
  });
};

// Login, signup, forgot aur reset ke liye
export const validation = (name, email, password, confirmPass) => {
  // it will check that form has name field or not
  if (name !== false) {
    if (name.trim().length < 3) {
      showError("Please enter a valid name");
      return false;
    }
  }

  // it will check that form has email field or not
  if (email !== false) {
    if (!emailRegex.test(email)) {
      showError("Please provide a valid email");
      return false;
    }
  }

  if (password !== false) {
    if (password.length < 6) {
      showError("Please provide a strong password");
      return false;
    }
  }

  if (confirmPass !== false) {
    if (confirmPass !== password) {
      showError("Please provide a matching password");
      return false;
    }
  }

  // koi error nahi aayi -> form valid hai
  return true;
};

// Purchase aur sell form ke liye - same pattern, jo field form me nahi us ki jagah false
export const productValidation = (product, quantity, price) => {
  if (product !== false) {
    if (product.trim() === "") {
      showError("Please select or enter a product");
      return false;
    }
  }

  if (quantity !== false) {
    if (quantity === "" || Number(quantity) <= 0) {
      showError("Please enter a valid quantity");
      return false;
    }
  }

  if (price !== false) {
    if (price === "" || Number(price) <= 0) {
      showError("Please enter a valid price");
      return false;
    }
  }

  // koi error nahi aayi -> form valid hai
  return true;
};

// Sell form ke liye - Pakistani mobile number, 11 digits, 03 se shuru
export const phoneValidation = (phone) => {
  const digits = phone.replace(/[^0-9]/g, "");
  if (digits.length !== 11 || !digits.startsWith("03")) {
    showError("Please enter a valid phone number");
    return false;
  }

  // koi error nahi aayi -> phone valid hai
  return true;
};
