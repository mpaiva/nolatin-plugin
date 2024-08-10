type ContentType = 'Section Title with description' | 'Button' | 'Text link' | 'Input field' | 'Select field' | 'Image with description' | 'Bulleted list of text' | 'Bulleted list of links' |  'Numbered list of text' | 'Numbered list of links' | 'Text paragraph' | 'Heading text' | 'Heading link' | 'InputRadioButtonList' | 'InputCheckboxList' | 'Table' | 'ListGroup';

interface Content {
  id: string;
  type: ContentType;
  title: string;
  description: string;
  url: string;
  children: Content[];   
  draft: boolean;
}