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
      {content.url ? (
      <AutoLayout direction="vertical" width="fill-parent" spacing={4}>
        <Text 
          fontSize={16} 
          fontWeight={500} 
          width="fill-parent">
          Preview:
        </Text>
          <AutoLayout fill="#FFFFFF" width="fill-parent" height={190} stroke="#A1A1A1" cornerRadius={4} overflow="hidden">
            <Rectangle
              fill={{
                type: "image",
                scaleMode: 'fit',
                src: content.url
              }}
              cornerRadius={8}
              width="fill-parent"
              height="fill-parent"
              minHeight={190}
            />
          </AutoLayout>
      </AutoLayout>
       )
      : null}
      <LabeledInput
        label="Alternative text:"
        value={content.title}
        onTextEditEnd={(e) => editContent(content.id, 'title', e.characters)}
      />
      <LabeledInput
        label="Captions:"
        textarea
        value={content.description}
        onTextEditEnd={(e) => editContent(content.id, 'description', e.characters)}
      />

    </>
  );
};
 
