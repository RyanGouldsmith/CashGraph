export interface TagsQuery {
  tags: Array<TagType>;
}

export interface TagType {
  id: string;
  name: TagValues;
  colour: TagColours;
}

export enum TagValues {
  HOLIDAY,
  FOOD,
  TRAVEL,
  ENTERTAINMENT
}

export enum TagColours {
  GREEN,
  RED,
  BLUE
}
