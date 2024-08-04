// ContentView.tsx

interface ContentViewProps {
  content: Content;
  deleteContent: (contentId: string) => void;
  cloneContent: (contentId: string, content: Content) => void;
  editContent: (contentId: string, field: keyof Content, value: string) => void;
  moveUpContent: (contentId: string) => void;
  moveDownContent: (contentId: string) => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
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
}: ContentViewProps) => {
  const [isOpen, setIsOpen] = useSyncedState<string | null>("openDropdown", null);

  const toggleDropdown = () => {
    setIsOpen(isOpen === content.id ? null : content.id);
  };

  return (
    <AutoLayout width="fill-parent" direction="vertical" spacing={12} padding={8} fill="#f8f8f8" cornerRadius={4} stroke="#ddd">
      <AutoLayout width="fill-parent" horizontalAlignItems="end" spacing={4}>
        {canMoveUp && <IconButton src={MoveUpIconSvg} onClick={() => moveUpContent(content.id)} />}
        {canMoveDown && <IconButton src={MoveDownIconSvg} onClick={() => moveDownContent(content.id)} />}
        <IconButton src={CloneIconSvg} onClick={() => cloneContent(content.id, content)} />
        <IconButton src={DeleteIconSvg} onClick={() => deleteContent(content.id)} />
      </AutoLayout>
      <Dropdown
        value={content.type}
        onChange={(value) => editContent(content.id, 'type', value)}
        options={[
          { label: 'Sub-section', value: 'SubSection' },
          { label: 'Heading text', value: 'HeadingText' },
          { label: 'Heading link', value: 'HeadingLink' },
          { label: 'Text paragraph', value: 'TextParagraph' },
          { label: 'Text link', value: 'TextLink' },
          { label: 'Input Text', value: 'InputText' },
          { label: 'Input Select', value: 'InputSelect' },
          { label: 'Button', value: 'Button' },
          { label: 'Image', value: 'Image' },
          { label: 'Bullet list of text', value: 'BulletListText' },
          { label: 'Bullet list of links', value: 'BulletListLinks' },
          { label: 'Numbered list of text', value: 'NumberedListText' },
          { label: 'Numbered list of links', value: 'NumberedListLinks' },
          { label: 'Input Single Select List', value: 'InputRadioButtonList' },
          { label: 'Input Multi Select List', value: 'InputCheckboxList' },
          { label: 'Table', value: 'Table' },
          { label: 'Responsive table', value: 'ListGroup' },
        ]}
        placeholder="Content Type"
        isOpen={isOpen === content.id}
        onToggle={toggleDropdown}
      />
      {(() => {
        switch (content.type) {
          case 'TextLink':
            return (
              <>
                <Input
                  value={content.title}
                  onTextEditEnd={(e) => editContent(content.id, 'title', e.characters)}
                  placeholder="Link Title"
                  fontSize={16}
                  width="fill-parent"
                />
                <Input
                  value={content.url}
                  onTextEditEnd={(e) => editContent(content.id, 'url', e.characters)}
                  placeholder="Link URL"
                  fontSize={16}
                  width="fill-parent"
                />
              </>
            );
          case 'Button':
            return (
              <>
                <Input
                  value={content.title}
                  onTextEditEnd={(e) => editContent(content.id, 'title', e.characters)}
                  placeholder="Button Label"
                  fontSize={16}
                  width="fill-parent"
                />
                <Input
                  value={content.url}
                  onTextEditEnd={(e) => editContent(content.id, 'url', e.characters)}
                  placeholder="Button URL"
                  fontSize={16}
                  width="fill-parent"
                />
              </>
            );
          default:
            return (
              <>
                <Input
                  value={content.title}
                  onTextEditEnd={(e) => editContent(content.id, 'title', e.characters)}
                  placeholder="Content Title"
                  fontSize={16}
                  width="fill-parent"
                />
                <Input
                  value={content.description}
                  onTextEditEnd={(e) => editContent(content.id, 'description', e.characters)}
                  placeholder="Content Description"
                  fontSize={16}
                  width="fill-parent"
                />
                {content.type === 'Image' && (
                  <Input
                    value={content.url}
                    onTextEditEnd={(e) => editContent(content.id, 'url', e.characters)}
                    placeholder="Image URL"
                    fontSize={16}
                    width="fill-parent"
                  />
                )}
              </>
            );
        }
      })()}
    </AutoLayout>
  );
};

 
