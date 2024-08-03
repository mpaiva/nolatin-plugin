interface PageViewProps {
  pageId: string;
  page: Page;
  deletePage: (pageId: string) => void;
  editPage: (pageId: string, field: 'title' | 'description', value: string) => void;
}

const PageView = ({ pageId, page, deletePage, editPage }: PageViewProps) => {
  const sections = useSyncedMap<Section>(`sections-${pageId}`);
  const [sectionOrder, setSectionOrder] = useSyncedState<string[]>(`sectionOrder-${pageId}`, []);
  const [openDropdown, setOpenDropdown] = useSyncedState<string | null>("openDropdown", null);

  const addSection = () => {
    const sectionId = randomId();
    sections.set(sectionId, { name: 'Untitled Section', description: '', type: 'Section' });
    setSectionOrder([...sectionOrder, sectionId]); // Add new section to the end
  };

  const deleteSection = (sectionId: string) => {
    sections.delete(sectionId);
    setSectionOrder(sectionOrder.filter(id => id !== sectionId)); // Remove section from order
  };


  const cloneSection = (sectionId: string, section: Section) => {
    const clonedSectionId = randomId();
    sections.set(clonedSectionId, { ...section });  
  
    const index = sectionOrder.indexOf(sectionId);
    const newOrder = [...sectionOrder];
    newOrder.splice(index + 1, 0, clonedSectionId);  
    setSectionOrder(newOrder);
  };
  
  

  const editSection = (sectionId: string, field: 'name' | 'description' | 'type', value: string) => {
    const section = sections.get(sectionId);
    if (section) {
      sections.set(sectionId, { ...section, [field]: value });
    }
  };

  const moveUpSection = (sectionId: string) => {
    const index = sectionOrder.indexOf(sectionId);
    if (index > 0) {
      const newOrder = [...sectionOrder];
      [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
      setSectionOrder(newOrder);
    }
  };

  const moveDownSection = (sectionId: string) => {
    const index = sectionOrder.indexOf(sectionId);
    if (index < sectionOrder.length - 1) {
      const newOrder = [...sectionOrder];
      [newOrder[index + 1], newOrder[index]] = [newOrder[index], newOrder[index + 1]];
      setSectionOrder(newOrder);
    }
  };

  const toggleDropdown = (sectionId: string) => {
    setOpenDropdown(openDropdown === sectionId ? null : sectionId);
  };

  return (
    <AutoLayout width={350} direction="vertical" spacing={4} fill="#FFFFFF">
    <AutoLayout width="fill-parent" height={8} fill="#b2b2e5"></AutoLayout>
    <AutoLayout width="fill-parent" direction="vertical" spacing={16} padding={8}>
    <AutoLayout width="fill-parent" horizontalAlignItems="end">
      <IconButton src={DeleteIconSvg} onClick={() => deletePage(pageId)} />
    </AutoLayout>
    <AutoLayout width="fill-parent" direction="vertical" spacing={8}>
      <Input
        value={page.title}
        onTextEditEnd={(e) => editPage(pageId, 'title', e.characters)}
        placeholder="Page Title"
        fontSize={20}
        fontWeight={700}
        width="fill-parent"
      />
      <Input
        value={page.description}
        onTextEditEnd={(e) => editPage(pageId, 'description', e.characters)}
        placeholder="Page Description"
        fontSize={16}
        width="fill-parent"
      />
    </AutoLayout>
    {sectionOrder.length > 0 && (
      <AutoLayout width="fill-parent" direction="vertical" spacing={8}>
        {sectionOrder.map((sectionId, index) => {
          const section = sections.get(sectionId);
          if (!section) return null;  
          return (
            <SectionView
              key={sectionId}
              sectionId={sectionId}
              section={section}
              deleteSection={deleteSection}
              cloneSection={cloneSection} 
              editSection={editSection}
              moveUpSection={moveUpSection}
              moveDownSection={moveDownSection}
              isOpen={openDropdown === sectionId}
              toggleDropdown={() => toggleDropdown(sectionId)}
              canMoveUp={index > 0}
              canMoveDown={index < sectionOrder.length - 1}
            />
          );
        })}
      </AutoLayout>
    )}
    <AutoLayout width="fill-parent" horizontalAlignItems="center" padding={12} cornerRadius={4} fill="#0000FF" hoverStyle={{ fill: "#1717d8" }} onClick={addSection}>
      <Text fontSize={16} fontWeight={600} fill="#ffffff">
        Add Section
      </Text>
    </AutoLayout>
  </AutoLayout>
    </AutoLayout>
    
  );
};
