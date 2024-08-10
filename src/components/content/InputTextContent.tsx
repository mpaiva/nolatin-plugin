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

  const inputOptions = [
    { label: 'Text', value: 'text' },
    { label: 'Password', value: 'password' },
    { label: 'Number', value: 'number' },
    { label: 'Date', value: 'date' },
    { label: 'Date and Time', value: 'date and time' },
    { label: 'Email', value: 'email' },
    { label: 'Telephone', value: 'telephone' },
    { label: 'Slider Range', value: 'slider range' },
    { label: 'Upload File', value: 'upload file' },
  ];

  return (
    <>
      <LabeledInput
        label="Input Label"
        value={content.title}
        onTextEditEnd={(e) => editContent(content.id, 'title', e.characters)}
      />
      
      <LabeledSelect
        label="Input Type"
        options={inputOptions}
        value={content.url || 'text'} 
        onChange={(value) => editContent(content.id, 'url', value)}
        placeholder="Select Type"
        isOpen={isOpen === content.id}
        onToggle={toggleDropdown}
      />
    </>
  );
};

 
