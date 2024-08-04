import * as wss from "./wss.js";
import * as constants from "./constants.js";
import * as ui from "./ui.js";
import * as store from "./store.js";

let connectedUserDetails;
let peerConnection;
let dataChannel;

const defaultConstraints = {
  audio: true,
  video: true,
};

const configuration = {
  iceServers: [
    {
      urls: "stun:stun.1.google.com:13902",
    },
  ],
};

const playRingtone = () => {
  document.getElementById("ringtone").play();
};
const stopRingtone = () => {
  document.getElementById("ringtone").pause();
  document.getElementById("ringtone").currentTime = 0;
};

export const getLocalPreview = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(
      defaultConstraints
    );
    ui.updateLocalVideo(stream);
    ui.showVideoCallButtons();
    store.setCallState(constants.callState.CALL_AVAILABLE);
    store.setLocalStream(stream);
  } catch (error) {
    console.log("error occured when trying to get access to camera");
    console.log(error);
  }
};

const createPeerConnection = () => {
  stopRingtone();

  peerConnection = new RTCPeerConnection(configuration);

  dataChannel = peerConnection.createDataChannel("chat");

  peerConnection.ondatachannel = (event) => {
    const dataChannel = event.channel;

    // dataChannel.onopen = () => {
    //   console.log("peer connection is ready to recive data channel messages");
    // };

    dataChannel.onmessage = (event) => {
      // console.log("message came from data channel");
      const message = JSON.parse(event.data);
      ui.appendMessage(message);
      const chatButtonAnimate = document.getElementById(
        "chat_message_display_button"
      );
      chatButtonAnimate.animate(
        [
          {
            offset: 0,
            transform: "scale(1) rotate(0deg)",
            transformOrigin: "50% 50%",
          },
          {
            offset: 0.1,
            transform: "scale(1.3) rotate(8deg)",
          },
          {
            offset: 0.2,
            transform: "scale(1) rotate(-10deg)",
          },
          {
            offset: 0.3,
            transform: "scale(1.3) rotate(10deg)",
          },
          {
            offset: 0.4,
            transform: "scale(1) rotate(-10deg)",
          },
          {
            offset: 0.5,
            transform: "scale(1.3) rotate(10deg)",
          },
          {
            offset: 0.6,
            transform: "scale(1) rotate(-10deg)",
          },
          {
            offset: 0.7,
            transform: "scale(1.3) rotate(10deg)",
          },
          {
            offset: 0.8,
            transform: "scale(1) rotate(-8deg)",
          },
          {
            offset: 0.9,
            transform: "scale(1.3) rotate(8deg)",
          },
          {
            offset: 1,
            transform: "scale(1) rotate(0deg)",
            transformOrigin: "50% 50%",
          },
        ],
        {
          duration: 1400,
          easing: "ease-out",
          delay: 0,
          iterations: 4,
          direction: "alternate",
          fill: "none",
        }
      );
    };
  };

  peerConnection.onicecandidate = (event) => {
    // console.log("getting ice candidates from stun server");

    if (event.candidate) {
      // send our ice candidates to other peer
      wss.sendDataUsingWebRTCSignaling({
        connectedUserSocketId: connectedUserDetails.socketId,
        type: constants.webRTCSignaling.ICE_CANDIDATE,
        candidate: event.candidate,
      });
    }
  };

  // peerConnection.onconnectionstatechange = (event) => {
  //   if (peerConnection.connectionState === "connected") {
  //     console.log("successfully connected with other peer");
  //   }
  // };

  //receiving tracks
  const remoteStream = new MediaStream();
  store.setRemoteStream(remoteStream);
  ui.updateRemoteVideo(remoteStream);

  peerConnection.ontrack = (event) => {
    remoteStream.addTrack(event.track);
  };

  //add our stream to peer connection

  if (
    connectedUserDetails.callType === constants.callType.VIDEO_PERSONAL_CODE ||
    connectedUserDetails.callType === constants.callType.VIDEO_STRANGER
  ) {
    const localStream = store.getState().localStream;

    for (const track of localStream.getTracks()) {
      peerConnection.addTrack(track, localStream);
    }
  }
};

export const sendMessageUsingDataChannel = (message) => {
  const stringifiedMessage = JSON.stringify(message);
  dataChannel.send(stringifiedMessage);
};

export const sendPreOffer = (callType, calleePersonalCode) => {
  playRingtone();
  connectedUserDetails = {
    callType,
    socketId: calleePersonalCode,
  };

  if (
    callType === constants.callType.CHAT_PERSONAL_CODE ||
    callType === constants.callType.VIDEO_PERSONAL_CODE
  ) {
    const data = {
      callType,
      calleePersonalCode,
    };

    ui.showCallingDialog(callingDialogRejectCallHandler);
    store.setCallState(constants.callState.CALL_UNAVAILABLE);
    wss.sendPreOffer(data);
  }

  if (
    callType === constants.callType.CHAT_STRANGER ||
    callType === constants.callType.VIDEO_STRANGER
  ) {
    const data = {
      callType,
      calleePersonalCode,
    };
    store.setCallState(constants.callState.CALL_UNAVAILABLE);
    wss.sendPreOffer(data);
  }
};

export const handlePreOffer = (data) => {
  playRingtone();
  const { callType, callerSocketId } = data;

  if (!checkCallPossibility()) {
    document.getElementById("ringtone").pause();
    document.getElementById("ringtone").currentTime = 0;
    return sendPreOfferAnswer(
      constants.preOfferAnswer.CALL_UNAVAILABLE,
      callerSocketId
    );
  }

  connectedUserDetails = {
    socketId: callerSocketId,
    callType,
  };

  store.setCallState(constants.callState.CALL_UNAVAILABLE);

  if (
    callType === constants.callType.CHAT_PERSONAL_CODE ||
    callType === constants.callType.VIDEO_PERSONAL_CODE
  ) {
    ui.showIncomingCallDialog(callType, acceptCallHandler, rejectCallHandler);
  }

  if (
    callType === constants.callType.CHAT_STRANGER ||
    callType === constants.callType.VIDEO_STRANGER
  ) {
    createPeerConnection();
    sendPreOfferAnswer(constants.preOfferAnswer.CALL_ACCEPTED);
    ui.showCallElements(connectedUserDetails.callType);

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
  }
};

const acceptCallHandler = () => {
  // console.log("call accepted");
  createPeerConnection();
  sendPreOfferAnswer(constants.preOfferAnswer.CALL_ACCEPTED);
  ui.showCallElements(connectedUserDetails.callType);
};

const rejectCallHandler = () => {
  // console.log("call rejected");
  sendPreOfferAnswer(constants.preOfferAnswer.CALL_REJECTED);
  setIncomingCallsAvailable();
};

const callingDialogRejectCallHandler = () => {
  const data = {
    connectedUserSocketId: connectedUserDetails.socketId,
  };
  closePeerConnectionAndResetState();
  wss.sendUserHangedUp(data);
};

const sendPreOfferAnswer = (preOfferAnswer, callerSocketId = null) => {
  const socketId = callerSocketId
    ? callerSocketId
    : connectedUserDetails.socketId;
  const data = {
    callerSocketId: socketId,
    preOfferAnswer,
  };

  ui.removeAllDialogs();
  wss.sendPreOfferAnswer(data);
};

export const handlePreOfferAnswer = (data) => {
  const { preOfferAnswer } = data;
  // console.log("pre offer answer came");
  // console.log(data);

  ui.removeAllDialogs();

  if (preOfferAnswer === constants.preOfferAnswer.CALLEE_NOT_FOUND) {
    ui.showInfoDialog(preOfferAnswer);
    setIncomingCallsAvailable();
    // show dialog that callee has not been found
  }

  if (preOfferAnswer === constants.preOfferAnswer.CALL_UNAVAILABLE) {
    setIncomingCallsAvailable();
    ui.showInfoDialog(preOfferAnswer);
    // show dialog that callee is not able to connect
  }

  if (preOfferAnswer === constants.preOfferAnswer.CALL_REJECTED) {
    setIncomingCallsAvailable();
    ui.showInfoDialog(preOfferAnswer);
    // show dialog that call is rejected by the callee
  }

  if (preOfferAnswer === constants.preOfferAnswer.CALL_ACCEPTED) {
    ui.showCallElements(connectedUserDetails.callType);
    createPeerConnection();
    sendWebRTCOffer();
    // send webRTC offer

    document.getElementById("video_chat_dashboard_button").disabled = true;
    document.getElementById("video_chat_dashboard_button").style.background =
      "rgba(255, 255, 255, 0.218)";
    document.getElementById(
      "video_chat_dashboard_button"
    ).style.backdropFilter = "blur(0.5px)";
    document.getElementById("video_chat_dashboard_button").style.cursor =
      "not-allowed";
  }
};

const sendWebRTCOffer = async () => {
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  wss.sendDataUsingWebRTCSignaling({
    connectedUserSocketId: connectedUserDetails.socketId,
    type: constants.webRTCSignaling.OFFER,
    offer: offer,
  });
};

export const handleWebRTCOffer = async (data) => {
  await peerConnection.setRemoteDescription(data.offer);
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  wss.sendDataUsingWebRTCSignaling({
    connectedUserSocketId: connectedUserDetails.socketId,
    type: constants.webRTCSignaling.ANSWER,
    answer: answer,
  });
};

export const handleWebRTCAnswer = async (data) => {
  // console.log("handling webRTC Answer");
  await peerConnection.setRemoteDescription(data.answer);
};

export const handleWebRTCCandidate = async (data) => {
  try {
    await peerConnection.addIceCandidate(data.candidate);
  } catch (error) {
    console.error(
      "error occured when trying to add received ice candidate",
      error
    );
  }
};
let screenSharingStream;

export const switchBetweenCameraAndScreenSharing = async (
  screenSharingActive
) => {
  if (screenSharingActive) {
    const localStream = store.getState().localStream;
    const senders = peerConnection.getSenders();

    const sender = senders.find((sender) => {
      return sender.track.kind === localStream.getVideoTracks()[0].kind;
    });
    if (sender) {
      sender.replaceTrack(localStream.getVideoTracks()[0]);
    }

    store
      .getState()
      .screenSharingStream.getTracks()
      .forEach((track) => {
        return track.stop();
      });

    store.setScreenSharingActive(!screenSharingActive);
    ui.updateLocalVideo(localStream);
  } else {
    // console.log("switching for screen sharing");
    try {
      screenSharingStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      store.setScreenSharingStream(screenSharingStream);

      //replace track which sender is sending
      const senders = peerConnection.getSenders();

      const sender = senders.find((sender) => {
        return (
          sender.track.kind === screenSharingStream.getVideoTracks()[0].kind
        );
      });

      if (sender) {
        sender.replaceTrack(screenSharingStream.getVideoTracks()[0]);
      }
      store.setScreenSharingActive(!screenSharingActive);

      ui.updateLocalVideo(screenSharingStream);
    } catch (error) {
      console.error(
        "error occured when trying to get screen sharing stream",
        error
      );
    }
  }
};

// hang up

export const handleHangUp = () => {
  const data = {
    connectedUserSocketId: connectedUserDetails.socketId,
  };

  wss.sendUserHangedUp(data);
  closePeerConnectionAndResetState();
  if (window.matchMedia("(max-width: 56.25em)").matches) {
    document.getElementById("video_chat_dashboard_button").disabled = false;
    document.getElementById("video_chat_dashboard_button").style.background =
      "rgba(0, 0, 0, 0.2)";
    document.getElementById(
      "video_chat_dashboard_button"
    ).style.backdropFilter = "none";
    document.getElementById("video_chat_dashboard_button").style.cursor =
      "pointer";
  }

  if (window.matchMedia("(min-width: 56.26em)").matches) {
    document.getElementById("video_chat_dashboard_button").disabled = false;
    document.getElementById("video_chat_dashboard_button").style.background =
      "rgba(0, 0, 0, 0.2)";
    document.getElementById(
      "video_chat_dashboard_button"
    ).style.backdropFilter = "none";
    document.getElementById("video_chat_dashboard_button").style.cursor =
      "pointer";
  }
};

export const handleConnectedUserHangedUp = () => {
  closePeerConnectionAndResetState();
  if (window.matchMedia("(max-width: 56.25em)").matches) {
    document.getElementById("video_chat_dashboard_button").disabled = false;
    document.getElementById("video_chat_dashboard_button").style.background =
      "rgba(0, 0, 0, 0.2)";
    document.getElementById(
      "video_chat_dashboard_button"
    ).style.backdropFilter = "none";
    document.getElementById("video_chat_dashboard_button").style.cursor =
      "pointer";
  }

  if (window.matchMedia("(min-width: 56.26em)").matches) {
    document.getElementById("video_chat_dashboard_button").disabled = false;
    document.getElementById("video_chat_dashboard_button").style.background =
      "rgba(0, 0, 0, 0.2)";
    document.getElementById(
      "video_chat_dashboard_button"
    ).style.backdropFilter = "none";
    document.getElementById("video_chat_dashboard_button").style.cursor =
      "pointer";
  }
};

const closePeerConnectionAndResetState = () => {
  stopRingtone();
  if (peerConnection) {
    peerConnection.close();
    peerConnection = null;
  }

  // active mic and camera
  if (
    connectedUserDetails.callType === constants.callType.VIDEO_PERSONAL_CODE ||
    connectedUserDetails.callType === constants.callType.VIDEO_STRANGER
  ) {
    store.getState().localStream.getVideoTracks()[0].enabled = true;
    store.getState().localStream.getAudioTracks()[0].enabled = true;
  }

  ui.updateUIAfterHangUp(connectedUserDetails.callType);
  setIncomingCallsAvailable();
  connectedUserDetails = null;
};

const checkCallPossibility = (callType) => {
  const callState = store.getState().callState;

  if (callState === constants.callState.CALL_AVAILABLE) {
    return true;
  }

  if (
    (callType === constants.callType.VIDEO_PERSONAL_CODE ||
      callType === constants.callType.VIDEO_STRANGER) &&
    callState === constants.callState.CALL_AVAILABLE_ONLY_CHAT
  ) {
    return false;
  }

  return false;
};

const setIncomingCallsAvailable = () => {
  stopRingtone();
  const localStream = store.getState().localStream;
  if (localStream) {
    store.setCallState(constants.callState.CALL_AVAILABLE);
  } else {
    store.setCallState(constants.callState.CALL_AVAILABLE_ONLY_CHAT);
  }
};
