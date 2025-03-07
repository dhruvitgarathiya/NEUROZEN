import JitsiMeet from '../components/meetingRoom/Meeting';

function MeetingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-full text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Start Meeting</h2>
        <JitsiMeet roomName="MentalHealthRoom" displayName="Marie" />
      </div>
    </div>
  );
}

export default MeetingPage;
