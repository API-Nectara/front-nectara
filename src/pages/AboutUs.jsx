import TeamCard from "../components/TeamCard";

const AboutUs = () => {
  const team = [
    {
      name: "Sofía Mbaye",
      image: "",
      bio: "Desarrolladora front-end apasionada por la conservación y la tecnología en África.",
      linkedin: "https://www.linkedin.com/in/sofia",
      github: "https://github.com/sofiambaye"
    },
    {
      name: "Amina B.",
      image: "/images/amina.jpg",
      bio: "Diseñadora UI/UX enfocada en biodiversidad y experiencias educativas.",
      linkedin: "https://www.linkedin.com/in/aminab",
      github: "https://github.com/aminab"
    }
  ];

  return (
    <div className="min-h-screen bg-green-50 py-16 px-6">
      <h1 className="text-4xl font-bold text-center text-green-800 mb-12">Nuestro equipo</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {team.map((member, index) => (
          <TeamCard key={index} {...member} />
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
