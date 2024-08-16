 
interface NumberListTextContentProps {
  content: Content;
  editContent: (contentId: string, field: keyof Content, value: string) => void;
}

const NumberListTextContent = ({ content, editContent }: NumberListTextContentProps) => {
  return (
    <>
      <LabeledInput
        label='List Items: Wrap each item in double quotes ("item 1", "item2")'
        textarea
        value={content.description}
        onTextEditEnd={(e) => editContent(content.id, 'description', e.characters)}
      />
    </>
  );
};

 
