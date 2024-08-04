type ContentType = 'Button' | 'TextLink' | 'SubSection' | 'HeadingText' | 'HeadingLink' | 'TextParagraph' | 'InputText' | 'InputSelect' | 'Image' | 'BulletListText' | 'BulletListLinks' | 'NumberedListText' | 'NumberedListLinks' | 'InputRadioButtonList' | 'InputCheckboxList' | 'Table' | 'ListGroup';

interface Content {
  id: string;
  type: ContentType;
  title: string;
  description: string;
  url: string;
  children: Content[];   
  draft: boolean;
  descriptiveLabel?: string;
  action?: string;
  destinationURL?: string;
}