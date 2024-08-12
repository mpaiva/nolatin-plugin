interface SubSectionContentProps {
  content: Content;
  editContent: (contentId: string, field: keyof Content, value: string | Content[]) => void;
  pages: { id: string; title: string }[];
}


const SubSectionContent = ({ content, editContent, pages }: SubSectionContentProps) => {

  const addContent = () => {
    const contentId = randomId();
    const newContent: Content = {
      id: contentId,
      type: 'Section Title with description',  // Default type
      title: '',
      description: '',
      url: '',
      children: [],
      draft: false,
    };
    const updatedChildren = [...content.children, newContent];
    editContent(content.id, 'children', updatedChildren);
  };

  return (
    <AutoLayout width="fill-parent" direction="vertical" spacing={12} padding={8} fill="#F8F8F8" stroke="#0000FF66" strokeDashPattern={[4, 4]} strokeWidth={2} cornerRadius={4}>
      <AutoLayout width="fill-parent" fill="#0000FF0D" direction="vertical" spacing={8} padding={8}>
        <Input
          value={content.title}
          onTextEditEnd={(e) => editContent(content.id, 'title', e.characters)}
          placeholder="Title"
          fontSize={18}
          fontWeight={600}
          width="fill-parent"
        />
        <Input
          value={content.description}
          onTextEditEnd={(e) => editContent(content.id, 'description', e.characters)}
          placeholder="Description"
          fontSize={16}
          width="fill-parent"
        />
      </AutoLayout>

      {content.children.length > 0 && (
        <AutoLayout width="fill-parent" direction="vertical" spacing={8}>
          {content.children.map((childContent, index) => (
            <ContentView
              key={childContent.id}
              content={childContent}
              deleteContent={() => {
                const updatedChildren = content.children.filter(c => c.id !== childContent.id);
                editContent(content.id, 'children', updatedChildren);
              }}
              // editContent={(id, field, value) => {
              //   const updatedChildren = content.children.map(c =>
              //     c.id === id ? { ...c, [field]: value } : c
              //   );
              //   editContent(content.id, 'children', updatedChildren);
              // }}
              editContent={(id, field, value) => editContent(id, field, value)}
              cloneContent={(id, childContent) => {
                const clonedContent = { ...childContent, id: randomId() };
                const updatedChildren = [...content.children, clonedContent];
                editContent(content.id, 'children', updatedChildren);
              }}
              moveUpContent={(id) => {
                const index = content.children.findIndex(c => c.id === id);
                if (index > 0) {
                  const updatedChildren = [...content.children];
                  [updatedChildren[index - 1], updatedChildren[index]] = [updatedChildren[index], updatedChildren[index - 1]];
                  editContent(content.id, 'children', updatedChildren);
                }
              }}
              moveDownContent={(id) => {
                const index = content.children.findIndex(c => c.id === id);
                if (index < content.children.length - 1) {
                  const updatedChildren = [...content.children];
                  [updatedChildren[index + 1], updatedChildren[index]] = [updatedChildren[index], updatedChildren[index + 1]];
                  editContent(content.id, 'children', updatedChildren);
                }
              }}
              canMoveUp={index > 0}
              canMoveDown={index < content.children.length - 1}
              pages={pages}
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
