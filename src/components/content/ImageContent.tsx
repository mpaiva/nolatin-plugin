 interface ImageContentProps {
  content: Content;
  editContent: (contentId: string, field: keyof Content, value: string) => void;
}

const ImageContent = ({ content, editContent }: ImageContentProps) => {
  return (
    <>
      <LabeledInput
        label="Source (URL):"
        value={content.url}
        onTextEditEnd={(e) => editContent(content.id, 'url', e.characters)}
      />
      <LabeledInput
        label="Alternative text:"
        value={content.title}
        onTextEditEnd={(e) => editContent(content.id, 'title', e.characters)}
      />
      <LabeledInput
        label="Captions:"
        value={content.description}
        onTextEditEnd={(e) => editContent(content.id, 'description', e.characters)}
      />
    </>
  );
};
 
