import JitsiMeet from '../components/meetingRoom/JitsiMeet';
import './App.css';

function MeetingPage() {
  return (
    <div className="app-container">
      <h2>Start Meeting</h2>
      <JitsiMeet roomName="MentalHealthRoom" displayName="Marie" />
    </div>
  );
}

export default MeetingPage;