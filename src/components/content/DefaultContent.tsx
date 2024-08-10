interface DefaultContentProps {
  content: Content;
  editContent: (contentId: string, field: keyof Content, value: string) => void;
}

const DefaultContent = ({ content, editContent }: DefaultContentProps) => {
  return (
    <>
      <LabeledInput
        label="Title"
        value={content.title}
        onTextEditEnd={(e) => editContent(content.id, 'title', e.characters)}
      />
      <LabeledInput
        label="Description"
        value={content.description}
        onTextEditEnd={(e) => editContent(content.id, 'description', e.characters)}
      />
    </>
  );
};

 
