export interface TestimonialInterface {
  name: string;
  role: string;
  descriptions: string;
  highlight: string;
  relationship: string;
  // Only featured testimonials are shown on the page.
  featured: boolean;
}

export const testimonials: TestimonialInterface[] = [
  {
    name: "Luiz Fagner Zordan",
    role: "Engineering Manager | Tech Manager",
    descriptions: `I had the opportunity to work with Matheus and I can say he's an incredible
      professional. With solid technical knowledge in front-end, he learns quickly, adapts
      easily to new challenges, and is always committed to delivering the best results.

      Beyond the technical aspects, what stands out most is how helpful and collaborative
      he is—always willing to help the team, share knowledge, and contribute to process
      improvements.

      He's the kind of person who makes a difference both through his talent and his
      personality: a kind, responsible person with a positive energy that permeates the
      environment. A partnership any team would be lucky to have!
    `,
    highlight: "A partnership any team would be lucky to have!",
    relationship: "Was my manager",
    featured: true,
  },
  {
    name: "João Silva",
    role: "Front-end Engineering | Tech Lead | Chapter Lead",
    descriptions: `I’ve had the pleasure of witnessing Matheus’ professional journey since
      his early days in the tech field, and I’ve always been impressed by how quickly and
      deeply he learns.
      He approaches challenges with an open and collaborative mindset. Even when he’s not
      the most senior person on the team, he consistently steps up to support both projects
      and teammates.
      Matheus is someone who’s always seeking to grow — whether by learning from his colleagues,
      reflecting on his own work, or understanding the broader impact of the products he helps
      build. On top of that, he maintains excellent interpersonal relationships and contributes
      to a positive team dynamic.
      In a market where effective results through technology are increasingly sought, Matheus is
      the kind of professional you can rely on. Whenever I have the opportunity, I invite him to
      join my projects.
    `,
    highlight: "Whenever I have the opportunity, I invite him to join my projects.",
    relationship: "Was my manager",
    featured: true,
  },
  {
    name: "Milla Railana de Oliveira",
    role: "DBA | DBRE | Take Blip",
    descriptions: `I had the opportunity to work with Matheus for a few years and I can say he is
      an extremely competent front-end professional. His work and dedication are excellent,
      always delivering quality solutions with attention to detail.

      Matheus stands out for his great problem-solving skills, mastery of environment testing
      and proactive attitude day to day. He is also a very smart person who learns easily,
      which makes him quick to handle new challenges and technologies.

      He is also very committed to deadlines and deliveries, bringing confidence to the team
      and contributing consistently to results. I strongly recommend Matheus to any team or
      project looking for a responsible, dedicated developer with excellent professional
      potential.

      Besides being an excellent professional, Matheus also stands out as a person. He is
      kind, respectful and shows genuine concern for the people around him, always
      contributing to a positive, collaborative and healthy work environment. His empathy
      and care for the team make all the difference day to day.
    `,
    highlight:
      "An extremely competent front-end professional, always delivering quality solutions with attention to detail.",
    relationship: "Worked together",
    featured: true,
  },
  {
    name: "Fábio Gomide",
    role: "Product Design Specialist | Host of the Criativos Podcast",
    descriptions: `Working with Matheus was an enriching experience.
      Since his very first professional role, his eagerness to learn
      and overcome challenges has always stood out. I had the privilege
      of closely following his growth, as we were part of the same team,
      and I can confidently say: he is relentless. He always gives his best,
      collaborates excellently, is ready to help, and is constantly seeking new knowledge.

      A great example of this was our many conversations about design—not just product
      design, but design as a discipline. Matheus was one of the key advocates for design
      quality in our context, always going above and beyond to contribute. His growth is
      inevitable, and any team would be lucky to have him. A highly recommended professional!
    `,
    highlight: "His growth is inevitable, and any team would be lucky to have him.",
    relationship: "Worked together",
    featured: true,
  },
  {
    name: "Gideão Levi Frota",
    role: "Front-End Developer | Vue.js | React.js | TypeScript",
    descriptions: `Matheus is one of the greatest developers I have worked with. He has great tech
      skills and is a team player, helping his coworkers and contributing to a better workplace. Also,
      he's an excellent problem solver, and helped the team to improve our platforms with good
      performance and clean code. I hope we can work together again sometime.
    `,
    highlight: "One of the greatest developers I have worked with.",
    relationship: "Worked together",
    featured: true,
  },
  {
    name: "Lucas Urzedo",
    role: "DataOps Engineer at Sem Parar Doc",
    descriptions: `Matheus has excellent technical skills, the ability to solve complex
      problems, great strategic vision and leadership. Also, has qualities as a person,
      fundamental in any organization, such as communication skills, resilience and always
      willing to help. We graduated college together and I believe that Matheus has all the
      conditions to develop further in his career, constituting an asset of enormous value
      for any organization.
    `,
    highlight: "Excellent technical skills, great strategic vision and leadership.",
    relationship: "Studied together",
    featured: true,
  },
  {
    name: "Patrícia de Cássia",
    role: "Leadership and Career Mentor",
    descriptions: `Matheus has solid experience as a Front-End Software Engineer, developer of
      AI-integrated solutions and front-end developer, with a strong results-oriented,
      analytical profile. He is a specialist in his field, determined, and keeps a high
      level of quality in his deliveries at work.

      Leading his own career to drive his professional growth, Matheus decided to invest in
      Career Mentoring to speed up the achievement of his professional goals with dedication,
      strong commitment and strategy. A smart decision from someone who stands out in the
      job market in his field.

      Thank you, Matheus, for trusting my work as a Career and Leadership Mentor, and
      congratulations on the results achieved... this is only the beginning.

      Success.
    `,
    highlight:
      "A results-oriented, analytical specialist, determined and committed to the quality of his deliveries.",
    relationship: "Career mentor",
    featured: false,
  },
  {
    name: "Gabriel Caetano Araújo",
    role: "Backend Software Engineer | Java · Elasticsearch · MongoDB · AWS",
    descriptions: `Matheus is one of those people who naturally elevate the environment
      just by being around. Whether solving a problem or helping someone along the way, he
      brings clarity, focus, and a calm energy that makes everything flow more smoothly.
      During the time we studied together, I saw firsthand how dedicated he is — not just
      to the task at hand, but to doing it well, with attention to detail and consistency.
      He has an energy that inspires and drives those around him. Working with him was always
      a smooth and motivating experience.
    `,
    highlight: "He brings clarity, focus, and a calm energy that makes everything flow more smoothly.",
    relationship: "Studied together",
    featured: false,
  },
  {
    name: "Caio Costa",
    role: "Data Engineer | GCP | Python | Git | Airflow | Spark",
    descriptions: `I had the pleasure of studying alongside Matheus. From the beginning, it was clear
      that he stood out for his technical skills, critical thinking, and collaborative spirit. He
      consistently approached problems with creativity and was always willing to help others grasp
      complex topics. Whether working on academic projects or exploring personal tech interests, he
      brought a strong work ethic and a passion for learning that made him a valuable friend during
      the period we studied together and the years after.
    `,
    highlight: "A strong work ethic and a passion for learning.",
    relationship: "Studied together",
    featured: false,
  },
];
