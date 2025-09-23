type EndScreenProps = {
  onRestart: () => void;
};

export default function EndScreen({ onRestart }: EndScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="mx-auto w-full max-w-xl text-center p-8">
        <h2 className="text-3xl font-bold text-neutral-900 mb-4">
          Fin de session
        </h2>
        <p className="text-neutral-700 mb-6">
          Merci pour votre participation !
        </p>
        <button
          className="rounded-lg bg-brand-primary px-6 py-3 text-white font-semibold shadow-card"
          onClick={onRestart}
        >
          Nouvelle session
        </button>
      </div>
    </div>
  );
}
