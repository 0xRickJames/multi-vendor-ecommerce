const axios = require("axios");

const adminRegisterValidation = (value) => {
  const error = {};
  if (!value.firstName) {
    error.name = "Please provide your name in env";
  }
  if (!value.lastName) {
    error.name = "Please provide your name in env";
  }
  if (!value.email) {
    error.email = "Please provide your email in env";
  }
  if (!value.phone) {
    error.phone = "Please provide your phone in env";
  }
  if (!value.storeName) {
    error.phone = "Please provide your store name in env";
  }
  if (!value.password) {
    error.password = "Please provide your password in env";
  } else if (value.password.length < 6) {
    error.password = "Please provide minimum 6 character";
  } else if (value.password.length > 20) {
    error.password = "Please provide maximum 20 character";
  }
  let isValid = Object.keys(error).length === 0;
  return {
    error,
    isValid,
  };
};

const registerValidation = (value) => {
  const error = {};
  if (value.role === "vendor") {
    if (!value.firstName) {
      error.name = "Please provide your first name";
    }
    if (!value.lastName) {
      error.name = "Please provide your last name";
    }
    if (!value.phone) {
      error.phone = "Please provide your phone";
    }
    if (!value.storeName) {
      error.storeName = "Please provide your store name";
    }
  }
  if (!value.email) {
    error.email = "Please provide your email";
  }
  if (!value.password) {
    error.password = "Please provide your password";
  } else if (value.password.length < 6) {
    error.password = "Please provide minimum 6 character";
  } else if (value.password.length > 20) {
    error.password = "Please provide maximum 20 character";
  }
  if (!value.recaptch) {
    error.recaptch = "Please fill up recaptch";
  } else {
    axios
      .get(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${value.recaptch}`
      )
      .then((response) => {
        if (response.data.success) {
          error.recaptch = null;
        } else {
          error.recaptch = "Invalid recaptcha";
        }
      })
      .catch(() => {
        error.recaptch = "Invalid recaptcha";
      });
  }
  if (!value.agree) {
    error.agree = "Please checked agree button";
  }

  let isValid = Object.keys(error).length === 0;
  return {
    error,
    isValid,
  };
};

const loginValidation = (value) => {
  const error = {};
  if (!value.email) {
    error.email = "Please provide your email";
  }
  if (!value.password) {
    error.password = "Please provide your password";
  } else if (value.password.length < 6) {
    error.password = "Please provide minimum 6 character";
  } else if (value.password.length > 20) {
    error.password = "Please provide maximum 20 character";
  }
  let isValid = Object.keys(error).length === 0;
  return {
    error,
    isValid,
  };
};

module.exports = {
  adminRegisterValidation,
  registerValidation,
  loginValidation,
};
