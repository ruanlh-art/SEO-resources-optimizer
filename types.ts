
export interface SEOOutput {
  url: string;
  browserTitle: string;
  metaDescription: string;
  modifiedHtml: string;
}

export interface OptimizationRequest {
  originalHtml: string;
  requirements: string;
  keywords: string;
}
