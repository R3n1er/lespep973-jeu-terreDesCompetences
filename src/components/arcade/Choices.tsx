import { Chip } from '@/components/ui/chip';

interface Choice {
  id: string;
  label: string;
  icon?: string;
  selected?: boolean;
  disabled?: boolean;
}

interface ChoicesProps {
  choices: Choice[];
  onSelect: (choiceId: string) => void;
  multiSelect?: boolean;
  maxSelections?: number;
  className?: string;
}

export default function Choices({
  choices,
  onSelect,
  multiSelect = false,
  maxSelections,
  className = ''
}: ChoicesProps) {
  const selectedCount = choices.filter(c => c.selected).length;

  const handleSelect = (choiceId: string) => {
    const choice = choices.find(c => c.id === choiceId);
    if (!choice || choice.disabled) return;

    // En mode multi-select, vérifier les limites
    if (multiSelect && typeof maxSelections === 'number' && !choice.selected) {
      if (selectedCount >= maxSelections) return;
    }

    onSelect(choiceId);
  };

  return (
    <div className={`choices ${className}`}>
      {choices.map((choice) => {
        const limitReached =
          multiSelect &&
          typeof maxSelections === 'number' &&
          !choice.selected &&
          selectedCount >= maxSelections;
        const isDisabled = Boolean(choice.disabled) || limitReached;

        return (
          <Chip
            key={choice.id}
            selected={choice.selected}
            disabled={isDisabled}
            onClick={() => handleSelect(choice.id)}
          >
            {choice.icon && (
              <img src={choice.icon} alt="" />
            )}
            <span>{choice.label}</span>
            {choice.selected && (
              <span className="text-accent ml-auto">✓</span>
            )}
          </Chip>
        );
      })}

      {multiSelect && maxSelections && (
        <div className="text-center mt-4">
          <span className="text-ink-soft text-sm">
            {selectedCount} / {maxSelections} sélectionnés
          </span>
        </div>
      )}
    </div>
  );
}
