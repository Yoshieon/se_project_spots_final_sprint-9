export function setButtonText(
  btn,
  isLoading,
  defaultText = "Save",
  LoadingText = "Saving..."
) {
  if (isLoading) {
    // set the loading text
    console.log(`Setting text to ${LoadingText}`);
  } else {
    // set the non-loading text.
    console.log(`Setting text to ${defaultText}`);
  }
}
