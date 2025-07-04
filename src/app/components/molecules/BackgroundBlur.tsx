export default function BackgroundBlur() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      {/* Bolha roxa */}
      <div className="absolute top-[-10%] left-[5%] w-[400px] h-[400px] bg-orange-400 opacity-30 rounded-full blur-[150px] animate-pulse-slow" />

      {/* Bolha azul */}
      <div className="absolute top-[30%] left-[60%] w-[300px] h-[300px] bg-yellow-400 opacity-20 rounded-full blur-[120px] animate-float-slow" />

      {/* Bolha indigo no canto inferior */}
      <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-orange-400 opacity-25 rounded-full blur-[180px] animate-pulse-slow animate-delay-[2s]" />
    </div>
  );
}
