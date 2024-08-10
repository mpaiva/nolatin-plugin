 interface HeadingLinkContentProps {
  content: Content;
  editContent: (contentId: string, field: keyof Content, value: string) => void;
}

const HeadingLinkContent = ({ content, editContent }: HeadingLinkContentProps) => {
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
      <LabeledInput
        label="Heading URL"
        value={content.url}
        onTextEditEnd={(e) => editContent(content.id, 'url', e.characters)}
      />
    </>
  );
};
 
