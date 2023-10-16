const inputFocus = (evt) => {
  evt.target.parentNode.classList.add("focus");

  evt.target.addEventListener("blur", () => {
    evt.target.parentNode.classList.remove("focus");
  });
};

export { inputFocus };
