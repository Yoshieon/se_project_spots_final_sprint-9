import "../pages/index.css";
import {
  enableValidation,
  settings,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";
import { setButtonText } from "../utils/helpers.js";
import Api from "../utils/Api.js";
import {
  API_BASE_URL,
  API_AUTHORIZATION_TOKEN,
  API_CONTENT_TYPE,
  PROFILE_SELECTORS,
  MODAL_IDS,
  MODAL_SELECTORS,
  INPUT_SELECTORS,
  TEMPLATE_SELECTORS,
  BUTTON_STATES,
  CARD_CLASSES,
} from "../utils/constants.js";

// Destructure the second item in the callback of the .then()
const api = new Api({
  baseUrl: API_BASE_URL,
  headers: {
    authorization: API_AUTHORIZATION_TOKEN,
    "Content-Type": API_CONTENT_TYPE,
  },
});

api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });

    // Handle the user's information
    profileNameEl.textContent = userInfo.name;
    profileDescriptionEl.textContent = userInfo.about;
    document.querySelector(PROFILE_SELECTORS.avatarImg).src = userInfo.avatar;
  })
  .catch(console.error);

// Edit profiles Elements
const editProfileBtn = document.querySelector(PROFILE_SELECTORS.editBtn);
const editProfileModal = document.querySelector(MODAL_IDS.editProfile);
const editProfileCloseBtn = editProfileModal.querySelector(
  MODAL_SELECTORS.closeBtn,
);
const editProfileForm = editProfileModal.querySelector(MODAL_SELECTORS.form);
const editProfileNameInput = editProfileModal.querySelector(
  INPUT_SELECTORS.editProfileName,
);

const editProfileDescriptionInput = editProfileModal.querySelector(
  INPUT_SELECTORS.editProfileDescription,
);

// New post modal elements
const newPostBtn = document.querySelector(PROFILE_SELECTORS.addBtn);
const newPostModal = document.querySelector(MODAL_IDS.newPost);
const newPostCloseBtn = newPostModal.querySelector(MODAL_SELECTORS.closeBtn);
const newPostCaptionInput = newPostModal.querySelector(
  INPUT_SELECTORS.newPostCaption,
);
const newPostImageInput = newPostModal.querySelector(
  INPUT_SELECTORS.newPostImage,
);
const newPostForm = newPostModal.querySelector(MODAL_SELECTORS.form);

// Profile elements
const profileNameEl = document.querySelector(PROFILE_SELECTORS.nameEl);
const profileDescriptionEl = document.querySelector(
  PROFILE_SELECTORS.descriptionEl,
);

// Preview modal elements
const previewModal = document.querySelector(MODAL_IDS.preview);
const previewForm = previewModal.querySelector(MODAL_SELECTORS.form);
const previewSubmitBtn = previewModal.querySelector(MODAL_SELECTORS.button);
const previewModalCloseBtn = previewModal.querySelector(
  MODAL_SELECTORS.closeBtn,
);
const previewImageEl = previewModal.querySelector(MODAL_SELECTORS.image);
const previewCaptionEl = previewModal.querySelector(MODAL_SELECTORS.caption);

// Delete form elements
const deleteModal = document.querySelector(MODAL_IDS.delete);
const deleteForm = deleteModal.querySelector(MODAL_SELECTORS.form);
const deleteModalCloseBtn = deleteModal.querySelector(MODAL_SELECTORS.closeBtn);
const deleteModalCancelBtn = deleteModal.querySelector(
  MODAL_SELECTORS.cancelButton,
);

// Avatar modal elements
const avatarModal = document.querySelector(MODAL_IDS.avatar);
const avatarModalBtn = document.querySelector(PROFILE_SELECTORS.avatarBtn);
const avatarModalCloseBtn = avatarModal.querySelector(MODAL_SELECTORS.closeBtn);
const avatarForm = avatarModal.querySelector(MODAL_SELECTORS.form);
const avatarInput = avatarModal.querySelector(INPUT_SELECTORS.avatarInput);

const cardTemplate = document
  .querySelector(TEMPLATE_SELECTORS.cardTemplate)
  .content.querySelector(".card");

const cardsList = document.querySelector(TEMPLATE_SELECTORS.cardsList);

let selectedCard, selectedCardID;

function handleLike(evt, id) {
  const isLiked = evt.target.classList.contains(CARD_CLASSES.likeBtnActive);
  api
    .changeLikeStatus(id, isLiked)
    .then(() => {
      evt.target.classList.toggle(CARD_CLASSES.likeBtnActive);
    })
    .catch(console.error);
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-btn");
  const deleteButton = cardElement.querySelector(".card__delete-btn");

  if (data.isLiked) {
    likeButton.classList.add("card__like-btn_active");
  }

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  const cardLikeBtnEl = cardElement.querySelector(".card__like-btn");
  cardLikeBtnEl.addEventListener("click", (evt) => {
    handleLike(evt, data._id);
  });

  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-btn");
  cardDeleteBtnEl.addEventListener("click", () => {
    handleDeleteCard(cardElement, data._id);
  });

  cardImageEl.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    previewCaptionEl.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    closeModal();
  }
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscapeKey);
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscapeKey);
}

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  resetValidation(
    editProfileForm,
    [editProfileNameInput, editProfileDescriptionInput],
    settings,
  );
  openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

avatarModalBtn.addEventListener("click", function () {
  openModal(avatarModal);
});

avatarModalCloseBtn.addEventListener("click", function () {
  closeModal(avatarModal);
});

avatarForm.addEventListener("submit", handleAvatarSubmit);

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

previewModalCloseBtn.addEventListener("click", function () {
  closeModal(previewModal);
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();

  // Change text content to "Saving..."
  const submitBtn = evt.submitter;
  submitBtn.textContent = "Saving...";
  setButtonText(submitBtn, true);
  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((data) => {
      profileDescriptionEl.textContent = data.about;
      profileNameEl.textContent = data.name;
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      submitBtn.textContent = "Save";
      setButtonText(submitBtn, false);
    });
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  submitBtn.textContent = "Deleting...";
  setButtonText(submitBtn, true, "Delete", "Deleting...");
  api
    .deleteCard(selectedCardID)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      submitBtn.textContent = "Delete";
      setButtonText(submitBtn, false, "Delete", "Deleting...");
    });
}

function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardID = cardId;
  openModal(deleteModal);
}

deleteForm.addEventListener("submit", handleDeleteSubmit);

deleteModalCloseBtn.addEventListener("click", function () {
  closeModal(deleteModal);
});

deleteModalCancelBtn.addEventListener("click", function () {
  closeModal(deleteModal);
});

function handleAvatarSubmit(evt) {
  evt.preventDefault();

  const submitButton = evt.target.querySelector(`[type="submit"]`);

  setButtonText(submitButton, true, "Save", "Saving...");

  api
    .editAvatarInfo(avatarInput.value)
    .then((data) => {
      document.querySelector(".profile__avatar").src = data.avatar;
      closeModal(avatarModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitButton, false, "Save", "Saving...");
    });
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  submitBtn.textContent = "Creating...";
  setButtonText(submitBtn, true);

  api
    .addCard({
      name: newPostCaptionInput.value,
      link: newPostImageInput.value,
    })
    .then((data) => {
      const cardElement = getCardElement(data);
      cardsList.prepend(cardElement);
      evt.target.reset();
      disableButton(newPostForm.querySelector(".modal__submit-btn"), settings);
      closeModal(newPostModal);
    })
    .catch(console.error)
    .finally(() => {
      submitBtn.textContent = "Create";
      setButtonText(submitBtn, false);
    });
}

const outerClick = (evt) => {
  if (evt.target.classList.contains("modal_is-opened")) {
    closeModal(evt.target);
  }
};
document.addEventListener("click", outerClick);
newPostForm.addEventListener("submit", handleAddCardSubmit);
document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");
    closeModal(openedModal);
  }
  document.removeEventListener("keydown", closeModal);
});

enableValidation(settings);
