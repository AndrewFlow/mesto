
// открыть любой попап
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keyHandler);// закрытие кнопкой Escape
};

//закрыть любой попап
export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandler);
  // закрытие кнопкой Escape
};
// функция закрытия попапа клавишей Escape
export function keyHandler(evt) {
  if (evt.key === 'Escape') {
    const closingPopup = document.querySelector('.popup_opened');
    closePopup(closingPopup);
  };
};

// функция закрытия попапа кликом мышки
export function mouseHandler(evt) {
  const target = evt.target;
  if (target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  };
};


