 interface HeadingLinkContentProps {
  content: Content;
  editContent: (contentId: string, field: keyof Content, value: string) => void;
  pages: { id: string; title: string }[];
}

const HeadingLinkContent = ({ content, editContent, pages }: HeadingLinkContentProps) => {

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
        label="Title:"
        value={content.title}
        onTextEditEnd={(e) => editContent(content.id, 'title', e.characters)}
      />
      <LabeledInput
        label="Description:"
        value={content.description}
        onTextEditEnd={(e) => editContent(content.id, 'description', e.characters)}
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
 
