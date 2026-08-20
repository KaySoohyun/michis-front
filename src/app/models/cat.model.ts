export interface Cat {
  id: string;
  name: string;
  age: number;
  breed: string;
  color: string;
  description?: string;
  imageUrl?: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCatRequest {
  name: string;
  age: number;
  breed: string;
  color: string;
  description?: string;
  imageUrl?: string;
}

export interface UpdateCatRequest extends Partial<CreateCatRequest> {}
