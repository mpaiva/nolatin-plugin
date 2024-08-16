 
interface InputSelectContentProps {
  content: Content;
  editContent: (contentId: string, field: keyof Content, value: string) => void;
}

const InputSelectContent = ({ content, editContent }: InputSelectContentProps) => {
  return (
    <>
      <LabeledInput
        label="Label:"
        value={content.title}
        onTextEditEnd={(e) => editContent(content.id, 'title', e.characters)}
      />
      <LabeledInput
        label='Options: Wrap each item in double quotes (example: "option1", "option2")'
        textarea
        value={content.description}
        onTextEditEnd={(e) => editContent(content.id, 'description', e.characters)}
      />
    </>
  );
};

 
