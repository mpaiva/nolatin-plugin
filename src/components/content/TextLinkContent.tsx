 
interface TextLinkContentProps {
  content: Content;
  editContent: (contentId: string, field: keyof Content, value: string) => void;
}

const TextLinkContent = ({ content, editContent }: TextLinkContentProps) => {
  return (
    <>
      <LabeledInput
        label="Link Title"
        value={content.title}
        onTextEditEnd={(e) => editContent(content.id, 'title', e.characters)}
      />
      <LabeledInput
        label="Link URL"
        value={content.url}
        onTextEditEnd={(e) => editContent(content.id, 'url', e.characters)}
      />
    </>
  );
};

 
