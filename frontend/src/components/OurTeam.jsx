const teamMembers = [
    { name: "Jatin Parmar", role: "Frontend Developer", img: "https://pbs.twimg.com/media/Gc1IV39XQAA0aNN.jpg:large" },
    { name: "Dhruvit Garathiya", role: "Frontend Developer", img: "https://wallpapers-clan.com/wp-content/uploads/2024/11/just-a-chill-guy-pfp-06.jpg" },
    { name: "Yash Parmar", role: "Backend Developer", img: "https://wallpapers-clan.com/wp-content/uploads/2024/11/just-a-chill-guy-pfp-08.jpg" },
    { name: "Meet Bhesara", role: "AI/ML Specialist", img: "https://wallpapers-clan.com/wp-content/uploads/2024/11/just-a-chill-guy-pfp-32.jpg" },
  ];
  
  const TeamSection = () => {
    return (
      <section id="team" className="py-16 px-6 text-center bg-white">
        <h2 className="text-3xl font-bold text-green-700">Meet Our Developers (The Chill Guys)</h2>
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-green-100 p-6 rounded-xl shadow-lg text-center">
              <img src={member.img} alt={member.name} className="w-24 h-24 mx-auto rounded-full" />
              <h3 className="mt-3 font-semibold text-lg">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default TeamSection;
  