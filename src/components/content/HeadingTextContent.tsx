 interface HeadingTextContentProps {
  content: Content;
  editContent: (contentId: string, field: keyof Content, value: string) => void;
}

const HeadingTextContent = ({ content, editContent }: HeadingTextContentProps) => {
  return (
    <>
      <LabeledInput
        label="Heading Title"
        value={content.title}
        onTextEditEnd={(e) => editContent(content.id, 'title', e.characters)}
      />
      <LabeledInput
        label="Heading Description"
        value={content.description}
        onTextEditEnd={(e) => editContent(content.id, 'description', e.characters)}
      />
    </>
  );
};
 
