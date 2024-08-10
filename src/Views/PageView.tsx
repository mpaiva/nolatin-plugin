 
interface PageViewProps {
  pageId: string;
  page: Page;
  deletePage: (pageId: string) => void;
  editPage: (pageId: string, field: 'title' | 'description', value: string) => void;
  updatePageSections: (pageId: string, sections: Section[]) => void;
}

const PageView = ({ pageId, page, deletePage, editPage, updatePageSections }: PageViewProps) => {
  const [openDropdown, setOpenDropdown] = useSyncedState<string | null>("openDropdown", null);

  const addSection = () => {
    const sectionId = randomId();
    const newSection: Section = {
      id: sectionId,
      name: 'Untitled Section',
      description: '',
      element: 'Section',
      children: [],
      draft: false,
    };
    updatePageSections(pageId, [...page.sections, newSection]);
  };

  const deleteSection = (sectionId: string) => {
    updatePageSections(pageId, page.sections.filter(section => section.id !== sectionId));
  };

  const cloneSection = (sectionId: string) => {
    const section = page.sections.find(section => section.id === sectionId);
    if (section) {
      const clonedSectionId = randomId();
      const clonedChildren = section.children.map(child => ({
        ...child,
        id: randomId(),
        children: [...child.children],
      }));
      const clonedSection: Section = {
        ...section,
        id: clonedSectionId,
        children: clonedChildren,
      };
      const index = page.sections.findIndex(section => section.id === sectionId);
      const newSections = [...page.sections];
      newSections.splice(index + 1, 0, clonedSection);
      updatePageSections(pageId, newSections);
    }
  };

  const editSection = (sectionId: string, field: keyof Section, value: any) => {
    const updatedSections = page.sections.map(section =>
      section.id === sectionId ? { ...section, [field]: value } : section
    );
    updatePageSections(pageId, updatedSections);
  };

  const moveUpSection = (sectionId: string) => {
    const index = page.sections.findIndex(section => section.id === sectionId);
    if (index > 0) {
      const newSections = [...page.sections];
      [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
      updatePageSections(pageId, newSections);
    }
  };

  const moveDownSection = (sectionId: string) => {
    const index = page.sections.findIndex(section => section.id === sectionId);
    if (index < page.sections.length - 1) {
      const newSections = [...page.sections];
      [newSections[index + 1], newSections[index]] = [newSections[index], newSections[index + 1]];
      updatePageSections(pageId, newSections);
    }
  };

  const toggleDropdown = (sectionId: string) => {
    setOpenDropdown(openDropdown === sectionId ? null : sectionId);
  };

  return (
    <AutoLayout width={350} direction="vertical" spacing={4} fill="#FFFFFF">
      <AutoLayout width="fill-parent" height={8} fill="#b2b2e5"></AutoLayout>
      <AutoLayout width="fill-parent" direction="vertical" spacing={16} padding={8}>
        <AutoLayout width="fill-parent" direction="vertical" spacing={8}>
          <AutoLayout width="fill-parent" verticalAlignItems="center" direction="horizontal" spacing={8}>
            <Input
              value={page.title}
              onTextEditEnd={(e) => editPage(pageId, 'title', e.characters)}
              placeholder="Page Title"
              fontSize={20}
              fontWeight={700}
              width="fill-parent"
            />
            <AutoLayout horizontalAlignItems="end">
              <IconButton src={DeleteIconSvg} onClick={() => deletePage(pageId)} />
            </AutoLayout>
          </AutoLayout>
          <AutoLayout width="fill-parent" direction="horizontal" padding={{ bottom: 8 }}>
            <Input
              value={page.description}
              onTextEditEnd={(e) => editPage(pageId, 'description', e.characters)}
              placeholder="Page Description"
              fontSize={16}
              fontWeight={500}
              width="fill-parent"
            />
          </AutoLayout>
        </AutoLayout>
        {page.sections.length > 0 && (
          <AutoLayout width="fill-parent" direction="vertical" spacing={8}>
            {page.sections.map((section, index) => (
              <SectionView
                key={section.id}
                sectionId={section.id}
                section={section}
                deleteSection={deleteSection}
                cloneSection={cloneSection}
                editSection={editSection}
                moveUpSection={moveUpSection}
                moveDownSection={moveDownSection}
                isOpen={openDropdown === section.id}
                toggleDropdown={() => toggleDropdown(section.id)}
                canMoveUp={index > 0}
                canMoveDown={index < page.sections.length - 1}
              />
            ))}
          </AutoLayout>
        )}
        <AutoLayout 
            width="fill-parent" 
            horizontalAlignItems="center" 
            padding={12} 
            stroke="#0000FF" 
            strokeWidth={2}
            cornerRadius={4} 
            fill="#FFFFFF" 
            onClick={addSection}>
            <Text fontSize={16} fontWeight={600} fill="#0000FF">
              Add Section
            </Text>
        </AutoLayout>
      </AutoLayout>
    </AutoLayout>
  );
};
 
