 interface ButtonContentProps {
  content: Content;
  editContent: (contentId: string, field: keyof Content, value: string) => void;
  pages: { id: string; title: string }[];
}

const ButtonContent = ({ content, editContent, pages }: ButtonContentProps) => {
  const pageOptions = pages.map(page => ({
    label: page.title,
    value: page.id
  }));

  const [isOpen, setIsOpen] = useSyncedState<string | null>("comboBoxDropdownOpen", null);

  const toggleDropdown = () => {
    setIsOpen(isOpen === content.id ? null : content.id);
  };

  return (
    <>
      <LabeledInput
        label="Label:"
        value={content.title}
        onTextEditEnd={(e) => editContent(content.id, 'title', e.characters)}
      />
      <LabeledComboBox
        label="Action:"
        options={pageOptions}
        value={content.url}
        onChange={(value) => editContent(content.id, 'url', value)}
        placeholder="Select page or enter link"
        isOpen={isOpen === content.id}
        onToggle={toggleDropdown}
      />
    </>
  );
};
 
