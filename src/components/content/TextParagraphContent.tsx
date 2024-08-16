 
interface TextParagraphContentProps {
  content: Content;
  editContent: (contentId: string, field: keyof Content, value: string) => void;
}

const TextParagraphContent = ({ content, editContent }: TextParagraphContentProps) => {
  return (
    <>
      <LabeledInput
        label="Paragraph:"
        value={content.title}
        textarea
        onTextEditEnd={(e) => editContent(content.id, 'title', e.characters)}
      />
    </>
  );
};

 
