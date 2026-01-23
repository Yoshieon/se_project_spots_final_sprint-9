export function setButtonText(
  btn,
  isLoading,
  defaultText = "Save",
  LoadingText = "Saving...",
) {
  if (isLoading) {
    btn.textContent = LoadingText;
  } else {
    btn.textContent = defaultText;
  }
}
