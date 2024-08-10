 

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
      <AutoLayout direction="vertical" padding={{ vertical: 2, horizontal: 8 }} cornerRadius={4} spacing={8} fill="#0000FF">
        <Text
          onClick={onToggle}
          fill={value ? "#FFFFFF" : "#FFFFFF"}
          fontSize={16}
          fontWeight={600}
        >
          {displayValue || placeholder}
        </Text>
      </AutoLayout>
      {isOpen && (
        <AutoLayout 
          y={24} 
          width={"fill-parent"} 
          direction="vertical" 
          fill="#fff" 
          stroke="#000" 
          cornerRadius={8} 
          padding={{ horizontal: 16, vertical: 8 }}
          effect={[
            {
              type: "drop-shadow",
              blur: 5,
              color: { r: 0, g: 0, b: 0, a: 0.1 },
              offset: { x: 0, y: 3 },
            },
            {
              type: "drop-shadow",
              blur: 2,
              color: { r: 0, g: 0, b: 0, a: 0.15 },
              offset: { x: 0, y: 0 },
            }
          ]}
          >
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

 
