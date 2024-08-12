// InputTextContent.tsx

interface InputTextContentProps {
  content: Content;
  editContent: (contentId: string, field: keyof Content, value: string) => void;
}

const InputTextContent = ({ content, editContent }: InputTextContentProps) => {
  const [isOpen, setIsOpen] = useSyncedState<string | null>("inputDropdownOpen", null);

  const toggleDropdown = () => {
    setIsOpen(isOpen === content.id ? null : content.id);
  };


  return (
    <>
      <LabeledSelect
          label="Type:"
          options={inputOptions}
          value={content.url || 'text'} 
          onChange={(value) => editContent(content.id, 'url', value)}
          placeholder="Select Type"
          isOpen={isOpen === content.id}
          onToggle={toggleDropdown}
      />
      <LabeledInput
        label="Label:"
        value={content.title}
        onTextEditEnd={(e) => editContent(content.id, 'title', e.characters)}
      />
    </>
  );
};

 
