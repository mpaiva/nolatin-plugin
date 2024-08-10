 
interface NumberListLinksContentProps {
  content: Content;
  editContent: (contentId: string, field: keyof Content, value: string) => void;
}

const NumberListLinksContent = ({ content, editContent }: NumberListLinksContentProps) => {
  return (
    <>
      <LabeledInput
        label='List Items: Wrap each item in double quotes (example: "label1, url1" "label2, url2")'
        value={content.description}
        onTextEditEnd={(e) => editContent(content.id, 'description', e.characters)}
      />
    </>
  );
};

 
