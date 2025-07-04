export default function BackgroundBlur() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      <div className="absolute top-[-10%] left-[5%] w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-orange-400 opacity-30 rounded-full blur-[60px] sm:blur-[150px] animate-pulse-slow" />

      <div className="absolute top-[30%] left-[60%] w-[150px] sm:w-[300px] h-[150px] sm:h-[300px] bg-yellow-400 opacity-20 rounded-full blur-[68px] sm:blur-[120px] animate-float-slow" />

      <div className="absolute bottom-[-10%] right-[10%] w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-orange-400 opacity-25 rounded-full blur-[92px] sm:blur-[180px] animate-pulse-slow animate-delay-[2s]" />
    </div>
  );
}
