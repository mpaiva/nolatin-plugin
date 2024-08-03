 

interface DropdownProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isOpen: boolean;
  onToggle: () => void;
}

const Dropdown = ({ options, value, onChange, placeholder, isOpen, onToggle }: DropdownProps) => {

  const selectedOption = options.find(option => option.value === value);
  const displayValue = selectedOption ? selectedOption.label : placeholder;

  return (
    <AutoLayout direction="vertical" width="fill-parent" spacing={8}>
      <Text
        onClick={onToggle}
        fill={value ? "#000" : "#aaa"}
        fontSize={16}
      >
        {displayValue || placeholder}
      </Text>
      {isOpen && (
        <AutoLayout width="fill-parent" direction="vertical" fill="#fff" stroke="#ccc" cornerRadius={4} padding={8}>
          {options.map((option) => (
            <AutoLayout
              key={option.value}
              width="fill-parent"
              onClick={() => {
                onChange(option.value);
                onToggle(); // Close dropdown after selecting an option
              }}
              padding={{ vertical: 4 }}
            >
              <Text fontSize={16}>
                {option.label}
              </Text>
            </AutoLayout>
          ))}
        </AutoLayout>
      )}
    </AutoLayout>
  );
};

 
