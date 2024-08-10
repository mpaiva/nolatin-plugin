 interface ButtonContentProps {
  content: Content;
  editContent: (contentId: string, field: keyof Content, value: string) => void;
}

const ButtonContent = ({ content, editContent }: ButtonContentProps) => {
  return (
    <>
      <LabeledInput
        label="Button Label"
        value={content.title}
        onTextEditEnd={(e) => editContent(content.id, 'title', e.characters)}
      />
      <LabeledInput
        label="Button URL"
        value={content.url}
        onTextEditEnd={(e) => editContent(content.id, 'url', e.characters)}
      />
    </>
  );
};
 
