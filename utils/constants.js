const URL_REGEX = /(https?:\/\/)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;

const emailRegex = /^[A-Za-z0-9._%+-]+@(?:[A-Za-z0-9.-]+\.[A-Za-z]{2,5})$/i;

module.exports = {
  URL_REGEX, emailRegex,
};
