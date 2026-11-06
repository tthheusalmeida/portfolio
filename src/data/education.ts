export interface EducationUniversity {
  name: string;
  originalName: string;
  abbreviation: string;
  image: string;
}

export interface EducationExperience {
  role: string;
  start: string;
  end: string;
  description: string;
}

export type EducationLevel = "undergraduate" | "postgraduate";

export interface EducationInterface {
  level: EducationLevel;
  title: string;
  abbreviation: string | null;
  description: string;
  university: EducationUniversity;
  start: string;
  end: string | null;
  experiences: Array<EducationExperience>;
}

export const educations: EducationInterface[] = [
  {
    level: "undergraduate",
    title: "Computer Science",
    abbreviation: "B.Sc.",
    description:
      "Computer Science degree with a solid base in algorithms and data structures, built alongside teaching, research and competitive programming.",
    university: {
      name: "Federal University of Ouro Preto",
      originalName: "Universidade Federal de Ouro Preto",
      abbreviation: "UFOP",
      image: "/educations/ufop_logo.webp",
    },
    start: "01/08/2018",
    end: "01/04/2025",
    experiences: [
      {
        role: "Teaching Assistant – Data Structures",
        start: "01/09/2019",
        end: "01/03/2020",
        description: `Created exercises, reviewed assignments and supported students in Data Structures: complexity, recursion, trees, hash tables and sorting.`,
      },
      {
        role: "Undergraduate Research – High Performance Computing (HPC)",
        start: "01/08/2019",
        end: "01/09/2019",
        description: `Contributed to JCL-Opt, a Java framework for distributed optimization (backtracking and permutations), focusing on modular design and load balancing.`,
      },
      {
        role: "Participant – opCod3rs Program",
        start: "31/08/2018",
        end: "28/06/2019",
        description: `Weekly competitive programming training for ICPC-style contests: advanced data structures, dynamic programming and graph theory.`,
      },
    ],
  },
  {
    level: "postgraduate",
    title: "DevOps & Cloud Platform Engineering with Artificial Intelligence",
    abbreviation: null,
    description:
      "Ongoing specialization focused on DevOps, cloud platform engineering and Artificial Intelligence.",
    university: {
      name: "Pontifical Catholic University of Minas Gerais",
      originalName: "Pontifícia Universidade Católica de Minas Gerais",
      abbreviation: "PUC Minas",
      image: "/educations/puc_minas_logo.webp",
    },
    start: "01/07/2026",
    end: null,
    experiences: [],
  },
];
