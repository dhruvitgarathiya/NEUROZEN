import { useEffect } from "react";

const JitsiMeet = ({ roomName, displayName }) => {
  useEffect(() => {
    const domain = "meet.jit.si"; // Free Jitsi domain
    const options = {
      roomName: roomName,
      parentNode: document.getElementById("jitsi-container"),
      userInfo: {
        displayName: displayName,
      },
      configOverwrite: {
        startWithAudioMuted: true,
        startWithVideoMuted: false,
      },
    };
    const api = new window.JitsiMeetExternalAPI(domain, options);

    return () => api.dispose(); // Clean up on component unmount
  }, [roomName, displayName]);

  return <div id="jitsi-container" style={{ height: "600px", width: "100%" }}></div>;
};

export default JitsiMeet;
