 
interface BulletListTextContentProps {
  content: Content;
  editContent: (contentId: string, field: keyof Content, value: string) => void;
}

const BulletListTextContent = ({ content, editContent }: BulletListTextContentProps) => {
  return (
    <>
      <LabeledInput
        label='List Items: Wrap each item in double quotes ("item 1", "item2")'
        value={content.description}
        onTextEditEnd={(e) => editContent(content.id, 'description', e.characters)}
      />
    </>
  );
};

 