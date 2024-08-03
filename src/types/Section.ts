interface Section {
  name: string;
  description: string;
  type: 'Section' | 'Header' | 'Form' | 'Navigation' | 'Search' | 'Footer' | 'Complementry' | 'Alert' | 'Article';
}
