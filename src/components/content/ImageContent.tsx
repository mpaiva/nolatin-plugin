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
      {content.url ? (
      <AutoLayout direction="vertical" width="fill-parent" spacing={4}>
        <Text 
          fontSize={16} 
          fontWeight={500} 
          width="fill-parent">
          Preview:
        </Text>
          <AutoLayout width="fill-parent" height={190} stroke="#A1A1A1" cornerRadius={4} overflow="hidden">
            <Image
              src={content.url}
              width="fill-parent"
              height="fill-parent"
              minHeight={190}
            />
          </AutoLayout>
      </AutoLayout>
       )
      : null}
    </>
  );
};
 
