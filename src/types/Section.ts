interface Section {
  id: string;
  name: string;
  description: string;
  element: string;
  children: Content[];  
  draft: boolean;
}