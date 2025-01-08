export interface Calendar {
  id: string;
  senderId: string;
  receiver: string;
  message: string;
  created_at: string; // ISO date string
  image_path: string | null; // Nullable
}
