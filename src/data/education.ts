export interface EducationUniversity {
  name: string;
  originalName: string;
  abbreviation: string;
}

export interface EducationExperience {
  role: string;
  start: string;
  end: string;
  description: string;
}

export interface EducationInterface {
  title: string;
  abbreviation: string;
  university: EducationUniversity;
  start: string;
  end: string;
  experiences: Array<EducationExperience>;
}

export const educations = [
  {
    title: "Bachelor of Computer Science",
    abbreviation: "BSc",
    university: {
      name: "Federal University of Ouro Preto",
      originalName: "Universidade Federal de Ouro Preto",
      abbreviation: "UFOP",
    },
    start: "01/08/2018",
    end: "01/04/2025",
    experiences: [
      {
        role: "Teaching Assistant – Data Structures",
        start: "01/09/2019",
        end: "01/03/2020",
        description: `Supported the Data Structures course by creating exercises, reviewing assignments, and assisting students with coding challenges. Topics included algorithm complexity, recursion, lists, stacks, queues, sorting algorithms, binary and AVL trees, and hash tables.`,
      },
      {
        role: "Undergraduate Research – High Performance Computing (HPC)",
        start: "01/08/2019",
        end: "01/09/2019",
        description: `Contributed to the development of JCL-Opt, a Java-based framework that applies optimization techniques like backtracking and permutations on distributed systems using JCL. Focused on modular design, load balancing, and efficient data handling strategies.`,
      },
      {
        role: "Participant – opCod3rs Program",
        start: "31/08/2018",
        end: "28/06/2019",
        description: `Took part in a competitive programming training program aimed at preparing students for algorithmic challenges and ICPC-style contests. Regularly practiced advanced data structures, dynamic programming, and graph theory through weekly problem-solving sessions.`,
      },
    ],
  },
];

