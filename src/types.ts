export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  sectionId: string;
}

export interface Section {
  id: string;
  name: string;
}
