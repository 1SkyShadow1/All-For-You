const Aurora = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-r from-yellow-400 to-red-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-gradient-to-r from-blue-400 to-green-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000" />
      </div>
    </div>
  );
};

export default Aurora;