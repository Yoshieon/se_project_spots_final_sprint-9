export const API_BASE_URL = "https://around-api.en.tripleten-services.com/v1";
export const API_AUTHORIZATION_TOKEN = "6cefa111-f0f6-4efc-86cb-f845a42393ef";
export const API_CONTENT_TYPE = "application/json";

export const PROFILE_SELECTORS = {
  editBtn: ".profile__edit-btn",
  avatarBtn: ".profile__avatar-btn",
  addBtn: ".profile__add-btn",
  nameEl: ".profile__name",
  descriptionEl: ".profile__description",
  avatarImg: ".profile__avatar",
};

export const MODAL_IDS = {
  editProfile: "#edit-profile-modal",
  newPost: "#new-post-modal",
  preview: "#preview-modal",
  delete: "#delete-modal",
  avatar: "#avatar-modal",
};

export const MODAL_SELECTORS = {
  form: ".modal__form",
  closeBtn: ".modal__close-btn",
  button: ".modal__button",
  cancelButton: ".modal__button_cancel",
  input: ".modal__input",
  submitBtn: ".modal__submit-btn",
  image: ".modal__image",
  caption: ".modal__caption",
  imageContainer: ".modal__image-container",
};

export const INPUT_SELECTORS = {
  editProfileName: "#profile-name-input",
  editProfileDescription: "#profile-description-input",
  newPostCaption: "#post-caption-input",
  newPostImage: "#card-image-input",
  avatarInput: "#profile-avatar-input",
};

export const TEMPLATE_SELECTORS = {
  cardTemplate: "#card-template",
  cardsList: ".cards__list",
};

export const VALIDATION_SETTINGS = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

export const BUTTON_STATES = {
  defaultText: "Save",
  loadingText: "Saving...",
};

export const CARD_CLASSES = {
  likeBtn: "card__like-btn",
  likeBtnActive: "card__like-btn_active",
  deleteBtn: "card__delete-btn",
  image: "card__image",
  title: "card__title",
};

export const MODAL_CLASSES = {
  opened: "modal_is-opened",
  typePreview: "modal_type_preview",
};
