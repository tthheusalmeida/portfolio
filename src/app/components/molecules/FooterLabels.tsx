export default function FooterLabels() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <span className="text-xs sm:text-base font-medium select-all">
        dev.almeida.matheus@gmail.com
      </span>
      <span className="flex flex-col sm:flex-row gap-2 text-xs sm:text-base font-normal text-gray-200/50 select-none text-center">
        <div className="flex gap-2">
          <span>Copyright © 2025</span>
          <span>-</span>
          <span>Matheus Almeida</span>
        </div>
        <span className="hidden sm:inline">-</span>
        <span>All Rights Reserved</span>
      </span>
    </div>
  );
}
