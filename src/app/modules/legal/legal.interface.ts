export type ILegalDocument = {
  type: 'privacy' | 'terms';
  content: string;
  status: 'draft' | 'published';
};
