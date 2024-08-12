 

interface ContentViewProps {
  content: Content;
  deleteContent: (contentId: string) => void;
  cloneContent: (contentId: string, content: Content) => void;
  editContent: (contentId: string, field: keyof Content, value: string) => void;
  moveUpContent: (contentId: string) => void;
  moveDownContent: (contentId: string) => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
  pages: { id: string; title: string }[];
}
const ContentView = ({
  content,
  deleteContent,
  cloneContent,
  editContent,
  moveUpContent,
  moveDownContent,
  canMoveUp,
  canMoveDown,
  pages
}: ContentViewProps) => {
  const [contentDropdownOpen, setContentDropdownOpen] = useSyncedState<string | null>("contentDropdownOpen", null);

  const toggleContentDropdown = () => {
    setContentDropdownOpen(contentDropdownOpen === content.id ? null : content.id);
  };

  const handleContentTypeChange = (newValue: string) => {
    editContent(content.id, 'type', newValue);
  };

  return (
    <AutoLayout width="fill-parent" direction="vertical" spacing={12} padding={8} fill="#F8F8F8" cornerRadius={4} stroke="#A1A1A1">
      <AutoLayout width="fill-parent" direction="horizontal" spacing={8}>
        <AutoLayout width="fill-parent" padding={{ vertical: 4 }}>
          <Dropdown
            value={content.type}
            onChange={handleContentTypeChange}
            options={contentOptions}
            placeholder="Content Type"
            isOpen={contentDropdownOpen === content.id}
            onToggle={toggleContentDropdown}
          />
        </AutoLayout>
        <AutoLayout horizontalAlignItems="end" spacing={4}>
          {canMoveUp && <IconButton src={MoveUpIconSvg} onClick={() => moveUpContent(content.id)} />}
          {canMoveDown && <IconButton src={MoveDownIconSvg} onClick={() => moveDownContent(content.id)} />}
          <IconButton src={CloneIconSvg} onClick={() => cloneContent(content.id, content)} />
          <IconButton src={DeleteIconSvg} onClick={() => deleteContent(content.id)} />
        </AutoLayout>
      </AutoLayout>
      {content.type === 'Section Title with description' ? (
        <SubSectionContent content={content} editContent={editContent} pages={pages} />
      ) : content.type === 'Button' ? (
        <ButtonContent content={content} editContent={editContent} pages={pages} />
      ) : content.type === 'Text link' ? (
        <TextLinkContent content={content} editContent={editContent} pages={pages} />
      ) : content.type === 'Input field' ? (
        <InputTextContent content={content} editContent={editContent} />
      ) : content.type === 'Select field' ? (
        <InputSelectContent content={content} editContent={editContent} />
      ) : content.type === 'Image with description' ? (
        <ImageContent content={content} editContent={editContent} />
      ) : content.type === 'Bulleted list of text' ? (
        <BulletListTextContent content={content} editContent={editContent} />
      ) : content.type === 'Bulleted list of links' ? (
        <BulletListLinksContent content={content} editContent={editContent} />
      ) : content.type === 'Numbered list of text' ? (
        <NumberListTextContent content={content} editContent={editContent} />
      ) : content.type === 'Numbered list of links' ? (
        <NumberListLinksContent content={content} editContent={editContent} />
      ) : content.type === 'Text paragraph' ? (
        <TextParagraphContent content={content} editContent={editContent} />
      ) : content.type === 'Heading text' ? (
        <HeadingTextContent content={content} editContent={editContent} />
      ) : content.type === 'Heading link' ? (
        <HeadingLinkContent content={content} editContent={editContent} pages={pages} />
      ) : (
        <DefaultContent content={content} editContent={editContent} />
      )}
    </AutoLayout>
  );
};
