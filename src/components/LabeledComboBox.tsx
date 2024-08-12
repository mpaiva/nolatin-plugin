interface LabeledComboBoxProps {
  label: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isOpen: boolean;
  onToggle: () => void;
}

const LabeledComboBox = ({ label, options, value, onChange, placeholder, isOpen, onToggle }: LabeledComboBoxProps) => {
  const selectedOption = options.find(option => option.value === value);
  const displayValue = selectedOption ? selectedOption.label : value || placeholder;

  return (
    <AutoLayout direction="vertical" width="fill-parent" spacing={4}>
      <Text fontSize={16} fontWeight={500} width="fill-parent">
        {label}
      </Text>
      <AutoLayout direction="vertical" width="fill-parent" spacing={8}>
        <AutoLayout verticalAlignItems="center" cornerRadius={4} fill="#FFF" width="fill-parent" padding={8} strokeWidth={1} stroke="#000">
          <Input
            value={displayValue} 
            onTextEditEnd={(e) => {
              const newValue = e.characters.trim();
              if (newValue) {
                onChange(newValue);  
              }
            }} 
            placeholder={placeholder}
            fontSize={16}
            fontWeight={500}
            width="fill-parent"
          />
          <SVG src={ArrowDownSvg} onClick={onToggle} />
        </AutoLayout>
        {isOpen && (
          <AutoLayout 
            width={"fill-parent"} 
            direction="vertical" 
            fill="#fff" 
            stroke="#000" 
            cornerRadius={4} 
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
                  onToggle(); 
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
    </AutoLayout>
  );
};
