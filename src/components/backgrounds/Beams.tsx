const Beams = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-full w-px bg-gradient-to-b from-transparent via-gold-400/20 to-transparent"
            style={{
              left: `${15 + i * 15}%`,
              animationDelay: `${i * 0.5}s`,
              animation: 'beam-move 4s ease-in-out infinite alternate',
            }}
          />
        ))}
      </div>
      
      <style jsx>{`
        @keyframes beam-move {
          0% { transform: translateX(-10px) scaleY(0.8); opacity: 0.3; }
          50% { transform: translateX(0px) scaleY(1); opacity: 0.6; }
          100% { transform: translateX(10px) scaleY(0.9); opacity: 0.4; }
        }
      `}</style>
    </div>
  );
};

export default Beams;