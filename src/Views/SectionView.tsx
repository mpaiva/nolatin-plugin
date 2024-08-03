interface SectionViewProps {
  sectionId: string;
  section: Section;
  deleteSection: (sectionId: string) => void;
  cloneSection: (sectionId: string, section: Section) => void;
  editSection: (sectionId: string, field: 'name' | 'description' | 'type', value: string) => void;
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
  const contents = useSyncedMap<Content>(`contents-${sectionId}`);
  const [contentOrder, setContentOrder] = useSyncedState<string[]>(`contentOrder-${sectionId}`, []);

  const addContent = () => {
    const contentId = randomId();
    contents.set(contentId, { id: contentId, type: 'Button' }); // Default to Button
    setContentOrder([...contentOrder, contentId]);
  };

  const deleteContent = (contentId: string) => {
    contents.delete(contentId);
    setContentOrder(contentOrder.filter(id => id !== contentId));
  };

  const cloneContent = (contentId: string, content: Content) => {
    const clonedContentId = randomId();
    contents.set(clonedContentId, { ...content, id: clonedContentId });
  
    const index = contentOrder.indexOf(contentId);
    const newOrder = [...contentOrder];
    newOrder.splice(index + 1, 0, clonedContentId);  
    setContentOrder(newOrder);
  };

  const editContent = (contentId: string, field: string, value: string) => {
    const content = contents.get(contentId);
    if (content) {
      contents.set(contentId, { ...content, [field]: value });
    }
  };

  const moveUpContent = (contentId: string) => {
    const index = contentOrder.indexOf(contentId);
    if (index > 0) {
      const newOrder = [...contentOrder];
      [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
      setContentOrder(newOrder);
    }
  };

  const moveDownContent = (contentId: string) => {
    const index = contentOrder.indexOf(contentId);
    if (index < contentOrder.length - 1) {
      const newOrder = [...contentOrder];
      [newOrder[index + 1], newOrder[index]] = [newOrder[index], newOrder[index + 1]];
      setContentOrder(newOrder);
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
        value={section.type}
        onChange={(value) => editSection(sectionId, 'type', value)}
        options={[
          { label: 'Section', value: 'Section' },
          { label: 'Header', value: 'Header' },
          { label: 'Form', value: 'Form' },
          { label: 'Navigation', value: 'Navigation' },
          { label: 'Search', value: 'Search' },
          { label: 'Footer', value: 'Footer' },
          { label: 'Complementry', value: 'Complementry' },
          { label: 'Alert', value: 'Alert' },
          { label: 'Article', value: 'Article' },
        ]}
        placeholder="Section Type"
        isOpen={isOpen}
        onToggle={toggleDropdown}
      />
      {contentOrder.length > 0 && (
        <AutoLayout width="fill-parent" direction="vertical" spacing={8}>
          {contentOrder.map((contentId) => {
            const content = contents.get(contentId);
            if (!content) return null; // Handle deleted contents gracefully
            return (
              <ContentView
                key={contentId}
                content={content}
                deleteContent={deleteContent}
                editContent={editContent}
                cloneContent={cloneContent}
                moveUpContent={moveUpContent}
                moveDownContent={moveDownContent}
                canMoveUp={contentOrder.indexOf(contentId) > 0}
                canMoveDown={contentOrder.indexOf(contentId) < contentOrder.length - 1}
              />
            );
          })}
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

 
