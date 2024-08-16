 

interface LabeledInputProps {
  label: string;
  value: string;
  onTextEditEnd: (e: any) => void;
  placeholder?: string;
  textarea?:boolean;
}

const LabeledInput = ({ label, value, onTextEditEnd, placeholder, textarea = false }: LabeledInputProps) => {
  return (
    <AutoLayout direction="vertical" width="fill-parent" spacing={4}>
      <Text 
        fontSize={16} 
        fontWeight={500} 
        width="fill-parent">
        {label}
      </Text>
      <Input
        value={value}
        // onTextEditEnd={onTextEditEnd}
        onTextEditEnd={(e) => {
          const straightQuotesValue = e.characters.replace(/“|”/g, '"');
          onTextEditEnd({ ...e, characters: straightQuotesValue });
        }}
        placeholder={placeholder}
        fontSize={16}
        width={'fill-parent'}
        inputFrameProps={{
          cornerRadius: 4,
          fill: "#FFF",
          overflow: "visible",
          minHeight: textarea ? 92 : null, 
          padding : 8,
          stroke: "#000000",
          strokeWidth: 1,
          verticalAlignItems: "start",
        }}
      />
    </AutoLayout>
  );
};

 
