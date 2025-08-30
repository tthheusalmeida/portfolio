export interface CertificationIssuer {
  name: string;
  image: string;
}

export interface CertificationInterface {
  title: string;
  issuer: CertificationIssuer;
  date: string;
  link: string;
  skills: string[];
}

export const certifications: CertificationInterface[] = [
  {
    title: "Certified Mid-Level Vue.js Developer",
    issuer: {
      name: "Certificates.dev",
      image:
        "https://media.licdn.com/dms/image/v2/D4E0BAQEYdbtxdV6sUw/company-logo_100_100/company-logo_100_100/0/1693985746906/vue_js_certification_logo?e=1759363200&v=beta&t=g6gCkXM64uSxVWM1wfEHeDkxAqdcByVp007gMU0tm00",
    },
    date: "15/08/2025",
    link: "https://api.certificates.dev/certificates/9fba18b5-3642-43ca-a0d7-7dddf2ba5c09/download?signature=3b736a01238ae856d4c8c13aab5de7b13299ef6c254133d9898c22b1f43a0a52",
    skills: ["Vue 3"],
  },
];
