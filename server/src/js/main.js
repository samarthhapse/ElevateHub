import css from "../css/style.scss";
import * as store from "./store.js";
import * as wss from "./wss.js";
import * as webRTCHandler from "./webRTCHandler.js";
import * as constants from "./constants.js";
import * as ui from "./ui.js";
import * as recordingUtils from "./recordingUtils.js";
import * as strangerUtils from "./strangerUtils.js";
import logo from "../images/merged-logo.png";
import chatButton from "../images/chatButton.png";
import copy from "../images/copy.png";
import videoButton from "../images/videoButton.png";
import acceptCall from "../images/acceptCall.png";
import camera from "../images/camera.png";
import cameraOff from "../images/cameraOff.png";
import check from "../images/check.png";
import hangUp from "../images/hangUp.png";
import mic from "../images/mic.png";
import micOff from "../images/micOff.png";
import pause from "../images/pause.png";
import recordingStart from "../images/recordingStart.png";
import rejectCall from "../images/rejectCall.png";
import resume from "../images/resume.png";
import sendMessage from "../images/sendMessageButton.png";
import paste from "../images/paste.png";
import smile from "../images/smile.png";
import videoChatDashboard from "../images/videoChatDashboard.png";
import chatMessage from "../images/chatMessage.png";
import closeButton from "../images/closeButton.png";
import { EmojiButton } from "@joeattardi/emoji-button";
import stopRecording from "../images/stopRecording.png";
import screenShare from "../images/screenShare.png";
import userAvatar from "../images/userAvatar.png";
import favicon from "../images/favicon.ico";
import android192 from "../images/android-chrome-192x192.png";
import android384 from "../images/android-chrome-384x384.png";
import appleTouch from "../images/apple-touch-icon.png";
import browserconfig from "../images/browserconfig.xml";
import favicon16 from "../images/favicon-16x16.png";
import favicon32 from "../images/favicon-32x32.png";
import mstile150 from "../images/mstile-150x150.png";
import safaripinnedtab from "../images/safari-pinned-tab.svg";
import siteManifiest from "../images/site.webmanifest";

//initialization of socketIO connection
const socket = io("/");
wss.registerSocketEvents(socket);

webRTCHandler.getLocalPreview();

//register event listener for personal code copy button
const personalCodeCopyButton = document.getElementById(
  "personal_code_copy_button"
);
personalCodeCopyButton.addEventListener("click", () => {
  const personalCode = store.getState().socketId;
  navigator.clipboard && navigator.clipboard.writeText(personalCode);
  const tooltiptext = document.querySelector(
    ".personal_code_copy_button__tooltiptext"
  );
  tooltiptext.style.visibility = "visible";
  tooltiptext.style.opacity = "1";

  setTimeout(() => {
    tooltiptext.style.visibility = "hidden";
    tooltiptext.style.opacity = "0";
  }, 2000);
});

//Emoji-Button
const button = document.getElementById("send_emoji_button");

const picker = new EmojiButton({
  theme: "dark",
  position: "top-start",
  emojisPerRow: 6,
  rows: 3,
  icons: {
    search: "/search.svg",
    clearSearch: "/close.svg",
  },
});

button.addEventListener("click", () => {
  picker.togglePicker(button);
});

picker.on("emoji", (selection) => {
  document.querySelector(".new_message_input").value += selection.emoji;
});

//register event listeners for connection buttons

const personalCodeChatButton = document.getElementById(
  "personal_code_chat_button"
);

const personalCodeVideoButton = document.getElementById(
  "personal_code_video_button"
);

personalCodeChatButton.addEventListener("click", () => {
  const calleePersonalCode = document.getElementById(
    "personal_code_input"
  ).value;
  const callType = constants.callType.CHAT_PERSONAL_CODE;
  webRTCHandler.sendPreOffer(callType, calleePersonalCode);

  if (window.matchMedia("(max-width: 56.25em)").matches) {
    document.getElementById("dashboard-container").animate(
      [
        {
          offset: 0,
          transform: "translateX(0vw)",
          opacity: "1",
        },
        {
          offset: 0.25,
          opacity: "0.75",
        },
        {
          offset: 0.5,
          opacity: "0.5",
        },
        {
          offset: 0.75,
          opacity: "0.25",
        },
        {
          offset: 1,
          transform: "translateX(-100vw)",
          opacity: "0",
          display: "none",
        },
      ],
      {
        duration: 1000,
        easing: "ease",
        delay: 0,
        iterations: 1,
        direction: "normal",
        fill: "none",
      }
    );
    document.getElementById("call_container").animate(
      [
        {
          offset: 0,
          opacity: "0",
        },
        {
          offset: 1,
          opacity: "1",
        },
      ],
      {
        duration: 2800,
        easing: "ease",
        delay: 0,
        iterations: 1,
        direction: "normal",
        fill: "none",
      }
    );
    document.getElementById("call_container").style.opacity = "1";
    document.getElementById("logo_container").animate(
      [
        {
          offset: 0,
          opacity: "1",
        },
        {
          offset: 1,
          opacity: "0",
        },
      ],
      {
        duration: 1100,
        easing: "ease",
        delay: 0,
        iterations: 1,
        direction: "normal",
        fill: "none",
      }
    );

    setTimeout(() => {
      document.getElementById("dashboard-container").style.display = "none";
    }, 1000);
    closeDashboardContainerButton.classList.add("display_none");
  }
});

personalCodeVideoButton.addEventListener("click", () => {
  const calleePersonalCode = document.getElementById(
    "personal_code_input"
  ).value;
  const callType = constants.callType.VIDEO_PERSONAL_CODE;
  webRTCHandler.sendPreOffer(callType, calleePersonalCode);

  if (window.matchMedia("(max-width: 56.25em)").matches) {
    document.getElementById("dashboard-container").animate(
      [
        {
          offset: 0,
          transform: "translateX(0vw)",
          opacity: "1",
        },
        {
          offset: 0.25,
          opacity: "0.75",
        },
        {
          offset: 0.5,
          opacity: "0.5",
        },
        {
          offset: 0.75,
          opacity: "0.25",
        },
        {
          offset: 1,
          transform: "translateX(-100vw)",
          opacity: "0",
          display: "none",
        },
      ],
      {
        duration: 1000,
        easing: "ease",
        delay: 0,
        iterations: 1,
        direction: "normal",
        fill: "none",
      }
    );
    document.getElementById("call_container").animate(
      [
        {
          offset: 0,
          opacity: "0",
        },
        {
          offset: 1,
          opacity: "1",
        },
      ],
      {
        duration: 2800,
        easing: "ease",
        delay: 0,
        iterations: 1,
        direction: "normal",
        fill: "none",
      }
    );
    document.getElementById("call_container").style.opacity = "1";
    document.getElementById("logo_container").animate(
      [
        {
          offset: 0,
          opacity: "1",
        },
        {
          offset: 1,
          opacity: "0",
        },
      ],
      {
        duration: 1100,
        easing: "ease",
        delay: 0,
        iterations: 1,
        direction: "normal",
        fill: "none",
      }
    );

    setTimeout(() => {
      document.getElementById("dashboard-container").style.display = "none";
    }, 1000);
    closeDashboardContainerButton.classList.add("display_none");
  }
});

//event listeners for menu buttons in small devices (video-chat-dashboard button and chat-dashboard-display button)
const videoChatDashboardButton = document.getElementById(
  "video_chat_dashboard_button"
);
const closeDashboardContainerButton = document.getElementById(
  "close_dashboard_container_button"
);

videoChatDashboardButton.addEventListener("click", () => {
  document.getElementById("logo_container").style.opacity = "0";
  document.getElementById("call_container").style.opacity = "0";
  if (window.matchMedia("(max-width: 56.25em)").matches) {
    document.getElementById("dashboard-container").style.display = "flex";
    document.getElementById("dashboard-container").style.flex = "0 0 100%";
    document.getElementById("dashboard-container").style.width = "100vw";
    document.getElementById("dashboard-container").style.position = "fixed";
    document.getElementById("dashboard-container").style.zIndex = "1";
    document.getElementById("dashboard-container").style.top = "0";
    document.getElementById("dashboard-container").style.right = "0";
    document.getElementById("dashboard-container").animate(
      [
        {
          offset: 0,
          transform: "translateX(-100vw)",
          opacity: "0",
        },
        {
          offset: 0.25,
          opacity: "0.25",
        },
        {
          offset: 0.5,
          opacity: "0.5",
        },
        {
          offset: 0.75,
          opacity: "0.75",
        },
        {
          offset: 1,
          transform: "translateX(0vw)",
          opacity: "1",
        },
      ],
      {
        duration: 1000,
        easing: "ease",
        delay: 0,
        iterations: 1,
        direction: "normal",
        fill: "none",
      }
    );
    document.getElementById("call_container").animate(
      [
        {
          offset: 0,
          opacity: "1",
        },
        {
          offset: 1,
          opacity: "0",
        },
      ],
      {
        duration: 250,
        easing: "ease",
        delay: 0,
        iterations: 1,
        direction: "normal",
        fill: "none",
      }
    );
    document.getElementById("call_container").style.opacity = "0";
    document.getElementById("logo_container").animate(
      [
        {
          offset: 0,
          opacity: "0",
        },
        {
          offset: 1,
          opacity: "1",
        },
      ],
      {
        duration: 1100,
        easing: "ease",
        delay: 0,
        iterations: 1,
        direction: "normal",
        fill: "none",
      }
    );
    document.getElementById("logo_container").style.opacity = "1";
    closeDashboardContainerButton.classList.remove("display_none");
  }
});

closeDashboardContainerButton.addEventListener("click", () => {
  if (window.matchMedia("(max-width: 56.25em)").matches) {
    document.getElementById("dashboard-container").animate(
      [
        {
          offset: 0,
          transform: "translateX(0vw)",
          opacity: "1",
        },
        {
          offset: 0.25,
          opacity: "0.75",
        },
        {
          offset: 0.5,
          opacity: "0.5",
        },
        {
          offset: 0.75,
          opacity: "0.25",
        },
        {
          offset: 1,
          transform: "translateX(-100vw)",
          opacity: "0",
          display: "none",
        },
      ],
      {
        duration: 1000,
        easing: "ease",
        delay: 0,
        iterations: 1,
        direction: "normal",
        fill: "none",
      }
    );
    document.getElementById("call_container").animate(
      [
        {
          offset: 0,
          opacity: "0",
        },
        {
          offset: 1,
          opacity: "1",
        },
      ],
      {
        duration: 2800,
        easing: "ease",
        delay: 0,
        iterations: 1,
        direction: "normal",
        fill: "none",
      }
    );
    document.getElementById("call_container").style.opacity = "1";
    document.getElementById("logo_container").animate(
      [
        {
          offset: 0,
          opacity: "1",
        },
        {
          offset: 1,
          opacity: "0",
        },
      ],
      {
        duration: 1100,
        easing: "ease",
        delay: 0,
        iterations: 1,
        direction: "normal",
        fill: "none",
      }
    );

    setTimeout(() => {
      document.getElementById("dashboard-container").style.display = "none";
    }, 1000);

    closeDashboardContainerButton.classList.add("display_none");
  }
});

const chatMessageDisplayButton = document.getElementById(
  "chat_message_display_button"
);

const closeChatContainerButton = document.getElementById("close_chat_button");

chatMessageDisplayButton.addEventListener("click", () => {
  document.getElementById("logo_container").style.opacity = "0";
  document.getElementById("call_container").style.opacity = "0";
  if (window.matchMedia("(max-width: 37.5em)").matches) {
    document.getElementById("messenger-container").style.display = "flex";
    document.getElementById("messenger-container").style.flex = "0 0 100%";
    document.getElementById("messenger-container").style.width = "100vw";
    document.getElementById("messenger-container").style.position = "fixed";
    document.getElementById("messenger-container").style.zIndex = "1";
    document.getElementById("messenger-container").style.top = "0";
    document.getElementById("messenger-container").style.right = "0";
    document.getElementById("messenger-container").animate(
      [
        {
          offset: 0,
          transform: "translateX(-100vw)",
          opacity: "0",
        },
        {
          offset: 0.25,
          opacity: "0.25",
        },
        {
          offset: 0.5,
          opacity: "0.5",
        },
        {
          offset: 0.75,
          opacity: "0.75",
        },
        {
          offset: 1,
          transform: "translateX(0vw)",
          opacity: "1",
        },
      ],
      {
        duration: 1000,
        easing: "ease",
        delay: 0,
        iterations: 1,
        direction: "normal",
        fill: "none",
      }
    );
    document.getElementById("call_container").animate(
      [
        {
          offset: 0,
          opacity: "1",
        },
        {
          offset: 1,
          opacity: "0",
        },
      ],
      {
        duration: 250,
        easing: "ease",
        delay: 0,
        iterations: 1,
        direction: "normal",
        fill: "none",
      }
    );
    document.getElementById("call_container").style.opacity = "0";
    document.getElementById("logo_container").animate(
      [
        {
          offset: 0,
          opacity: "0",
        },
        {
          offset: 1,
          opacity: "1",
        },
      ],
      {
        duration: 1100,
        easing: "ease",
        delay: 0,
        iterations: 1,
        direction: "normal",
        fill: "none",
      }
    );
    document.getElementById("logo_container").style.opacity = "1";
    closeChatContainerButton.classList.remove("display_none");
  }
});

closeChatContainerButton.addEventListener("click", () => {
  if (window.matchMedia("(max-width: 37.5em)").matches) {
    document.getElementById("messenger-container").animate(
      [
        {
          offset: 0,
          transform: "translateX(0vw)",
          opacity: "1",
        },
        {
          offset: 0.25,
          opacity: "0.75",
        },
        {
          offset: 0.5,
          opacity: "0.5",
        },
        {
          offset: 0.75,
          opacity: "0.25",
        },
        {
          offset: 1,
          transform: "translateX(-100vw)",
          opacity: "0",
          display: "none",
        },
      ],
      {
        duration: 1000,
        easing: "ease",
        delay: 0,
        iterations: 1,
        direction: "normal",
        fill: "none",
      }
    );
    document.getElementById("call_container").animate(
      [
        {
          offset: 0,
          opacity: "0",
        },
        {
          offset: 1,
          opacity: "1",
        },
      ],
      {
        duration: 2800,
        easing: "ease",
        delay: 0,
        iterations: 1,
        direction: "normal",
        fill: "none",
      }
    );
    document.getElementById("call_container").style.opacity = "1";
    document.getElementById("logo_container").animate(
      [
        {
          offset: 0,
          opacity: "1",
        },
        {
          offset: 1,
          opacity: "0",
        },
      ],
      {
        duration: 1100,
        easing: "ease",
        delay: 0,
        iterations: 1,
        direction: "normal",
        fill: "none",
      }
    );

    setTimeout(() => {
      document.getElementById("messenger-container").style.display = "none";
    }, 1000);

    closeDashboardContainerButton.classList.add("display_none");
  }
});

// functionalities for stranger buttons

const strangerChatButton = document.getElementById("stranger_chat_button");
strangerChatButton.addEventListener("click", () => {
  strangerUtils.getStrangerSocketIdAndConnect(constants.callType.CHAT_STRANGER);

  if (window.matchMedia("(max-width: 56.25em)").matches) {
    document.getElementById("dashboard-container").animate(
      [
        {
          offset: 0,
          transform: "translateX(0vw)",
          opacity: "1",
        },
        {
          offset: 0.25,
          opacity: "0.75",
        },
        {
          offset: 0.5,
          opacity: "0.5",
        },
        {
          offset: 0.75,
          opacity: "0.25",
        },
        {
          offset: 1,
          transform: "translateX(-100vw)",
          opacity: "0",
          display: "none",
        },
      ],
      {
        duration: 1000,
        easing: "ease",
        delay: 0,
        iterations: 1,
        direction: "normal",
        fill: "none",
      }
    );
    document.getElementById("call_container").animate(
      [
        {
          offset: 0,
          opacity: "0",
        },
        {
          offset: 1,
          opacity: "1",
        },
      ],
      {
        duration: 2800,
        easing: "ease",
        delay: 0,
        iterations: 1,
        direction: "normal",
        fill: "none",
      }
    );
    document.getElementById("call_container").style.opacity = "1";
    document.getElementById("logo_container").animate(
      [
        {
          offset: 0,
          opacity: "1",
        },
        {
          offset: 1,
          opacity: "0",
        },
      ],
      {
        duration: 1100,
        easing: "ease",
        delay: 0,
        iterations: 1,
        direction: "normal",
        fill: "none",
      }
    );

    setTimeout(() => {
      document.getElementById("dashboard-container").style.display = "none";
    }, 1000);
    closeDashboardContainerButton.classList.add("display_none");
  }
});

const strangerVideoButton = document.getElementById("stranger_video_button");
strangerVideoButton.addEventListener("click", () => {
  strangerUtils.getStrangerSocketIdAndConnect(
    constants.callType.VIDEO_STRANGER
  );

  if (window.matchMedia("(max-width: 56.25em)").matches) {
    document.getElementById("dashboard-container").animate(
      [
        {
          offset: 0,
          transform: "translateX(0vw)",
          opacity: "1",
        },
        {
          offset: 0.25,
          opacity: "0.75",
        },
        {
          offset: 0.5,
          opacity: "0.5",
        },
        {
          offset: 0.75,
          opacity: "0.25",
        },
        {
          offset: 1,
          transform: "translateX(-100vw)",
          opacity: "0",
          display: "none",
        },
      ],
      {
        duration: 1000,
        easing: "ease",
        delay: 0,
        iterations: 1,
        direction: "normal",
        fill: "none",
      }
    );
    document.getElementById("call_container").animate(
      [
        {
          offset: 0,
          opacity: "0",
        },
        {
          offset: 1,
          opacity: "1",
        },
      ],
      {
        duration: 2800,
        easing: "ease",
        delay: 0,
        iterations: 1,
        direction: "normal",
        fill: "none",
      }
    );
    document.getElementById("call_container").style.opacity = "1";
    document.getElementById("logo_container").animate(
      [
        {
          offset: 0,
          opacity: "1",
        },
        {
          offset: 1,
          opacity: "0",
        },
      ],
      {
        duration: 1100,
        easing: "ease",
        delay: 0,
        iterations: 1,
        direction: "normal",
        fill: "none",
      }
    );

    setTimeout(() => {
      document.getElementById("dashboard-container").style.display = "none";
    }, 1000);
    closeDashboardContainerButton.classList.add("display_none");
  }
});

// register event that allows connections from strangers

const checkbox = document.getElementById("allow_strangers_checkbox");
checkbox.addEventListener("click", () => {
  // console.log("gundam");
  const checkboxState = store.getState().allowConnectionsFromStrangers;
  ui.updateStrangerCheckbox(!checkboxState);
  store.setAllowConnectionsFromStrangers(!checkboxState);
  strangerUtils.changeStrangerConnectionStatus(!checkboxState);
});

//event listeners for video call buttons

const micButton = document.getElementById("mic_button");
micButton.addEventListener("click", () => {
  const localStream = store.getState().localStream;
  const micEnabled = localStream.getAudioTracks()[0].enabled;
  localStream.getAudioTracks()[0].enabled = !micEnabled;
  ui.updateMicButton(micEnabled);
});

const cameraButton = document.getElementById("camera_button");
cameraButton.addEventListener("click", () => {
  const localStream = store.getState().localStream;
  const cameraEnabled = localStream.getVideoTracks()[0].enabled;
  localStream.getVideoTracks()[0].enabled = !cameraEnabled;
  ui.updateCameraButton(cameraEnabled);
});

const switchForScreenSharingButton = document.getElementById(
  "screen_sharing_button"
);
switchForScreenSharingButton.addEventListener("click", () => {
  const screenSharingActive = store.getState().screenSharingActive;
  webRTCHandler.switchBetweenCameraAndScreenSharing(screenSharingActive);
});

//messenger

const newMessageInput = document.getElementById("new_message_input");
newMessageInput.addEventListener("keydown", (event) => {
  // console.log("change occured");
  const key = event.key;

  if (key === "Enter") {
    webRTCHandler.sendMessageUsingDataChannel(event.target.value);
    ui.appendMessage(event.target.value, true);
    newMessageInput.value = "";
  }
});

const sendMessageButton = document.getElementById("send_message_button");
sendMessageButton.addEventListener("click", () => {
  const message = newMessageInput.value;
  webRTCHandler.sendMessageUsingDataChannel(message);
  ui.appendMessage(message, true);
  newMessageInput.value = "";
});

//recording

const startRecordingButton = document.getElementById("start_recording_button");
startRecordingButton.addEventListener("click", () => {
  recordingUtils.startRecording();
  ui.showRecordingPanel();
});

const stopRecordingButton = document.getElementById("stop_recording_button");
stopRecordingButton.addEventListener("click", () => {
  recordingUtils.stopRecording();
  ui.resetRecordingButtons();
});

const pauseRecordingButton = document.getElementById("pause_recording_button");
pauseRecordingButton.addEventListener("click", () => {
  recordingUtils.pauseRecording();
  ui.switchRecordingButtons(true);
});

const resumeRecordingButton = document.getElementById(
  "resume_recording_button"
);
resumeRecordingButton.addEventListener("click", () => {
  recordingUtils.resumeRecording();
  ui.switchRecordingButtons();
});

// hang up

const hangUpButton = document.getElementById("hang_up_button");
hangUpButton.addEventListener("click", () => {
  webRTCHandler.handleHangUp();
});

const hangUpChatButton = document.getElementById("finish_chat_call_button");
hangUpChatButton.addEventListener("click", () => {
  webRTCHandler.handleHangUp();
});
