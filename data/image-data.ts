export interface ImageItem {
    id: string;      // 'id' is always a string
    url: string;     // 'url' is always a string
    label: "Real" | "AI"; // 'label' is always a string, specifically "Real" or "AI"
    model?: string;  // 'model' is optional and a string (present for AI images)
    ft?: string;     // 'ft' (fine-tuned model) is optional and a string (present for some AI images)
  }

  export type ImageList = ImageItem[];
