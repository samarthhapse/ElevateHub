export const getIncomingCallDialog = (
  callTypeInfo,
  acceptCallHandler,
  rejectCallHandler
) => {
  // console.log("getting incoming call dialog");
  const dialog = document.createElement("div");
  dialog.classList.add("dialog_wrapper");
  const dialogContent = document.createElement("div");
  dialogContent.classList.add("dialog_content");
  dialog.appendChild(dialogContent);

  const title = document.createElement("p");
  title.classList.add("dialog_title");
  title.innerHTML = `Incoming ${callTypeInfo} Call`;

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("dialog_image_container");
  const image = document.createElement("img");
  const avatarImagePath = "images/userAvatar.png";
  image.src = avatarImagePath;
  imageContainer.appendChild(image);

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("dialog_button_container");

  const acceptCallButton = document.createElement("button");
  acceptCallButton.classList.add("dialog_accept_call_button");
  const acceptCallImg = document.createElement("img");
  acceptCallImg.classList.add("dialog_button_image");
  const acceptCallImgPath = "images/acceptCall.png";
  acceptCallImg.src = acceptCallImgPath;
  acceptCallButton.append(acceptCallImg, "Accept");
  buttonContainer.appendChild(acceptCallButton);

  const rejectCallButton = document.createElement("button");
  rejectCallButton.classList.add("dialog_reject_call_button");
  const rejectCallImg = document.createElement("img");
  rejectCallImg.classList.add("dialog_button_image");
  const rejectCallImgPath = "images/rejectCall.png";
  rejectCallImg.src = rejectCallImgPath;
  rejectCallButton.append(rejectCallImg, "Reject");
  buttonContainer.appendChild(rejectCallButton);

  dialogContent.appendChild(title);
  dialogContent.appendChild(imageContainer);
  dialogContent.appendChild(buttonContainer);

  acceptCallButton.addEventListener("click", () => {
    if (window.matchMedia("(max-width: 56.25em)").matches) {
      document.getElementById("dashboard-container").style.display = "none";
      document.getElementById("call_container").style.opacity = "1";
      document.getElementById("video_chat_dashboard_button").disabled = true;
      document.getElementById("video_chat_dashboard_button").style.background =
        "rgba(255, 255, 255, 0.218)";
      document.getElementById(
        "video_chat_dashboard_button"
      ).style.backdropFilter = "blur(0.5px)";
      document.getElementById("video_chat_dashboard_button").style.cursor =
        "not-allowed";
    }

    if (window.matchMedia("(min-width: 56.26em)").matches) {
      document.getElementById("video_chat_dashboard_button").disabled = true;
      document.getElementById("video_chat_dashboard_button").style.background =
        "rgba(255, 255, 255, 0.218)";
      document.getElementById(
        "video_chat_dashboard_button"
      ).style.backdropFilter = "blur(0.5px)";
      document.getElementById("video_chat_dashboard_button").style.cursor =
        "not-allowed";
    }

    acceptCallHandler();
  });

  rejectCallButton.addEventListener("click", () => {
    if (window.matchMedia("(max-width: 56.25em)").matches) {
      document.getElementById("dashboard-container").style.display = "none";
      document.getElementById("call_container").style.opacity = "1";
      document.getElementById("video_chat_dashboard_button").disabled = false;
      document.getElementById("video_chat_dashboard_button").style.background =
        "rgba(0, 0, 0, 0.2)";
      document.getElementById(
        "video_chat_dashboard_button"
      ).style.backdropFilter = "none";
      document.getElementById("video_chat_dashboard_button").style.cursor =
        "pointer";
    }

    rejectCallHandler();
  });

  return dialog;
};

export const getCallingDialog = (rejectCallHandler) => {
  const dialog = document.createElement("div");
  dialog.classList.add("dialog_wrapper");
  const dialogContent = document.createElement("div");
  dialogContent.classList.add("dialog_content");
  dialog.appendChild(dialogContent);

  const title = document.createElement("p");
  title.classList.add("dialog_title");
  title.innerHTML = `Calling`;

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("dialog_image_container");
  const image = document.createElement("img");
  const avatarImagePath = "images/userAvatar.png";
  image.src = avatarImagePath;
  imageContainer.appendChild(image);

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("dialog_button_container");

  const hangUpCallButton = document.createElement("button");
  hangUpCallButton.classList.add("dialog_reject_call_button");
  const hangUpCallImg = document.createElement("img");
  hangUpCallImg.classList.add("dialog_button_image");
  const hangUpCallImgPath = "images/rejectCall.png";
  hangUpCallImg.src = hangUpCallImgPath;
  hangUpCallButton.append(hangUpCallImg, "Reject");
  buttonContainer.appendChild(hangUpCallButton);

  dialogContent.appendChild(title);
  dialogContent.appendChild(imageContainer);
  dialogContent.appendChild(buttonContainer);

  hangUpCallButton.addEventListener("click", () => {
    rejectCallHandler();
  });

  return dialog;
};

export const getInfoDialog = (dialogTitle, dialogDescription) => {
  const dialog = document.createElement("div");
  dialog.classList.add("dialog_wrapper");
  const dialogContent = document.createElement("div");
  dialogContent.classList.add("dialog_content");
  dialog.appendChild(dialogContent);

  const title = document.createElement("p");
  title.classList.add("dialog_title");
  title.innerHTML = dialogTitle;

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("dialog_image_container");
  const image = document.createElement("img");
  const avatarImagePath = "images/userAvatar.png";
  image.src = avatarImagePath;
  imageContainer.appendChild(image);

  const description = document.createElement("p");
  description.classList.add("dialog_description");
  description.innerHTML = dialogDescription;

  dialogContent.appendChild(title);
  dialogContent.appendChild(imageContainer);
  dialogContent.appendChild(description);

  return dialog;
};

export const getLeftMessage = (message) => {
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("message_left_container");
  const messageParagraph = document.createElement("p");
  messageParagraph.classList.add("message_left_paragraph");
  messageParagraph.innerHTML = message;
  messageContainer.appendChild(messageParagraph);

  return messageContainer;
};

export const getRightMessage = (message) => {
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("message_right_container");
  const messageParagraph = document.createElement("p");
  messageParagraph.classList.add("message_right_paragraph");
  messageParagraph.innerHTML = message;
  messageContainer.appendChild(messageParagraph);

  return messageContainer;
};
