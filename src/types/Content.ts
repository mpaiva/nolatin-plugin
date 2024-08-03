type ContentType = 'Button' | 'TextLink';

interface Content {
  id: string;
  type: ContentType;
  descriptiveLabel?: string;
  action?: string;
  descriptiveLink?: string;
  destinationURL?: string;
}
