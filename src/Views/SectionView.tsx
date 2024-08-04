// SectionView.tsx

interface SectionViewProps {
  sectionId: string;
  section: Section;
  deleteSection: (sectionId: string) => void;
  cloneSection: (sectionId: string, section: Section) => void;
  editSection: (sectionId: string, field: keyof Section, value: any) => void;
  moveUpSection: (sectionId: string) => void;
  moveDownSection: (sectionId: string) => void;
  isOpen: boolean;
  toggleDropdown: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}

const SectionView = ({
  sectionId,
  section,
  deleteSection,
  cloneSection,
  editSection,
  moveUpSection,
  moveDownSection,
  isOpen,
  toggleDropdown,
  canMoveUp,
  canMoveDown,
}: SectionViewProps) => {
  const addContent = () => {
    const contentId = randomId();
    const newContent: Content = {
      id: contentId,
      type: 'Button',
      title: '',
      description: '',
      url: '',
      children: [],
      draft: false,
    };
    const updatedContents = [...section.children, newContent];
    editSection(sectionId, 'children', updatedContents);
  };

  const deleteContent = (contentId: string) => {
    const updatedContents = section.children.filter(content => content.id !== contentId);
    editSection(sectionId, 'children', updatedContents);
  };

  const cloneContent = (contentId: string, content: Content) => {
    const clonedContentId = randomId();
    const clonedContent: Content = { ...content, id: clonedContentId, children: [...content.children] };
    const index = section.children.findIndex(c => c.id === contentId);
    const updatedContents = [
      ...section.children.slice(0, index + 1),
      clonedContent,
      ...section.children.slice(index + 1)
    ];
    editSection(sectionId, 'children', updatedContents);
  };

  const editContent = (contentId: string, field: keyof Content, value: string) => {
    const updatedContents = section.children.map(content =>
      content.id === contentId ? { ...content, [field]: value } : content
    );
    editSection(sectionId, 'children', updatedContents);
  };

  const moveUpContent = (contentId: string) => {
    const index = section.children.findIndex(c => c.id === contentId);
    if (index > 0) {
      const updatedContents = [...section.children];
      [updatedContents[index - 1], updatedContents[index]] = [updatedContents[index], updatedContents[index - 1]];
      editSection(sectionId, 'children', updatedContents);
    }
  };

  const moveDownContent = (contentId: string) => {
    const index = section.children.findIndex(c => c.id === contentId);
    if (index < section.children.length - 1) {
      const updatedContents = [...section.children];
      [updatedContents[index + 1], updatedContents[index]] = [updatedContents[index], updatedContents[index + 1]];
      editSection(sectionId, 'children', updatedContents);
    }
  };

  return (
    <AutoLayout width="fill-parent" direction="vertical" spacing={12} padding={8} fill="#ffffff" cornerRadius={4} stroke="#ccc">
      <AutoLayout width="fill-parent" horizontalAlignItems="end" spacing={4}>
        {canMoveUp && (
          <IconButton src={MoveUpIconSvg} onClick={() => moveUpSection(sectionId)} />
        )}
        {canMoveDown && (
          <IconButton src={MoveDownIconSvg} onClick={() => moveDownSection(sectionId)} />
        )}
        <IconButton src={CloneIconSvg} onClick={() => cloneSection(sectionId, section)} />
        <IconButton src={DeleteIconSvg} onClick={() => deleteSection(sectionId)} />
      </AutoLayout>
      <Input
        value={section.name}
        onTextEditEnd={(e) => editSection(sectionId, 'name', e.characters)}
        placeholder="Section Name"
        fontSize={18}
        fontWeight={600}
        width="fill-parent"
      />
      <Input
        value={section.description}
        onTextEditEnd={(e) => editSection(sectionId, 'description', e.characters)}
        placeholder="Section Description"
        fontSize={16}
        width="fill-parent"
      />
      <Dropdown
        value={section.element}
        onChange={(value) => editSection(sectionId, 'element', value)}
        options={[
          { label: 'Section', value: 'Section' },
          { label: 'Header', value: 'Header' },
          { label: 'Form', value: 'Form' },
          { label: 'Navigation', value: 'Navigation' },
          { label: 'Search', value: 'Search' },
          { label: 'Footer', value: 'Footer' },
          { label: 'Complementary', value: 'Complementary' },
          { label: 'Alert', value: 'Alert' },
          { label: 'Article', value: 'Article' },
        ]}
        placeholder="Section Type"
        isOpen={isOpen}
        onToggle={toggleDropdown}
      />
      {section.children.length > 0 && (
        <AutoLayout width="fill-parent" direction="vertical" spacing={8}>
          {section.children.map((content, index) => (
            <ContentView
              key={content.id}
              content={content}
              deleteContent={deleteContent}
              editContent={editContent}
              cloneContent={cloneContent}
              moveUpContent={moveUpContent}
              moveDownContent={moveDownContent}
              canMoveUp={index > 0}
              canMoveDown={index < section.children.length - 1}
            />
          ))}
        </AutoLayout>
      )}
      <AutoLayout width="fill-parent" horizontalAlignItems="center" padding={12} cornerRadius={4} fill="#0000FF" hoverStyle={{ fill: "#1717d8" }} onClick={addContent}>
        <Text fontSize={14} fontWeight={600} fill="#ffffff">
          Add Content
        </Text>
      </AutoLayout>
    </AutoLayout>
  );
};

 
