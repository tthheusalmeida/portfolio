interface SoftSkillProps {
  label: string;
}

export default function SoftSkill({ label }: SoftSkillProps) {
  return (
    <span className="text-3xl font-bold text-gray-200 h-9 text-center mx-4 select-all">
      {label}
    </span>
  );
}
