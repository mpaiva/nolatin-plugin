interface ContentViewProps {
  content: Content;
  deleteContent: (contentId: string) => void;
  cloneContent: (contentId: string, content: Content) => void;
  editContent: (contentId: string, field: string, value: string) => void;
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
          // case 'SubSection':
          //   return (
          //     <>
          //       <Input
          //         value={content.descriptiveLabel || ''}
          //         onTextEditEnd={(e) => editContent(content.id, 'descriptiveLabel', e.characters)}
          //         placeholder="Descriptive Link"
          //         fontSize={16}
          //         width="fill-parent"
          //       />
          //     </>
          //   );
          // case 'HeadingText':
          //   return (
          //     <>
          //       <Input
          //         value={content.descriptiveLabel || ''}
          //         onTextEditEnd={(e) => editContent(content.id, 'descriptiveLabel', e.characters)}
          //         placeholder="Descriptive Link"
          //         fontSize={16}
          //         width="fill-parent"
          //       />
          //     </>
          //   );
          // case 'HeadingLink':
          //   return (
          //     <>
          //       <Input
          //         value={content.descriptiveLabel || ''}
          //         onTextEditEnd={(e) => editContent(content.id, 'descriptiveLabel', e.characters)}
          //         placeholder="Descriptive Link"
          //         fontSize={16}
          //         width="fill-parent"
          //       />
          //     </>
          //   );
          // case 'TextParagraph':
          //   return (
          //     <>
          //       <Input
          //         value={content.descriptiveLabel || ''}
          //         onTextEditEnd={(e) => editContent(content.id, 'descriptiveLabel', e.characters)}
          //         placeholder="Descriptive Link"
          //         fontSize={16}
          //         width="fill-parent"
          //       />
          //     </>
          //   );
          case 'TextLink':
            return (
              <>
                <Input
                  value={content.descriptiveLabel || ''}
                  onTextEditEnd={(e) => editContent(content.id, 'descriptiveLabel', e.characters)}
                  placeholder="Descriptive Link"
                  fontSize={16}
                  width="fill-parent"
                />
                <Input
                  value={content.destinationURL || ''}
                  onTextEditEnd={(e) => editContent(content.id, 'destinationURL', e.characters)}
                  placeholder="Destination URL"
                  fontSize={16}
                  width="fill-parent"
                />
              </>
            );
          // case 'InputText':
          //   return (
          //     <>
          //       <Input
          //         value={content.descriptiveLabel || ''}
          //         onTextEditEnd={(e) => editContent(content.id, 'descriptiveLabel', e.characters)}
          //         placeholder="Descriptive Link"
          //         fontSize={16}
          //         width="fill-parent"
          //       />
          //     </>
          //   );
          // case 'InputSelect':
          //   return (
          //     <>
          //       <Input
          //         value={content.descriptiveLabel || ''}
          //         onTextEditEnd={(e) => editContent(content.id, 'descriptiveLabel', e.characters)}
          //         placeholder="Descriptive Link"
          //         fontSize={16}
          //         width="fill-parent"
          //       />
          //     </>
          //   );
          case 'Button':
            return (
              <>
                <Input
                  value={content.descriptiveLabel || ''}
                  onTextEditEnd={(e) => editContent(content.id, 'descriptiveLabel', e.characters)}
                  placeholder="Descriptive Label"
                  fontSize={16}
                  width="fill-parent"
                />
                <Input
                  value={content.action || ''}
                  onTextEditEnd={(e) => editContent(content.id, 'action', e.characters)}
                  placeholder="Action"
                  fontSize={16}
                  width="fill-parent"
                />
              </>
            );
          // case 'Image':
          //   return (
          //     <>
          //       <Input
          //         value={content.descriptiveLabel || ''}
          //         onTextEditEnd={(e) => editContent(content.id, 'descriptiveLabel', e.characters)}
          //         placeholder="Descriptive Link"
          //         fontSize={16}
          //         width="fill-parent"
          //       />
          //     </>
          //   );
          // case 'BulletListText':
          //   return (
          //     <>
          //       <Input
          //         value={content.descriptiveLabel || ''}
          //         onTextEditEnd={(e) => editContent(content.id, 'descriptiveLabel', e.characters)}
          //         placeholder="Descriptive Link"
          //         fontSize={16}
          //         width="fill-parent"
          //       />
          //     </>
          //   );
          // case 'BulletListLinks':
          //   return (
          //     <>
          //       <Input
          //         value={content.descriptiveLabel || ''}
          //         onTextEditEnd={(e) => editContent(content.id, 'descriptiveLabel', e.characters)}
          //         placeholder="Descriptive Link"
          //         fontSize={16}
          //         width="fill-parent"
          //       />
          //     </>
          //   );
          // case 'NumberedListText':
          //   return (
          //     <>
          //       <Input
          //         value={content.descriptiveLabel || ''}
          //         onTextEditEnd={(e) => editContent(content.id, 'descriptiveLabel', e.characters)}
          //         placeholder="Descriptive Link"
          //         fontSize={16}
          //         width="fill-parent"
          //       />
          //     </>
          //   );
          // case 'NumberedListLinks':
          //   return (
          //     <>
          //       <Input
          //         value={content.descriptiveLabel || ''}
          //         onTextEditEnd={(e) => editContent(content.id, 'descriptiveLabel', e.characters)}
          //         placeholder="Descriptive Link"
          //         fontSize={16}
          //         width="fill-parent"
          //       />
          //     </>
          //   );
          // case 'InputRadioButtonList':
          //   return (
          //     <>
          //       <Input
          //         value={content.descriptiveLabel || ''}
          //         onTextEditEnd={(e) => editContent(content.id, 'descriptiveLabel', e.characters)}
          //         placeholder="Descriptive Link"
          //         fontSize={16}
          //         width="fill-parent"
          //       />
          //     </>
          //   );
          // case 'InputCheckboxList':
          //   return (
          //     <>
          //       <Input
          //         value={content.descriptiveLabel || ''}
          //         onTextEditEnd={(e) => editContent(content.id, 'descriptiveLabel', e.characters)}
          //         placeholder="Descriptive Link"
          //         fontSize={16}
          //         width="fill-parent"
          //       />
          //     </>
          //   );
          // case 'Table':
          //   return (
          //     <>
          //       <Input
          //         value={content.descriptiveLabel || ''}
          //         onTextEditEnd={(e) => editContent(content.id, 'descriptiveLabel', e.characters)}
          //         placeholder="Descriptive Link"
          //         fontSize={16}
          //         width="fill-parent"
          //       />
          //     </>
          //   );
          // case 'ListGroup':
          //   return (
          //     <>
          //       <Input
          //         value={content.descriptiveLabel || ''}
          //         onTextEditEnd={(e) => editContent(content.id, 'descriptiveLabel', e.characters)}
          //         placeholder="Descriptive Link"
          //         fontSize={16}
          //         width="fill-parent"
          //       />
          //     </>
          //   );
          default:
            return null;
        }
      })()}
    </AutoLayout>
  );
};

 
